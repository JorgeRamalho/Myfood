export const brand = {
  name: "MyFood",
  slogan: "O sabor que vem até você.",
  tagline: "Peça. Saboreie. Repita.",
  stores: {
    playStore: "https://play.google.com/store/apps/details?id=com.myfood.app",
    appStore: "https://apps.apple.com/app/myfood/id0000000000",
  },
};

/** Endereço de referência do demo (CEP 80630-240) */
export const deliveryLocation = {
  label: "Rua Previsto Columbia, 210",
  neighborhood: "Guaíra",
  city: "Curitiba",
  state: "PR",
  cep: "80630-240",
  full: "Rua Previsto Columbia, 210 — Guaíra, Curitiba-PR",
};

export const categories = [
  { id: "burgers", name: "Burgers", emoji: "🍔" },
  { id: "pizza", name: "Pizza", emoji: "🍕" },
  { id: "japonesa", name: "Japonesa", emoji: "🍣" },
  { id: "asiatica", name: "Asiática", emoji: "🥡" },
  { id: "saudavel", name: "Saudável", emoji: "🥗" },
  { id: "doce", name: "Doces", emoji: "🧁" },
  { id: "brasileira", name: "Brasileira", emoji: "🍛" },
  { id: "lanches", name: "Lanches", emoji: "🌭" },
];

/**
 * Restaurantes próximos ao CEP 80630-240 (Rua Previsto Columbia, 210 — Guaíra).
 * Nomes e endereços baseados em pesquisa pública na região Guaíra / Portão / Água Verde.
 * Tempos, taxas e avaliações são ilustrativos para o demo do MyFood.
 */
export const restaurants = [
  {
    id: "tavola-guaira",
    name: "Pizzaria Távola",
    cuisine: "Pizza no forno a lenha · Guaíra",
    rating: 4.8,
    reviews: 977,
    deliveryMinutes: 32,
    deliveryFee: 5.9,
    distanceKm: 1.6,
    featured: true,
    categories: ["pizza"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "tavola-especial",
        name: "Pizza Távola",
        description: "Massa média crocante, cobertura generosa e forno a lenha.",
        price: 69.9,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        tags: ["mais pedido"],
      },
      {
        id: "tavola-seis-queijos",
        name: "Meia 6 Queijos",
        description: "Blend de queijos com massa bem assada.",
        price: 64.9,
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "bilbo-pizzaria",
    name: "Bilbo Pizzaria",
    cuisine: "Pizza italiana artesanal · Guaíra",
    rating: 4.7,
    reviews: 412,
    deliveryMinutes: 28,
    deliveryFee: 4.9,
    distanceKm: 0.7,
    featured: true,
    categories: ["pizza"],
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "bilbo-gourmet",
        name: "Pizza Gourmet",
        description: "Massa leve, molho caseiro e coberturas selecionadas.",
        price: 62.0,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        tags: ["artesanal"],
      },
      {
        id: "bilbo-doce",
        name: "Pizza Doce Especial",
        description: "Sobremesa no estilo Bilbo, para dividir.",
        price: 54.9,
        image:
          "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "millenium-guaira",
    name: "Millenium Pizzaria e Hamburgueria",
    cuisine: "Pizza & burgers · Guaíra",
    rating: 4.6,
    reviews: 680,
    deliveryMinutes: 35,
    deliveryFee: 5.5,
    distanceKm: 2.0,
    featured: true,
    categories: ["pizza", "burgers"],
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "millenium-pizza",
        name: "Pizza Especial",
        description: "Mais de 80 sabores tradicionais, especiais e doces.",
        price: 58.9,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        tags: ["variedade"],
      },
      {
        id: "millenium-burger",
        name: "Burger da Casa",
        description: "Hambúrguer suculento com acompanhamento.",
        price: 32.9,
        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "scallas-guaira",
    name: "Pizzaria Scalla's",
    cuisine: "Pizza · Guaíra",
    rating: 4.5,
    reviews: 318,
    deliveryMinutes: 34,
    deliveryFee: 5.9,
    distanceKm: 1.9,
    categories: ["pizza"],
    image:
      "https://images.unsplash.com/photo-1571407970349-4367e2b0b8b5?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "scallas-trad",
        name: "Pizza Tradicional",
        description: "Sabores clássicos para o jantar no Guaíra.",
        price: 55.0,
        image:
          "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "frangovita",
    name: "Frangovita",
    cuisine: "Frango, carnes e pizza · Guaíra",
    rating: 4.4,
    reviews: 890,
    deliveryMinutes: 30,
    deliveryFee: 4.5,
    distanceKm: 1.4,
    featured: true,
    categories: ["brasileira", "pizza"],
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "frango-assado",
        name: "Frango Assado",
        description: "Porção bem servida com tempero da casa.",
        price: 42.0,
        image:
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
        tags: ["clássico"],
      },
      {
        id: "risoto-frangovita",
        name: "Risoto Frangovita",
        description: "Acompanha polenta frita e maionese.",
        price: 38.9,
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "churrascaria-lima",
    name: "Churrascaria Lima",
    cuisine: "Churrasco · Guaíra",
    rating: 4.5,
    reviews: 520,
    deliveryMinutes: 38,
    deliveryFee: 6.9,
    distanceKm: 1.8,
    categories: ["brasileira"],
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "picanha-lima",
        name: "Picanha na Brasa",
        description: "Corte suculento com farofa e vinagrete.",
        price: 72.0,
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
        tags: ["churrasco"],
      },
    ],
  },
  {
    id: "jing-long",
    name: "Jing Long Comida Chinesa",
    cuisine: "Chinesa · Av. Kennedy / Água Verde",
    rating: 4.3,
    reviews: 265,
    deliveryMinutes: 36,
    deliveryFee: 5.9,
    distanceKm: 1.5,
    categories: ["asiatica"],
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "yakisoba-jing",
        name: "Yakisoba Especial",
        description: "Noodles salteados com legumes e proteína.",
        price: 39.9,
        image:
          "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "rolinho-primavera",
        name: "Rolinho Primavera",
        description: "Crocante, para entrada ou compartilhar.",
        price: 22.0,
        image:
          "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "kandoo-agua-verde",
    name: "Kandoo Curitiba",
    cuisine: "Japonesa · Água Verde",
    rating: 4.7,
    reviews: 1102,
    deliveryMinutes: 42,
    deliveryFee: 7.9,
    distanceKm: 3.0,
    featured: true,
    categories: ["japonesa"],
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "kandoo-combinado",
        name: "Combinado Fresco",
        description: "Peças selecionadas com peixe no ponto certo.",
        price: 89.0,
        image:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80",
        tags: ["premium"],
      },
      {
        id: "kandoo-sashimi",
        name: "Sashimi de Salmão",
        description: "Fatias frescas, tipicamente Kandoo.",
        price: 64.0,
        image:
          "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "taisho-agua-verde",
    name: "Taisho Delivery",
    cuisine: "Japonesa & yakisoba · Água Verde",
    rating: 4.6,
    reviews: 754,
    deliveryMinutes: 40,
    deliveryFee: 6.9,
    distanceKm: 2.8,
    categories: ["japonesa"],
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "taisho-sushi",
        name: "Combinado Sushi",
        description: "Sushi e sashimi para o almoço ou jantar.",
        price: 74.9,
        image:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "taisho-yakisoba",
        name: "Yakisoba",
        description: "Clássico do cardápio Taisho.",
        price: 44.9,
        image:
          "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "gourmet-hamburgueria",
    name: "Gourmet Hamburgueria",
    cuisine: "Burgers smash · Água Verde",
    rating: 4.6,
    reviews: 498,
    deliveryMinutes: 33,
    deliveryFee: 5.5,
    distanceKm: 2.4,
    categories: ["burgers"],
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "smash-bbq",
        name: "Smash BBQ 2.0",
        description: "Combo com batata e refrigerante.",
        price: 49.9,
        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
        tags: ["combo"],
      },
      {
        id: "smash-bacon",
        name: "Smash Bacon 2.0",
        description: "Bacon crocante no smash da casa.",
        price: 39.99,
        image:
          "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "martins-lanches",
    name: "Martins Lanches e Porções",
    cuisine: "Lanches e porções · Lindóia / Guaíra",
    rating: 4.1,
    reviews: 246,
    deliveryMinutes: 29,
    deliveryFee: 4.9,
    distanceKm: 2.1,
    categories: ["lanches", "brasileira"],
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "porcao-martins",
        name: "Porção Compartilhar",
        description: "Porções generosas para a noite.",
        price: 48.0,
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "lanche-martins",
        name: "Lanche da Casa",
        description: "Sanduíche clássico da região.",
        price: 28.9,
        image:
          "https://images.unsplash.com/photo-1550507992-eb194b19e8a5?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "gebon-vila-guaira",
    name: "Gebon Vila Guaíra",
    cuisine: "Açaí no copo e sorvetes · Vila Guaíra",
    rating: 4.8,
    reviews: 390,
    deliveryMinutes: 24,
    deliveryFee: 3.9,
    distanceKm: 1.3,
    featured: true,
    categories: ["doce"],
    image:
      "https://images.unsplash.com/photo-1590080875515-8a3a10ee33af?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "acai-gebon",
        name: "Açaí no Copo",
        description: "Açaí cremoso com toppings à escolha.",
        price: 24.9,
        image:
          "https://images.unsplash.com/photo-1590080875515-8a3a10ee33af?auto=format&fit=crop&w=800&q=80",
        tags: ["favorito"],
      },
      {
        id: "petit-gebon",
        name: "Petit Gateau",
        description: "Sobremesa quente com sorvete.",
        price: 29.9,
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "acai-portao",
    name: "Açaí Portão",
    cuisine: "Açaí e bowls · Portão",
    rating: 4.4,
    reviews: 210,
    deliveryMinutes: 31,
    deliveryFee: 5.5,
    distanceKm: 2.6,
    categories: ["doce", "saudavel"],
    image:
      "https://images.unsplash.com/photo-1627308594171-ebb81d0e2b0a?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "bowl-acai",
        name: "Bowl de Açaí",
        description: "Açaí montado com granola e frutas.",
        price: 26.9,
        image:
          "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "donatello-guaira",
    name: "Donatello Pizzaria",
    cuisine: "Pizza delivery · Guaíra",
    rating: 4.4,
    reviews: 355,
    deliveryMinutes: 30,
    deliveryFee: 4.9,
    distanceKm: 0.6,
    categories: ["pizza"],
    image:
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d2?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "donatello-promo",
        name: "Pizza Promoção",
        description: "Promoções de segunda a quinta, entrega na região.",
        price: 49.9,
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=800&q=80",
        tags: ["promo"],
      },
    ],
  },
  {
    id: "quattro-sorelle",
    name: "Cantina Quattro Sorelle",
    cuisine: "Cantina italiana · Guaíra",
    rating: 4.5,
    reviews: 188,
    deliveryMinutes: 36,
    deliveryFee: 6.5,
    distanceKm: 1.7,
    categories: ["brasileira", "pizza"],
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "massa-sorelle",
        name: "Massa da Casa",
        description: "Prato de cantina com molho artesanal.",
        price: 46.0,
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "nona-maria",
    name: "Nona Maria",
    cuisine: "Comida caseira · Guaíra",
    rating: 4.5,
    reviews: 142,
    deliveryMinutes: 27,
    deliveryFee: 4.5,
    distanceKm: 0.5,
    categories: ["brasileira"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "prato-feito",
        name: "Prato Feito",
        description: "Comida caseira bem servida, perto da Rua Minas Gerais.",
        price: 32.0,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "titao-lanches",
    name: "Bar e Lanchonete Titão",
    cuisine: "Lanches e porções · Guaíra",
    rating: 4.2,
    reviews: 176,
    deliveryMinutes: 26,
    deliveryFee: 3.9,
    distanceKm: 0.4,
    categories: ["lanches"],
    image:
      "https://images.unsplash.com/photo-1550507992-eb194b19e8a5?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "x-titao",
        name: "X-Tudo Titão",
        description: "Lanche completo da Rua Minas Gerais.",
        price: 27.9,
        image:
          "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "total-center-hotdog",
    name: "Total Center Hot Dog",
    cuisine: "Hot dog · Portão / Água Verde",
    rating: 4.3,
    reviews: 301,
    deliveryMinutes: 34,
    deliveryFee: 5.9,
    distanceKm: 2.5,
    categories: ["lanches"],
    image:
      "https://images.unsplash.com/photo-1612392062798-2397ce2f1f5a?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1541214113248-982755b5591a?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "dog-completo",
        name: "Dog Completo",
        description: "Hot dog generoso da Av. República Argentina.",
        price: 24.9,
        image:
          "https://images.unsplash.com/photo-1612392062798-2397ce2f1f5a?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "subway-guaira",
    name: "Subway Guaíra",
    cuisine: "Sanduíches · Av. Kennedy",
    rating: 4.2,
    reviews: 640,
    deliveryMinutes: 25,
    deliveryFee: 4.9,
    distanceKm: 1.4,
    categories: ["saudavel", "lanches"],
    image:
      "https://images.unsplash.com/photo-1509722747041-616f05d657aa?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "subway-italiano",
        name: "Sub Italiano",
        description: "Monte do seu jeito, pão fresco.",
        price: 29.9,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f05d657aa?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "maranello-pizzaria",
    name: "Maranello Pizzaria",
    cuisine: "Pizza · Rua Goiás, Guaíra",
    rating: 4.3,
    reviews: 198,
    deliveryMinutes: 33,
    deliveryFee: 5.5,
    distanceKm: 1.1,
    categories: ["pizza"],
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
    cover:
      "https://images.unsplash.com/photo-1571407970349-4367e2b0b8b5?auto=format&fit=crop&w=1200&q=80",
    menu: [
      {
        id: "maranello-calabresa",
        name: "Calabresa",
        description: "Pizza clássica da Rua Goiás.",
        price: 52.0,
        image:
          "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export const orders = [
  {
    id: "MF-10482",
    restaurantName: "Pizzaria Távola",
    itemsLabel: "Pizza Távola + Meia 6 Queijos",
    total: 134.8,
    status: "a_caminho",
    createdAt: "Hoje · 19:42",
  },
  {
    id: "MF-10311",
    restaurantName: "Gebon Vila Guaíra",
    itemsLabel: "Açaí no Copo",
    total: 28.8,
    status: "entregue",
    createdAt: "Ontem · 21:05",
  },
];

export function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getRestaurantById(id) {
  return restaurants.find((item) => item.id === id);
}
