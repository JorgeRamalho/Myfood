"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { foodCarouselSlides } from "@/data/foodCarousel";
import { cn } from "@/lib/cn";

const AUTO_MS = 4200;

export function FoodCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const total = foodCarouselSlides.length;
  const current = foodCarouselSlides[index];

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, total]);

  const goTo = (next: number) => {
    setIndex((next + total) % total);
  };

  return (
    <section
      className="relative h-[calc(100dvh-4.5rem)] min-h-[calc(100svh-4.5rem)] overflow-hidden bg-ink"
      aria-roledescription="carrossel"
      aria-label="Carrossel de refeições"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {foodCarouselSlides.map((slide, slideIndex) => (
        <figure
          key={slide.id}
          className={cn(
            "absolute inset-0 m-0 transition-opacity duration-700",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={slideIndex !== index}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={slideIndex === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        </figure>
      ))}

      <div className="mf-container relative z-10 flex h-full flex-col justify-end pb-10 pt-20 md:pb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70 md:text-sm">
          Sabores em destaque
        </p>
        <p
          className="mf-display mt-2 text-4xl font-extrabold text-white md:text-6xl lg:text-7xl"
          aria-live="polite"
        >
          {current.title}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink"
            aria-label="Imagem anterior"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Selecionar imagem"
          >
            {foodCarouselSlides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Ir para ${slide.title}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  slideIndex === index
                    ? "w-8 bg-tomato"
                    : "w-2.5 bg-white/55 hover:bg-white/80",
                )}
                onClick={() => goTo(slideIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink"
            aria-label="Próxima imagem"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
