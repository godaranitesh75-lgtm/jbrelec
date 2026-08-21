import type { Prisma } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/auth.js';
import { createAudit } from '../services/audit.js';
import type { AuthenticatedRequest } from '../types.js';

export const adminRouter = Router();

adminRouter.use(authenticate, authorize(['ADMIN']));

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
      where.status = status;
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
