import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { AuthenticatedRequest } from '../types.js';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';

const productCache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 5_000;

export function clearProductCache() {
  productCache.clear();
}

export const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const { page = '1', limit = '12', search, category, brand } = req.query;
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(3000, Math.max(1, Number(limit)));

    const cacheKey = `${pageNumber}:${pageSize}:${search || ''}:${category || ''}:${brand || ''}`;
    const cached = productCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return res.json(cached.data);
    }

    const where: Prisma.ProductWhereInput = {
      status: { equals: 'ACTIVE', mode: 'insensitive' },
    };

    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category && typeof category === 'string') {
      where.category = { slug: category };
    }

    if (brand && typeof brand === 'string') {
      where.brand = { slug: brand };
    }

    const products = await prisma.product.findMany({
      where,
      include: { brand: { select: { name: true } }, category: { select: { name: true } } },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { updatedAt: 'desc' },
    });

    const payload = { page: pageNumber, limit: pageSize, products };
    productCache.set(cacheKey, { data: payload, expires: Date.now() + CACHE_TTL });
    return res.json(payload);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/slug/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { brand: true, category: true, inventory: true, variants: true },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/categories', async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return res.json({ categories });
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/categories/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    const productCount = await prisma.product.count({
      where: { categoryId: id, status: 'ACTIVE' },
    });

    if (productCount > 0) {
      return res.status(400).json({ message: 'Cannot delete category with active products' });
    }

    await prisma.category.delete({
      where: { id },
    });

    clearProductCache();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

productRouter.get('/brands', async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });
    return res.json({ brands });
  } catch (error) {
    next(error);
  }
});

productRouter.post('/brands', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { name } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Brand name is required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const brand = await prisma.brand.create({
      data: {
        name: name.trim(),
        slug,
      },
    });

    return res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/brands/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Brand id is required' });
    }

    const productCount = await prisma.product.count({
      where: { brandId: id },
    });

    if (productCount > 0) {
      return res.status(400).json({ message: 'Cannot delete brand with associated products' });
    }

    await prisma.brand.delete({
      where: { id },
    });

    clearProductCache();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { brand: true, category: true, inventory: true, variants: true },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.post('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { sku, name, slug, description, brandId, categoryId, images = [], price, salePrice, stock, specifications, status = 'ACTIVE' } = req.body;
    if (!sku || !name || !slug || !brandId || !categoryId || price == null || stock == null) {
      return res.status(400).json({ message: 'Missing required product fields' });
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericSalePrice = salePrice == null || salePrice === '' ? undefined : Number(salePrice);
    if (
      !Number.isFinite(numericPrice) || numericPrice < 0 ||
      !Number.isInteger(numericStock) || numericStock < 0 ||
      (numericSalePrice !== undefined && (!Number.isFinite(numericSalePrice) || numericSalePrice < 0))
    ) {
      return res.status(400).json({ message: 'Price and stock must be valid non-negative numbers.' });
    }

    let parsedSpecifications: Prisma.InputJsonValue | undefined;
    if (specifications) {
      try {
        parsedSpecifications = JSON.parse(specifications) as Prisma.InputJsonValue;
      } catch {
        return res.status(400).json({ message: 'Specifications must be valid JSON.' });
      }
    }

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        slug,
        description,
        brandId,
        categoryId,
        images: Array.isArray(images) ? images.slice(0, 5) : [],
        price: numericPrice,
        salePrice: numericSalePrice,
        stock: numericStock,
        status,
        specifications: parsedSpecifications,
        inventory: { create: { available: numericStock, reserved: 0, sold: 0 } },
      },
    });

    clearProductCache();
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.put('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { sku, name, slug, description, brandId, categoryId, images, price, salePrice, stock, specifications, status } = req.body;

    const updateData: Prisma.ProductUpdateInput = {};
    if (sku !== undefined) updateData.sku = sku;
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (brandId !== undefined) updateData.brand = { connect: { id: brandId } };
    if (categoryId !== undefined) updateData.category = { connect: { id: categoryId } };
    if (images !== undefined) updateData.images = Array.isArray(images) ? images.slice(0, 5) : [];
    if (price !== undefined) updateData.price = Number(price);
    if (salePrice !== undefined) updateData.salePrice = salePrice ? Number(salePrice) : null;
    if (stock !== undefined) {
      updateData.stock = Number(stock);
      updateData.inventory = { update: { available: Number(stock) } };
    }
    if (specifications !== undefined) updateData.specifications = specifications ? JSON.parse(specifications) : null;
    if (status !== undefined) updateData.status = status;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { brand: true, category: true, inventory: true },
    });

    clearProductCache();
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    clearProductCache();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

productRouter.post('/categories', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { name } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug,
      },
    });

    clearProductCache();
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/ping', (_req, res) => res.json({ ping: 'pong' }));
