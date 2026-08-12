"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock3, Plus, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatCurrency, getRestaurantById } from "@/data/mock";

export default function RestaurantPage() {
  const params = useParams<{ id: string }>();
  const restaurant = getRestaurantById(params.id);
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();

  if (!restaurant) {
    return (
      <div className="mf-container space-y-4 py-20 text-center">
        <h1 className="mf-title text-3xl font-bold">Restaurante não encontrado</h1>
        <Link href="/buscar" className="text-teal underline">
          Voltar aos restaurantes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="relative h-[42vw] min-h-[280px] max-h-[420px] overflow-hidden">
        <Image
          src={restaurant.cover}
          alt={`Capa de ${restaurant.name}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />
        <div className="mf-container relative z-10 flex h-full flex-col justify-end pb-10">
          <Link
            href="/buscar"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-ink backdrop-blur"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar
          </Link>
          <h1 className="mf-display text-4xl font-extrabold text-white md:text-5xl">
            {restaurant.name}
          </h1>
          <p className="mt-2 text-base text-white/85 md:text-lg">
            {restaurant.cuisine}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-white">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
              <Star className="h-4 w-4 fill-amber text-amber" aria-hidden />
              {restaurant.rating.toFixed(1)} · {restaurant.reviews} avaliações
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
              <Clock3 className="h-4 w-4" aria-hidden />
              {restaurant.deliveryMinutes} min
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
              Taxa {formatCurrency(restaurant.deliveryFee)}
            </span>
          </div>
        </div>
      </section>

      <section
        className="mf-section"
        aria-labelledby="cardapio-title"
      >
        <div className="mf-container space-y-6">
          <h2
            id="cardapio-title"
            className="mf-title text-2xl font-semibold md:text-3xl"
          >
            Cardápio
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {restaurant.menu.map((item, index) => (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex gap-4 rounded-[1.4rem] bg-white p-4 shadow-[0_10px_28px_rgba(20,20,20,0.05)]"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="mf-title text-lg font-semibold">{item.name}</h3>
                    {item.tags?.[0] && (
                      <span className="rounded-full bg-blush px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-tomato">
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-[rgba(20,20,20,0.62)]">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <p className="text-base font-bold text-ink">
                      {formatCurrency(item.price)}
                    </p>
                    <Button
                      size="sm"
                      aria-label={`Adicionar ${item.name} à sacola`}
                      onClick={() =>
                        addItem({
                          id: item.id,
                          restaurantId: restaurant.id,
                          restaurantName: restaurant.name,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
