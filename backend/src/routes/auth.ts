import { Router } from 'express';
import { prisma } from '../libs/prisma.js';
import { hashPassword, verifyPassword, signJwt } from '../services/auth.js';
import { createAudit } from '../services/audit.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;

    if (!email || !password || !phone || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
    if (existing) {
      return res.status(409).json({ message: 'Email or phone already registered' });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        passwordHash,
        role: 'CUSTOMER',
        status: 'ACTIVE',
        customerProfile: {
          create: {
            customerCode: `CUS-${Math.floor(10000 + Math.random() * 89999)}`,
            name,
          },
        },
      },
      include: { customerProfile: true },
    });

    await createAudit({ actorId: user.id, actorRole: user.role, action: 'REGISTER', entityType: 'User', entityId: user.id, metadata: { email } });

    const token = signJwt({ sub: user.id, role: user.role });
    return res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role, profile: user.customerProfile } });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email not found. Please register first.' });
    }

    if (!(await verifyPassword(user.passwordHash, password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ message: 'Account is not active' });
    }

    const token = signJwt({ sub: user.id, role: user.role });
    return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', (_req, res) => {
  return res.json({ message: 'Logout completed' });
});
