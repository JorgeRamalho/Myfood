export type FoodSlide = {
  id: string;
  title: string;
  image: string;
};

/**
 * Imagens locais em public/media/carousel (fonte da verdade).
 * Evite trocar IDs sem revalidar o conteúdo da foto.
 */
export const foodCarouselSlides: FoodSlide[] = [
  { id: "pizza", title: "Pizza", image: "/media/carousel/pizza.jpg" },
  { id: "hamburger", title: "Hambúrguer", image: "/media/carousel/hamburger.jpg" },
  { id: "batata-frita", title: "Batata frita", image: "/media/carousel/batata-frita.jpg" },
  { id: "milk-shake", title: "Milk shake", image: "/media/carousel/milk-shake.jpg" },
  { id: "kebab", title: "Kebab", image: "/media/carousel/kebab.jpg" },
  { id: "shawarma", title: "Shawarma", image: "/media/carousel/shawarma.jpg" },
  { id: "marmitex", title: "Prato feito", image: "/media/carousel/marmitex.jpg" },
  { id: "espetos", title: "Espetos", image: "/media/carousel/espetos.jpg" },
  { id: "hot-dog", title: "Hot dog", image: "/media/carousel/hot-dog.jpg" },
  { id: "sushi", title: "Sushi", image: "/media/carousel/sushi.jpg" },
  { id: "poke-havaiano", title: "Poke havaiano", image: "/media/carousel/poke-havaiano.jpg" },
  { id: "massas-italianas", title: "Massas italianas", image: "/media/carousel/massas-italianas.jpg" },
  { id: "frutos-do-mar", title: "Frutos do mar", image: "/media/carousel/frutos-do-mar.jpg" },
  { id: "lasanha", title: "Lasanha", image: "/media/carousel/lasanha.jpg" },
  { id: "ramen", title: "Ramen", image: "/media/carousel/ramen.jpg" },
  { id: "paella", title: "Paella", image: "/media/carousel/paella.jpg" },
  { id: "churrasco", title: "Churrasco", image: "/media/carousel/churrasco.jpg" },
  { id: "acai", title: "Açaí", image: "/media/carousel/acai.jpg" },
  { id: "refeicao", title: "Refeição completa", image: "/media/carousel/refeicao.jpg" },
  { id: "tacos", title: "Tacos", image: "/media/carousel/tacos.jpg" },
  { id: "salmao", title: "Salmão grelhado", image: "/media/carousel/salmao.jpg" },
];
