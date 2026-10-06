import { Router } from 'express';
import { prisma } from '../libs/prisma.js';
import { hashPassword, verifyPassword, signJwt } from '../services/auth.js';
import { createAudit } from '../services/audit.js';

export const authRouter = Router();

function sanitizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function isStrongPassword(value: unknown) {
  if (typeof value !== 'string') {
    return false;
  }

  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const email = sanitizeEmail(req.body.email);
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    const phone = typeof req.body.phone === 'string' ? req.body.phone.trim() : '';
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';

    if (!email || !password || !phone || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, and a number' });
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
    const email = sanitizeEmail(req.body.email);
    const password = typeof req.body.password === 'string' ? req.body.password : '';

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

authRouter.post('/reset-password', async (req, res, next) => {
  try {
    const email = sanitizeEmail(req.body.email);
    const currentPassword = typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Email, current password and new password are required' });
    }
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: 'New password must be at least 8 characters and include uppercase, lowercase, and a number' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== 'ADMIN') {
      return res.status(404).json({ message: 'Admin account not found' });
    }
    if (!(await verifyPassword(user.passwordHash, currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(newPassword), status: 'ACTIVE' },
    });
    await createAudit({ actorId: user.id, actorRole: user.role, action: 'RESET_PASSWORD_BY_EMAIL', entityType: 'User', entityId: user.id, metadata: { email } });

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', (_req, res) => {
  return res.json({ message: 'Logout completed' });
});


