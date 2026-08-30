import dotenv from 'dotenv';
import { prisma } from '../src/libs/prisma.js';

dotenv.config({ path: '../.env' });

async function clearProducts() {
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  const result = await prisma.product.deleteMany();
  console.log(`Deleted ${result.count} products from database.`);
  await prisma.$disconnect();
}

clearProducts().catch((error) => {
  console.error(error);
  process.exit(1);
});
