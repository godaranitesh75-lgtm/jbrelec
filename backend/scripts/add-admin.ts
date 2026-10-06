import dotenv from 'dotenv';
import { prisma } from '../src/libs/prisma.js';
import { hashPassword } from '../src/services/auth.js';

dotenv.config({ path: '../.env' });

async function addAdmin() {
  const email = process.env.ADMIN_EMAIL || 'godaranitesh75@gmail.com';
  const phone = process.env.ADMIN_PHONE || '9000000004';
  const name = process.env.ADMIN_NAME || 'Nitesh Godara';
  const password = process.env.ADMIN_PASSWORD || 'Jaatboy@18';
  const existing = await prisma.user.findFirst({
    where: { email },
  });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { passwordHash: await hashPassword(password), role: 'ADMIN', status: 'ACTIVE' },
    });
    console.log(`Admin user password and status updated: ${email}`);
    await prisma.$disconnect();
    return;
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      phone,
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      adminProfile: { create: { name, roleTitle: 'Administrator' } },
    },
  });

  console.log(`Admin user created: ${email}`);
  await prisma.$disconnect();
}

addAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
