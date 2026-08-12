import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { menuItems, restaurants } from '../src/data/seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: 'guest' },
    update: { name: 'Convidado MyFood' },
    create: {
      id: 'guest',
      name: 'Convidado MyFood',
      role: 'customer',
    },
  });

  const demoHash = await bcrypt.hash('myfood123', 10);
  await prisma.user.upsert({
    where: { email: 'cliente@myfood.app' },
    update: {
      name: 'Cliente Demo',
      passwordHash: demoHash,
      role: 'customer',
      restaurantId: null,
    },
    create: {
      id: 'usr_demo',
      name: 'Cliente Demo',
      email: 'cliente@myfood.app',
      passwordHash: demoHash,
      role: 'customer',
      restaurantId: null,
    },
  });

  await prisma.user.upsert({
    where: { email: 'restaurante@myfood.app' },
    update: {
      name: 'Parceiro Távola',
      passwordHash: demoHash,
      role: 'restaurant',
      restaurantId: 'tavola-guaira',
    },
    create: {
      id: 'usr_rest',
      name: 'Parceiro Távola',
      email: 'restaurante@myfood.app',
      passwordHash: demoHash,
      role: 'restaurant',
      restaurantId: 'tavola-guaira',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@myfood.app' },
    update: {
      name: 'Admin MyFood',
      passwordHash: demoHash,
      role: 'admin',
      restaurantId: null,
    },
    create: {
      id: 'usr_admin',
      name: 'Admin MyFood',
      email: 'admin@myfood.app',
      passwordHash: demoHash,
      role: 'admin',
      restaurantId: null,
    },
  });

  for (const restaurant of restaurants) {
    await prisma.restaurant.upsert({
      where: { id: restaurant.id },
      update: {
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        reviews: restaurant.reviews,
        deliveryMinutes: restaurant.deliveryMinutes,
        deliveryFee: restaurant.deliveryFee,
        image: restaurant.image,
        cover: restaurant.cover,
        distanceKm: restaurant.distanceKm,
        featured: Boolean(restaurant.featured),
        categories: restaurant.categories,
      },
      create: {
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        reviews: restaurant.reviews,
        deliveryMinutes: restaurant.deliveryMinutes,
        deliveryFee: restaurant.deliveryFee,
        image: restaurant.image,
        cover: restaurant.cover,
        distanceKm: restaurant.distanceKm,
        featured: Boolean(restaurant.featured),
        categories: restaurant.categories,
      },
    });
  }

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {
        restaurantId: item.restaurantId,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        tags: item.tags ?? [],
      },
      create: {
        id: item.id,
        restaurantId: item.restaurantId,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        tags: item.tags ?? [],
      },
    });
  }

  console.log(
    `Seed OK: ${restaurants.length} restaurantes, ${menuItems.length} itens; users: guest, cliente@, restaurante@, admin@`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
