import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import { categories, restaurants } from "../data";

export default function Buscar() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("categoria") || "todos");

  const results = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesCategory =
        category === "todos" || restaurant.categories.includes(category);
      const haystack = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  useEffect(() => {
    window.MyFoodJS?.observeReveals();
  }, [results]);

  return (
    <section className="mf-section">
      <div className="mf-container">
        <h1 className="mf-page-title mf-display">Restaurantes</h1>
        <p className="mf-caption">
          Busque por nome, culinária ou filtre por categoria.
        </p>

        <div className="mf-search">
          <label className="sr-only" htmlFor="busca">
            Buscar restaurantes
          </label>
          <input
            id="busca"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pizza, sushi, hambúrguer..."
          />
        </div>

        <div className="mf-filters" role="tablist" aria-label="Categorias">
          <button
            type="button"
            className={`mf-chip all ${category === "todos" ? "active" : ""}`}
            onClick={() => setCategory("todos")}
          >
            Todos
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`mf-chip ${category === item.id ? "active" : ""}`}
              onClick={() => setCategory(item.id)}
            >
              {item.emoji} {item.name}
            </button>
          ))}
        </div>

        <p className="mf-caption" style={{ marginBottom: "1rem" }}>
          {results.length} resultado{results.length === 1 ? "" : "s"}
        </p>

        <div className="mf-grid-cards three">
          {results.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mf-empty" style={{ marginTop: "1rem" }}>
            <h2 className="mf-title">Nada por aqui</h2>
            <p className="mf-caption">Tente outra categoria ou termo.</p>
          </div>
        )}
      </div>
    </section>
  );
}
