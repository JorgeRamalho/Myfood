"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Clock3, Star, Bike } from "lucide-react";
import type { Restaurant } from "@/data/mock";
import { formatCurrency } from "@/data/mock";
import { cn } from "@/lib/cn";

type RestaurantCardProps = {
  restaurant: Restaurant;
  index?: number;
  featured?: boolean;
};

export function RestaurantCard({
  restaurant,
  index = 0,
  featured = false,
}: RestaurantCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={cn(
        "h-full overflow-hidden rounded-[1.6rem] bg-white shadow-[0_10px_30px_rgba(20,20,20,0.06)]",
        featured && "ring-1 ring-[rgba(224,49,31,0.18)]",
      )}
    >
      <Link
        href={`/restaurante/${restaurant.id}`}
        className="block h-full focus-visible:outline-none"
        aria-label={`Abrir ${restaurant.name}`}
      >
        <div className="relative h-48 overflow-hidden md:h-56">
          <Image
            src={restaurant.image}
            alt={`Pratos de ${restaurant.name}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-ink">
            <Star className="h-3.5 w-3.5 fill-amber text-amber" aria-hidden />
            {restaurant.rating.toFixed(1)}
            <span className="font-normal text-[rgba(20,20,20,0.55)]">
              ({restaurant.reviews})
            </span>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <div>
            <h3 className="mf-title text-xl font-semibold text-ink">
              {restaurant.name}
            </h3>
            <p className="mf-caption mt-1">{restaurant.cuisine}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[rgba(20,20,20,0.68)]">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-4 w-4" aria-hidden />
              {restaurant.deliveryMinutes} min
            </span>
            <span className="inline-flex items-center gap-1">
              <Bike className="h-4 w-4" aria-hidden />
              {formatCurrency(restaurant.deliveryFee)}
            </span>
            <span>{restaurant.distanceKm} km</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
