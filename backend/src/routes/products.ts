import type { Prisma } from '@prisma/client';
import { Router } from 'express';
import type { AuthenticatedRequest } from '../types.js';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';

export const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const { page = '1', limit = '12', search, category, brand } = req.query;
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(50, Math.max(1, Number(limit)));

    const where: Prisma.ProductWhereInput = { status: 'ACTIVE' };

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

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: { brand: true, category: true },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return res.json({ page: pageNumber, limit: pageSize, total, products });
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
    if (!sku || !name || !slug || !brandId || !categoryId || !price || stock == null) {
      return res.status(400).json({ message: 'Missing required product fields' });
    }

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        slug,
        description,
        brandId,
        categoryId,
        images,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        stock: Number(stock),
        status,
        specifications: specifications ? JSON.parse(specifications) : undefined,
        inventory: { create: { available: Number(stock), reserved: 0, sold: 0 } },
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});
