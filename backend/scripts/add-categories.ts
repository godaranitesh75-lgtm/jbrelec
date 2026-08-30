import dotenv from 'dotenv';
import { prisma } from '../src/libs/prisma.js';

dotenv.config({ path: '../.env' });

async function addCategories() {
  const names = [
    'Wires, Cables & Wiring Accessories',
    'Switches, Sockets & Modular',
    'Lighting & Fans',
    'MCB, Protection & Distribution',
    'Switchgear, Control & Automation',
    'Earthing & Electrical Safety',
    'Tools & Testing Instruments',
    'Motors, Capacitors & Industrial',
    'Power Backup, Solar & Batteries',
    'Smart, Security & Communication',
  ];

  for (const name of names) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const existing = await prisma.category.findFirst({ where: { slug } });
    if (!existing) {
      await prisma.category.create({ data: { name, slug } });
      console.log(`Created category: ${name}`);
    } else {
      console.log(`Category already exists: ${name}`);
    }
  }

  await prisma.$disconnect();
}

addCategories().catch((error) => {
  console.error(error);
  process.exit(1);
});
