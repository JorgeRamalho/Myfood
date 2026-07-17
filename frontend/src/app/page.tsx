"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { FoodCarousel } from "@/components/ui/FoodCarousel";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { categories, restaurants } from "@/data/mock";

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const featured = restaurants.filter((item) => item.featured);
  const nearby = restaurants;

  return (
    <div>
      <FoodCarousel />

      <section className="mf-section">
        <FadeIn>
          <div className="mf-container">
            <div className="mf-hero-panel overflow-hidden rounded-[2rem] px-6 py-10 md:px-12 md:py-14">
              <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    App MyFood
                  </p>
                  <h2 className="mf-display text-3xl font-extrabold md:text-4xl">
                    Leve o MyFood no bolso
                  </h2>
                  <p className="max-w-md text-sm text-white/85 md:text-base">
                    Escaneie o QR Code e instale pela Play Store ou App Store.
                  </p>
                  <Link href="/baixar">
                    <Button variant="secondary" className="!text-ink">
                      Ver QR Codes
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </Link>
                </div>
                <div className="mf-float relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-[1.5rem] md:h-56">
                  <Image
                    src="/brand/logo-mark.png"
                    alt="Logomarca MyFood"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section aria-labelledby="destaques-title" className="mf-section pt-0">
        <div className="mf-container space-y-6">
          <div>
            <h2
              id="destaques-title"
              className="mf-title text-2xl font-semibold md:text-3xl"
            >
              Em alta perto de você
            </h2>
            <p className="mf-caption mt-1">
              Destaques em Guaíra e arredores · Curitiba-PR
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
                featured
              />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="categorias-title"
        className="mf-section border-b border-[rgba(20,20,20,0.05)] bg-white/50"
      >
        <div className="mf-container space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="categorias-title"
                className="mf-title text-2xl font-semibold md:text-3xl"
              >
                Categorias
              </h2>
              <p className="mf-caption mt-1">
                Escolha o que combina com o seu momento.
              </p>
            </div>
            <Link href="/buscar" className="text-sm font-semibold text-teal">
              Ver todas
            </Link>
          </div>
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
            role="list"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                role="listitem"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * index }}
              >
                <Link
                  href={`/buscar?categoria=${category.id}`}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white px-3 py-5 shadow-[0_10px_28px_rgba(20,20,20,0.05)] transition hover:-translate-y-1"
                >
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-blush text-2xl"
                    aria-hidden
                  >
                    {category.emoji}
                  </span>
                  <span className="text-center text-sm font-semibold text-ink">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="proximos-title" className="mf-section">
        <div className="mf-container space-y-6">
          <div>
            <h2
              id="proximos-title"
              className="mf-title text-2xl font-semibold md:text-3xl"
            >
              Restaurantes próximos
            </h2>
            <p className="mf-caption mt-1">
              Perto de Rua Previsto Columbia, 210 — Guaíra, Curitiba-PR (CEP
              80.630-240). Pizza, japonesa, churrasco, açaí e mais.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mf-hero-bleed" aria-labelledby="hero-title">
        <Image
          src="/brand/hero-food.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        <div className="mf-container relative z-10 pb-16 pt-24 md:pb-20 md:pt-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-5"
          >
            <p className="mf-display text-5xl font-extrabold tracking-tight md:text-7xl">
              My<span className="text-[#FFB4A2]">Food</span>
            </p>
            <h1
              id="hero-title"
              className="mf-title text-2xl font-semibold text-white/95 md:text-3xl"
            >
              {brand.slogan}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Peça nos melhores restaurantes da sua região, com entrega rápida e
              uma experiência web clara do início ao fim.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/buscar">
                <Button variant="secondary" size="lg" className="!text-ink">
                  Explorar restaurantes
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <Link href="/baixar">
                <Button
                  variant="ghost"
                  size="lg"
                  className="!text-white ring-1 ring-white/35"
                >
                  Baixar o app
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
