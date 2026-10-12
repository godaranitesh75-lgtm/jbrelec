import type { Prisma } from '@prisma/client';
import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/auth.js';
import { createAudit } from '../services/audit.js';
import type { AuthenticatedRequest } from '../types.js';
import { clearProductCache } from './products.js';

export const adminRouter = Router();

adminRouter.use(authenticate, authorize(['ADMIN']));

type CatalogInput = {
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  active: boolean;
};

function catalogInput(value: unknown): CatalogInput | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;
  if (typeof input.name !== 'string' || !input.name.trim() || input.name.trim().length > 120) return null;
  if (typeof input.category !== 'string' || !input.category.trim() || input.category.trim().length > 60) return null;
  if (input.sku !== undefined && (typeof input.sku !== 'string' || input.sku.trim().length > 60)) return null;
  if (input.description !== undefined && (typeof input.description !== 'string' || input.description.length > 1000)) return null;
  if (typeof input.price !== 'number' || !Number.isFinite(input.price) || input.price < 0 || input.price > 9_999_999_999) return null;
  if (typeof input.stock !== 'number' || !Number.isInteger(input.stock) || input.stock < 0 || input.stock > 1_000_000_000) return null;
  if (input.active !== undefined && typeof input.active !== 'boolean') return null;
  if (input.image_url !== undefined && typeof input.image_url !== 'string') return null;

  const imageUrl = typeof input.image_url === 'string' ? input.image_url.trim() : '';
  if (imageUrl) {
    const dataImage = /^data:image\/(?:jpeg|png|webp|avif);base64,[A-Za-z0-9+/=\r\n]+$/.test(imageUrl);
    if (dataImage) {
      if (imageUrl.length > 48 * 1024 * 1024) return null;
    } else {
      try {
        if (new URL(imageUrl).protocol !== 'https:' || imageUrl.length > 2048) return null;
      } catch {
        return null;
      }
    }
    if (!dataImage && !imageUrl.startsWith('https://')) {
      return null;
    }
  }

  return {
    name: input.name.trim(),
    sku: typeof input.sku === 'string' ? input.sku.trim() : '',
    category: input.category.trim(),
    description: typeof input.description === 'string' ? input.description.trim() : '',
    price: input.price,
    stock: input.stock,
    imageUrl,
    active: input.active !== false,
  };
}

function productSlug(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product';
  return `${base}-${randomUUID().slice(0, 8)}`;
}

async function catalogRelations(categoryName: string) {
  let category = await prisma.category.findFirst({
    where: { name: { equals: categoryName, mode: 'insensitive' } },
  });
  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName, slug: productSlug(categoryName) },
    });
  }

  let brand = await prisma.brand.findFirst({ orderBy: { createdAt: 'asc' } });
  if (!brand) {
    brand = await prisma.brand.create({
      data: { name: 'JBR Electrical', slug: productSlug('JBR Electrical') },
    });
  }

  return { category, brand };
}

function catalogProduct(product: {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  category: { name: string };
}) {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.images[0] ?? '',
    active: product.status === 'ACTIVE',
    created_at: product.createdAt.toISOString(),
    updated_at: product.updatedAt.toISOString(),
  };
}

adminRouter.get('/products', async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json(products.map(catalogProduct));
  } catch (error) {
    return next(error);
  }
});

adminRouter.post('/products', async (req: AuthenticatedRequest, res, next) => {
  try {
    const input = catalogInput(req.body);
    if (!input) return res.status(400).json({ message: 'Enter valid product details and an HTTPS image URL.' });
    const { category, brand } = await catalogRelations(input.category);
    const product = await prisma.product.create({
      data: {
        name: input.name,
        sku: input.sku || `JBR-${randomUUID().slice(0, 8).toUpperCase()}`,
        slug: productSlug(input.name),
        description: input.description,
        price: input.price,
        stock: input.stock,
        images: input.imageUrl ? [input.imageUrl] : [],
        status: input.active ? 'ACTIVE' : 'DRAFT',
        categoryId: category.id,
        brandId: brand.id,
        inventory: { create: { available: input.stock, reserved: 0, sold: 0 } },
      },
      include: { category: { select: { name: true } } },
    });

    clearProductCache();
    await createAudit({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: 'CREATE_PRODUCT',
      entityType: 'Product',
      entityId: product.id,
      metadata: { name: product.name, sku: product.sku },
      ipAddress: req.ip,
    });
    return res.status(201).json(catalogProduct(product));
  } catch (error) {
    return next(error);
  }
});

adminRouter.patch('/products/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const input = catalogInput(req.body);
    if (!input) return res.status(400).json({ message: 'Enter valid product details and an HTTPS image URL.' });

    const current = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!current) return res.status(404).json({ message: 'Product not found' });
    const { category, brand } = await catalogRelations(input.category);
    const product = await prisma.$transaction(async (transaction) => {
      const updated = await transaction.product.update({
        where: { id: current.id },
        data: {
          name: input.name,
          sku: input.sku || current.sku,
          slug: input.name === current.name ? current.slug : productSlug(input.name),
          description: input.description,
          price: input.price,
          stock: input.stock,
          images: input.imageUrl ? [input.imageUrl] : [],
          status: input.active ? 'ACTIVE' : 'DRAFT',
          category: { connect: { id: category.id } },
          brand: { connect: { id: brand.id } },
        },
        include: { category: { select: { name: true } } },
      });
      await transaction.inventory.upsert({
        where: { productId: current.id },
        update: { available: input.stock },
        create: { productId: current.id, available: input.stock, reserved: 0, sold: 0 },
      });
      return updated;
    });

    clearProductCache();
    await createAudit({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: 'UPDATE_PRODUCT',
      entityType: 'Product',
      entityId: product.id,
      metadata: { name: product.name, sku: product.sku },
      ipAddress: req.ip,
    });
    return res.json(catalogProduct(product));
  } catch (error) {
    return next(error);
  }
});

adminRouter.delete('/products/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await prisma.product.delete({ where: { id: product.id } });
    clearProductCache();
    await createAudit({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: 'DELETE_PRODUCT',
      entityType: 'Product',
      entityId: product.id,
      metadata: { name: product.name, sku: product.sku },
      ipAddress: req.ip,
    });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

adminRouter.get('/dashboard', async (_req, res, next) => {
  try {
    const [orders, deliveries, users, products] = await Promise.all([
      prisma.order.count(),
      prisma.delivery.count({ where: { status: { in: ['ASSIGNED', 'ACCEPTED', 'PICKED_UP', 'ON_THE_WAY'] } } }),
      prisma.user.count(),
      prisma.product.count(),
    ]);

    return res.json({ orders, activeDeliveries: deliveries, users, products });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/orders', async (req, res, next) => {
  try {
    const { status, search } = req.query;
  const where: Prisma.OrderWhereInput = {};
    if (status && typeof status === 'string') {
      where.status = status as never;
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: { customer: true, delivery: { include: { assignedDeliveryBoy: true } }, payment: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return res.json(orders);
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/deliveryboys', async (_req, res, next) => {
  try {
    const deliveryBoys = await prisma.deliveryBoyProfile.findMany({ include: { user: true, deliveries: true } });
    return res.json(deliveryBoys);
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/deliveries/:id/assign', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { deliveryBoyId } = req.body;
    if (!deliveryBoyId) return res.status(400).json({ message: 'deliveryBoyId is required' });

    const delivery = await prisma.delivery.findUnique({ where: { id: req.params.id }, include: { order: true } });
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

    const deliveryBoy = await prisma.deliveryBoyProfile.findUnique({ where: { id: deliveryBoyId } });
    if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });

    const updated = await prisma.delivery.update({
      where: { id: delivery.id },
      data: { deliveryBoyId: deliveryBoy.id, status: 'ASSIGNED', assignedAt: new Date() },
    });

    await createAudit({ actorId: req.user!.id, actorRole: req.user!.role, action: 'ASSIGN_DELIVERY', entityType: 'Delivery', entityId: updated.id, metadata: { deliveryBoyId } });
    return res.json(updated);
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/live-deliveries', async (_req, res, next) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      where: { status: { in: ['ASSIGNED', 'ACCEPTED', 'PICKED_UP', 'ON_THE_WAY', 'ARRIVED'] } },
      include: { assignedDeliveryBoy: true, order: true, locations: { orderBy: { recordedAt: 'desc' }, take: 1 } },
    });
    return res.json(deliveries);
  } catch (error) {
    next(error);
  }
});
