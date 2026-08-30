import dotenv from 'dotenv';
import { prisma } from '../src/libs/prisma.js';
import { hashPassword } from '../src/services/auth.js';

dotenv.config({ path: '../.env' });

async function addAdmin() {
  const existing = await prisma.user.findFirst({
    where: { email: 'godaranitesh75@gmail.com' },
  });

  if (existing) {
    console.log('Admin user already exists.');
    await prisma.$disconnect();
    return;
  }

  const passwordHash = await hashPassword('Jaatboy@18');

  await prisma.user.create({
    data: {
      email: 'godaranitesh75@gmail.com',
      phone: '9000000004',
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      adminProfile: { create: { name: 'Nitesh Godara', roleTitle: 'Administrator' } },
    },
  });

  console.log('Admin user created: godaranitesh75@gmail.com');
  await prisma.$disconnect();
}

addAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
