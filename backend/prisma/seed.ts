import { prisma } from '../src/libs/prisma.js';
import { hashPassword } from '../src/services/auth.js';

async function run() {
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.orderStatusHistory.deleteMany();
  await prisma.deliveryLocation.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.address.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.staffProfile.deleteMany();
  await prisma.deliveryBoyProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.quotation.deleteMany();

  const password = await hashPassword('Password123!');
  const niteshPassword = await hashPassword('Jaatboy@18');

  await prisma.user.create({
    data: {
      email: 'admin@jbrelectrical.com',
      phone: '9000000001',
      passwordHash: password,
      role: 'ADMIN',
      status: 'ACTIVE',
      adminProfile: { create: { name: 'JBR Admin', roleTitle: 'Administrator' } },
    },
  });

  await prisma.user.create({
    data: {
      email: 'godaranitesh75@gmail.com',
      phone: '9000000004',
      passwordHash: niteshPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      adminProfile: { create: { name: 'Nitesh Godara', roleTitle: 'Administrator' } },
    },
  });

  await prisma.user.create({
    data: {
      email: 'staff@jbrelectrical.com',
      phone: '9000000002',
      passwordHash: password,
      role: 'STAFF',
      status: 'ACTIVE',
      staffProfile: { create: { staffCode: 'STF-1001', name: 'Jai Ram', department: 'Operations', permissions: ['VIEW_ORDERS', 'UPDATE_ORDER_STATUS', 'ASSIGN_DELIVERY'] } },
    },
  });

  await prisma.user.create({
    data: {
      email: 'delivery@jbrelectrical.com',
      phone: '9000000003',
      passwordHash: password,
      role: 'DELIVERY_BOY',
      status: 'ACTIVE',
      deliveryProfile: { create: { name: 'Vinod Kumar', phone: '9000000003', deliveryBoyCode: 'DB-1001', vehicleType: 'Motorbike', vehicleNumber: 'RJ14AB1234', status: 'OFFLINE' } },
    },
  });

  const customers = [];
  for (let i = 1; i <= 5; i += 1) {
    const customer = await prisma.user.create({
      data: {
        email: `customer${i}@jbrelectrical.com`,
        phone: `900000000${3 + i}`,
        passwordHash: password,
        role: 'CUSTOMER',
        status: 'ACTIVE',
        customerProfile: { create: { customerCode: `CUS-1000${i}`, name: `Customer ${i}` } },
      },
      include: { customerProfile: true },
    });
    customers.push(customer);
  }

  const brands = await Promise.all([
    prisma.brand.create({ data: { name: 'JBR Power', slug: 'jbr-power' } }),
    prisma.brand.create({ data: { name: 'ElectroSafe', slug: 'electrosafe' } }),
    prisma.brand.create({ data: { name: 'VoltGuard', slug: 'voltguard' } }),
  ]);

  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Switches & Sockets', slug: 'switches-sockets' } }),
    prisma.category.create({ data: { name: 'Wiring Accessories', slug: 'wiring-accessories' } }),
    prisma.category.create({ data: { name: 'Lighting', slug: 'lighting' } }),
  ]);

  const products = await Promise.all([
    prisma.product.create({ data: { sku: 'JBR-1001', name: 'Modular Switch 6A', slug: 'modular-switch-6a', description: 'Premium modular switch for residential and commercial use.', brandId: brands[0].id, categoryId: categories[0].id, images: ['https://images.pexels.com/photos/220703/pexels-photo-220703.jpeg'], price: 120, salePrice: 99, stock: 120, status: 'ACTIVE', specifications: { material: 'ABS', rating: '6A', color: 'White' }, inventory: { create: { available: 120, reserved: 0, sold: 0 } } } }),
    prisma.product.create({ data: { sku: 'JBR-1002', name: '6A Socket Outlet', slug: '6a-socket-outlet', description: 'Reliable 6A socket outlet with shutter protection.', brandId: brands[1].id, categoryId: categories[0].id, images: ['https://images.pexels.com/photos/273239/pexels-photo-273239.jpeg'], price: 90, stock: 84, status: 'ACTIVE', specifications: { material: 'Polycarbonate', color: 'White' }, inventory: { create: { available: 84, reserved: 0, sold: 0 } } } }),
    prisma.product.create({ data: { sku: 'JBR-2001', name: 'PVC Insulated Wire 2.5mm', slug: 'pvc-wire-2-5mm', description: 'Durable PVC insulated copper wire for home wiring.', brandId: brands[2].id, categoryId: categories[1].id, images: ['https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg'], price: 45, stock: 250, status: 'ACTIVE', specifications: { gauge: '2.5mm', color: 'Red' }, inventory: { create: { available: 250, reserved: 0, sold: 0 } } } }),
    prisma.product.create({ data: { sku: 'JBR-3001', name: 'LED Downlight 12W', slug: 'led-downlight-12w', description: 'Energy-efficient 12W LED downlight with cool white illumination.', brandId: brands[0].id, categoryId: categories[2].id, images: ['https://images.pexels.com/photos/539319/pexels-photo-539319.jpeg'], price: 420, stock: 60, status: 'ACTIVE', specifications: { wattage: '12W', colorTemperature: '6500K' }, inventory: { create: { available: 60, reserved: 0, sold: 0 } } } }),
  ]);

  await Promise.all(customers.slice(0, 2).map(async (customer, index) => {
    const customerProfile = customer.customerProfile;
    if (!customerProfile) throw new Error('Missing customer profile');
    const address = await prisma.address.create({ data: { customerId: customerProfile.id, label: 'Home Address', line1: `123${index} Main Street`, city: 'Hyderabad', state: 'Telangana', postalCode: '500002', country: 'India', latitude: 17.3850, longitude: 78.4867, isDefault: true } });
    await prisma.order.create({
      data: {
        orderNumber: `JBR-ORD-10${index + 1}`,
        customerId: customerProfile.id,
        status: index === 0 ? 'CONFIRMED' : 'PENDING',
        subtotal: 210,
        tax: 25.2,
        deliveryFee: 49,
        total: 284.2,
        shippingAddressId: address.id,
        items: { create: [{ productId: products[index].id, quantity: 2, unitPrice: products[index].salePrice ?? products[index].price, total: 2 * (products[index].salePrice ?? products[index].price) }] },
        payment: { create: { provider: 'MANUAL', amount: 284.2, status: 'PENDING' } },
        delivery: { create: { status: index === 0 ? 'ASSIGNED' : 'UNASSIGNED', deliveryLocation: { city: address.city, state: address.state, postalCode: address.postalCode, latitude: address.latitude, longitude: address.longitude }, deliveryBoyId: index === 0 ? (await prisma.deliveryBoyProfile.findFirst())?.id : undefined } },
        statusHistory: { create: [{ status: 'PENDING', changedById: customer.id, note: 'Order created for seed data' }] },
      },
    });
  }));

  console.log('Seed completed.');
}

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
