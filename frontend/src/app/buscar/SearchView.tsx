"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { categories, restaurants } from "@/data/mock";
import { cn } from "@/lib/cn";

export function SearchView() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") ?? "todos";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const results = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesCategory =
        category === "todos" || restaurant.categories.includes(category);
      const haystack = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mf-section">
      <div className="mf-container space-y-8">
        <FadeIn>
          <div className="max-w-2xl space-y-3">
            <h1 className="mf-display text-4xl font-extrabold md:text-5xl">
              Restaurantes
            </h1>
            <p className="mf-caption text-base">
              Busque por nome, culinária ou filtre por categoria.
            </p>
          </div>
        </FadeIn>

        <label className="relative mx-auto block max-w-2xl">
          <span className="sr-only">Buscar restaurantes</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[rgba(20,20,20,0.4)]"
            aria-hidden
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pizza, sushi, hambúrguer..."
            className="w-full rounded-2xl border border-[rgba(20,20,20,0.08)] bg-white py-4 pl-12 pr-4 text-base shadow-[0_8px_24px_rgba(20,20,20,0.04)] outline-none transition focus:border-teal"
          />
        </label>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtrar por categoria"
        >
          <button
            type="button"
            role="tab"
            aria-selected={category === "todos"}
            onClick={() => setCategory("todos")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              category === "todos"
                ? "bg-ink text-white"
                : "bg-white text-ink shadow-sm",
            )}
          >
            Todos
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                category === item.id
                  ? "bg-tomato text-white"
                  : "bg-white text-ink shadow-sm",
              )}
            >
              {item.emoji} {item.name}
            </button>
          ))}
        </div>

        <div className="space-y-4" aria-live="polite">
          <p className="text-sm text-[rgba(20,20,20,0.6)]">
            {results.length} resultado{results.length === 1 ? "" : "s"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
          {results.length === 0 && (
            <div className="rounded-[1.4rem] bg-white p-10 text-center shadow-sm">
              <p className="mf-title text-xl font-semibold">Nada por aqui</p>
              <p className="mf-caption mt-2">
                Tente outra categoria ou um termo diferente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
