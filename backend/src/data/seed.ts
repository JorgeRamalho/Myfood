export type Restaurant = {
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

export const restaurants: Restaurant[] = [
  {
    id: 'casa-do-fogo',
    name: 'Casa do Fogo',
    cuisine: 'Burgers artesanais',
    rating: 4.9,
    reviews: 1284,
    deliveryMinutes: 28,
    deliveryFee: 4.9,
    distanceKm: 1.2,
    featured: true,
    categories: ['burgers'],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    cover:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nonna-rosso',
    name: 'Nonna Rosso',
    cuisine: 'Pizza napolitana',
    rating: 4.8,
    reviews: 902,
    deliveryMinutes: 35,
    deliveryFee: 6.5,
    distanceKm: 2.4,
    featured: true,
    categories: ['pizza'],
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    cover:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'umami-lab',
    name: 'Umami Lab',
    cuisine: 'Japonesa contemporânea',
    rating: 4.7,
    reviews: 640,
    deliveryMinutes: 40,
    deliveryFee: 7.9,
    distanceKm: 3.1,
    categories: ['japonesa'],
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    cover:
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1200&q=80',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'smash-myfood',
    restaurantId: 'casa-do-fogo',
    name: 'Smash MyFood',
    description: 'Duplo smash, cheddar maturado, picles e molho da casa.',
    price: 34.9,
    image:
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    tags: ['mais pedido'],
  },
  {
    id: 'fries-truffle',
    restaurantId: 'casa-do-fogo',
    name: 'Fritas Truffle',
    description: 'Batata crocante, azeite trufado e parmesão.',
    price: 22.5,
    image:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'margherita',
    restaurantId: 'nonna-rosso',
    name: 'Margherita Di Bufala',
    description: 'Molho San Marzano, búfala e manjericão fresco.',
    price: 59.9,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    tags: ['assinatura'],
  },
];

export const orders: Order[] = [
  {
    id: 'MF-10482',
    userId: 'guest',
    restaurantId: 'casa-do-fogo',
    restaurantName: 'Casa do Fogo',
    items: [
      {
        menuItemId: 'smash-myfood',
        name: 'Smash MyFood',
        quantity: 1,
        price: 34.9,
      },
    ],
    total: 62.3,
    status: 'a_caminho',
    createdAt: new Date().toISOString(),
  },
];
