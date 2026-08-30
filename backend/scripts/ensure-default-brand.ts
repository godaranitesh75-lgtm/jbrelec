import { prisma } from '../src/libs/prisma.js';

async function ensureDefaultBrand() {
  let brand = await prisma.brand.findFirst({ where: { slug: 'general' } });
  if (!brand) {
    brand = await prisma.brand.create({ data: { name: 'General', slug: 'general' } });
    console.log('Created default brand: General');
  } else {
    console.log('Default brand already exists');
  }
  await prisma.$disconnect();
}

ensureDefaultBrand().catch((error) => {
  console.error(error);
  process.exit(1);
});
