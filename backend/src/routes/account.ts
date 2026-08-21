import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { prisma } from '../libs/prisma.js';
import { createAudit } from '../services/audit.js';
import type { AuthenticatedRequest } from '../types.js';

export const accountRouter = Router();
accountRouter.use(authenticate);

accountRouter.get('/profile', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      include: { customerProfile: true, staffProfile: true, deliveryProfile: true, adminProfile: true },
    });

    return res.json(profile);
  } catch (error) {
    next(error);
  }
});

accountRouter.get('/addresses', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer) {
      return res.status(404).json({ message: 'Customer profile not found' });
    }

    const addresses = await prisma.address.findMany({ where: { customerId: customer.id }, orderBy: { createdAt: 'desc' } });
    return res.json(addresses);
  } catch (error) {
    next(error);
  }
});

accountRouter.get('/notifications', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const notifications = await prisma.notification.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
    return res.json(notifications);
  } catch (error) {
    next(error);
  }
});

accountRouter.post('/notifications/:id/read', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const notification = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!notification || notification.userId !== user.id) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    const updated = await prisma.notification.update({ where: { id: notification.id }, data: { read: true } });
    return res.json(updated);
  } catch (error) {
    next(error);
  }
});

accountRouter.post('/addresses', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer) {
      return res.status(404).json({ message: 'Customer profile not found' });
    }

    const { label, line1, line2, city, state, postalCode, country, latitude, longitude } = req.body;
    if (!label || !line1 || !city || !state || !postalCode || !country) {
      return res.status(400).json({ message: 'Missing required address fields' });
    }

    const address = await prisma.address.create({
      data: {
        customerId: customer.id,
        label,
        line1,
        line2,
        city,
        state,
        postalCode,
        country,
        latitude: typeof latitude === 'number' ? latitude : undefined,
        longitude: typeof longitude === 'number' ? longitude : undefined,
      },
    });

    await createAudit({ actorId: user.id, actorRole: user.role, action: 'ADD_ADDRESS', entityType: 'Address', entityId: address.id, metadata: { label } });
    return res.status(201).json(address);
  } catch (error) {
    next(error);
  }
});
