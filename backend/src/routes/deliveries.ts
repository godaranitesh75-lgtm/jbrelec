import { Router } from 'express';
import type { AuthenticatedRequest } from '../types.js';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { createAudit } from '../services/audit.js';
import { io } from '../libs/socket.js';

export const deliveryRouter = Router();

deliveryRouter.use(authenticate);

deliveryRouter.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const delivery = await prisma.delivery.findUnique({
      where: { id: req.params.id },
      include: { order: true, assignedDeliveryBoy: true, locations: { orderBy: { recordedAt: 'asc' } } },
    });
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

    const belongsToCustomer = user.role === 'CUSTOMER' && delivery.order.customerId === (await prisma.customerProfile.findUnique({ where: { userId: user.id } }))?.id;
    const belongsToDeliveryBoy = user.role === 'DELIVERY_BOY' && delivery.deliveryBoyId === (await prisma.deliveryBoyProfile.findUnique({ where: { userId: user.id } }))?.id;
    const hasAdminAccess = ['ADMIN', 'STAFF'].includes(user.role);

    if (!belongsToCustomer && !belongsToDeliveryBoy && !hasAdminAccess) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.json(delivery);
  } catch (error) {
    next(error);
  }
});

deliveryRouter.post('/:id/accept', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'DELIVERY_BOY') return res.status(403).json({ message: 'Forbidden' });

    const deliveryBoy = await prisma.deliveryBoyProfile.findUnique({ where: { userId: user.id } });
    if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy profile not found' });

    const delivery = await prisma.delivery.findUnique({ where: { id: req.params.id } });
    if (!delivery || delivery.deliveryBoyId !== deliveryBoy.id) {
      return res.status(403).json({ message: 'Delivery not assigned to you' });
    }

    const updated = await prisma.delivery.update({
      where: { id: delivery.id },
      data: { status: 'ACCEPTED', assignedAt: new Date() },
    });

    io?.to(`order:${delivery.orderId}`).emit('deliveryStatusUpdated', {
      orderId: delivery.orderId,
      deliveryId: updated.id,
      status: updated.status,
    });

    await createAudit({ actorId: user.id, actorRole: user.role, action: 'ACCEPT_DELIVERY', entityType: 'Delivery', entityId: updated.id });
    return res.json(updated);
  } catch (error) {
    next(error);
  }
});

deliveryRouter.post('/:id/status', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status is required' });

    const delivery = await prisma.delivery.findUnique({ where: { id: req.params.id } });
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

    const deliveryBoy = await prisma.deliveryBoyProfile.findUnique({ where: { userId: user.id } });
    const isAssignedDeliveryBoy = deliveryBoy?.id === delivery.deliveryBoyId;
    const canUpdate = isAssignedDeliveryBoy || ['ADMIN', 'STAFF'].includes(user.role);
    if (!canUpdate) return res.status(403).json({ message: 'Forbidden' });

    const updated = await prisma.delivery.update({
      where: { id: delivery.id },
      data: { status, updatedAt: new Date(), ...(status === 'PICKED_UP' ? { pickedUpAt: new Date() } : {}), ...(status === 'DELIVERED' ? { deliveredAt: new Date() } : {}) },
    });

    io?.to(`order:${delivery.orderId}`).emit('deliveryStatusUpdated', {
      orderId: delivery.orderId,
      deliveryId: updated.id,
      status: updated.status,
    });
    io?.to(`delivery:${delivery.id}`).emit('deliveryStatusUpdated', {
      orderId: delivery.orderId,
      deliveryId: updated.id,
      status: updated.status,
    });

    await createAudit({ actorId: user.id, actorRole: user.role, action: 'UPDATE_DELIVERY_STATUS', entityType: 'Delivery', entityId: updated.id, metadata: { status } });
    return res.json(updated);
  } catch (error) {
    next(error);
  }
});

deliveryRouter.post('/:id/location', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'DELIVERY_BOY') return res.status(403).json({ message: 'Forbidden' });

    const deliveryBoy = await prisma.deliveryBoyProfile.findUnique({ where: { userId: user.id } });
    if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy profile not found' });

    const delivery = await prisma.delivery.findUnique({ where: { id: req.params.id } });
    if (!delivery || delivery.deliveryBoyId !== deliveryBoy.id) {
      return res.status(403).json({ message: 'Delivery not assigned to you' });
    }

    const { latitude, longitude, accuracy } = req.body;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Invalid location payload' });
    }

    const created = await prisma.deliveryLocation.create({
      data: {
        deliveryId: delivery.id,
        deliveryBoyId: deliveryBoy.id,
        latitude,
        longitude,
        accuracy: accuracy ?? undefined,
      },
    });

    await prisma.deliveryBoyProfile.update({ where: { id: deliveryBoy.id }, data: { currentLatitude: latitude, currentLongitude: longitude, lastLocationAt: new Date() } });

    io?.to(`order:${delivery.orderId}`).emit('deliveryLocationUpdated', {
      orderId: delivery.orderId,
      deliveryId: delivery.id,
      location: created,
    });
    io?.to(`delivery:${delivery.id}`).emit('deliveryLocationUpdated', {
      orderId: delivery.orderId,
      deliveryId: delivery.id,
      location: created,
    });

    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

deliveryRouter.get('/:id/locations', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const delivery = await prisma.delivery.findUnique({ where: { id: req.params.id }, include: { order: true } });
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    const deliveryBoy = await prisma.deliveryBoyProfile.findUnique({ where: { userId: user.id } });
    const hasAdminAccess = ['ADMIN', 'STAFF'].includes(user.role);
    const belongsToCustomer = customer?.id === delivery.order.customerId;
    const belongsToDeliveryBoy = deliveryBoy?.id === delivery.deliveryBoyId;

    if (!belongsToCustomer && !belongsToDeliveryBoy && !hasAdminAccess) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const locations = await prisma.deliveryLocation.findMany({ where: { deliveryId: delivery.id }, orderBy: { recordedAt: 'asc' } });
    return res.json(locations);
  } catch (error) {
    next(error);
  }
});


