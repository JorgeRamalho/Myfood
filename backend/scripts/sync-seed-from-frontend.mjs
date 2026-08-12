import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { restaurants } from "../../frontend/src/data/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const restaurantRows = restaurants.map(({ menu: _menu, ...r }) => r);
const menuItems = restaurants.flatMap((r) =>
  (r.menu || []).map((item) => ({
    id: item.id,
    restaurantId: r.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    ...(item.tags ? { tags: item.tags } : {}),
  })),
);

const seedOrders = [
  {
    id: "MF-10482",
    userId: "guest",
    restaurantId: "tavola-guaira",
    restaurantName: "Pizzaria Távola",
    items: [
      {
        menuItemId: "tavola-especial",
        name: "Pizza Távola",
        quantity: 1,
        price: 69.9,
      },
      {
        menuItemId: "tavola-seis-queijos",
        name: "Meia 6 Queijos",
        quantity: 1,
        price: 64.9,
      },
    ],
    total: 140.7,
    status: "a_caminho",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MF-10311",
    userId: "guest",
    restaurantId: "gebon-vila-guaira",
    restaurantName: "Gebon Vila Guaíra",
    items: [
      {
        menuItemId: "acai-gebon",
        name: "Açaí no Copo",
        quantity: 1,
        price: 24.9,
      },
    ],
    total: 28.8,
    status: "entregue",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  },
];

const header = `export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryMinutes: number;
  deliveryFee: number;
  image: string;
  cover: string;
  distanceKm: number;
  featured?: boolean;
  categories: string[];
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
};

export type Order = {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: Array<{ menuItemId: string; name: string; quantity: number; price: number }>;
  total: number;
  status: 'preparando' | 'a_caminho' | 'entregue' | 'cancelado';
  createdAt: string;
};

/** Catálogo demo Guaíra — espelha frontend/src/data/index.js (rode scripts/sync-seed-from-frontend.mjs) */
`;

const out =
  header +
  `export const restaurants: Restaurant[] = ${JSON.stringify(restaurantRows, null, 2)};\n\n` +
  `export const menuItems: MenuItem[] = ${JSON.stringify(menuItems, null, 2)};\n\n` +
  `export const orders: Order[] = ${JSON.stringify(seedOrders, null, 2)};\n`;

const target = path.join(root, "backend/src/data/seed.ts");
writeFileSync(target, out);
console.log(
  `Wrote ${target} (${restaurantRows.length} restaurants, ${menuItems.length} menu items)`,
);
