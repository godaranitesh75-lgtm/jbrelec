import { Router } from 'express';
import type { AuthenticatedRequest } from '../types.js';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { createAudit } from '../services/audit.js';

export const orderRouter = Router();

orderRouter.use(authenticate);

const canCancelStatus = ['PENDING', 'CONFIRMED', 'PROCESSING'];

interface OrderItemPayload {
  productId: string;
  quantity: number;
}

orderRouter.post('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer) {
      return res.status(404).json({ message: 'Customer profile not found' });
    }

    const { shippingAddressId, items } = req.body as { shippingAddressId: string; items: OrderItemPayload[] };
    if (!shippingAddressId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order payload' });
    }

    const address = await prisma.address.findUnique({ where: { id: shippingAddressId } });
    if (!address || address.customerId !== customer.id) {
      return res.status(400).json({ message: 'Invalid shipping address' });
    }

    const productItems = await prisma.product.findMany({
      where: { id: { in: items.map((item) => item.productId) } },
      include: { inventory: true },
    });

    const orderItems = items.map((item) => {
      const product = productItems.find((product) => product.id === item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      if (product.inventory?.available == null || product.inventory.available < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
      return {
        product,
        quantity: Number(item.quantity),
        unitPrice: product.salePrice ?? product.price,
        total: Number(item.quantity) * (product.salePrice ?? product.price),
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const tax = Number((subtotal * 0.12).toFixed(2));
    const deliveryFee = 49.0;
    const total = Number((subtotal + tax + deliveryFee).toFixed(2));

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber: `JBR-ORD-${Math.floor(10000 + Math.random() * 89999)}`,
          customerId: customer.id,
          subtotal,
          tax,
          deliveryFee,
          total,
          shippingAddressId: address.id,
          items: {
            create: orderItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.total,
            })),
          },
          statusHistory: {
            create: {
              status: 'PENDING',
              changedById: user.id,
              note: 'Order placed by customer',
            },
          },
          payment: {
            create: {
              provider: 'MANUAL',
              amount: total,
              status: 'PENDING',
            },
          },
          delivery: {
            create: {
              status: 'UNASSIGNED',
              deliveryLocation: {
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                latitude: address.latitude,
                longitude: address.longitude,
              },
            },
          },
        },
        include: { items: true, delivery: true, payment: true },
      });

      await Promise.all(orderItems.map((item) =>
        tx.inventory.update({
          where: { id: item.product.inventory?.id ?? '' },
          data: { available: { decrement: item.quantity }, reserved: { increment: item.quantity } },
        })
      ));

      return order;
    });

    await createAudit({ actorId: user.id, actorRole: user.role, action: 'CREATE_ORDER', entityType: 'Order', entityId: result.id, metadata: { orderNumber: result.orderNumber } });

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Insufficient stock')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

orderRouter.get('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer) return res.status(404).json({ message: 'Customer profile not found' });

    const orders = await prisma.order.findMany({ where: { customerId: customer.id }, include: { items: true, delivery: true }, orderBy: { createdAt: 'desc' } });
    return res.json(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } }, shippingAddress: true, delivery: { include: { assignedDeliveryBoy: true } }, payment: true, refund: true, statusHistory: true },
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer || order.customerId !== customer.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.json(order);
  } catch (error) {
    next(error);
  }
});

orderRouter.post('/:id/cancel', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const order = await prisma.order.findUnique({ where: { id: req.params.id }, include: { items: { include: { product: { include: { inventory: true } } } }, delivery: true } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer || order.customerId !== customer.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (!canCancelStatus.includes(order.status)) {
      return res.status(400).json({ message: `Cannot cancel order in status ${order.status}` });
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: 'CANCELLED',
          statusHistory: { create: { status: 'CANCELLED', changedById: user.id, note: req.body.reason ?? 'Cancelled by customer' } },
        },
      });

      await Promise.all(order.items.map((item) =>
        tx.inventory.update({
          where: { id: item.product.inventory?.id ?? '' },
          data: { available: { increment: item.quantity }, reserved: { decrement: item.quantity } },
        })
      ));
    });

    await createAudit({ actorId: user.id, actorRole: user.role, action: 'CANCEL_ORDER', entityType: 'Order', entityId: order.id, metadata: { reason: req.body.reason } });
    return res.json({ message: 'Order cancelled' });
  } catch (error) {
    next(error);
  }
});

orderRouter.get('/:id/tracking', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const order = await prisma.order.findUnique({ where: { id: req.params.id }, include: { delivery: { include: { locations: { orderBy: { recordedAt: 'desc' }, take: 10 }, assignedDeliveryBoy: true } }, shippingAddress: true } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const customer = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
    if (!customer || order.customerId !== customer.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.json({ orderId: order.id, delivery: order.delivery, shippingAddress: order.shippingAddress, status: order.status });
  } catch (error) {
    next(error);
  }
});
