import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listRestaurants } from "../api";
import { withFallback } from "../api/withFallback";
import RestaurantCard from "../components/RestaurantCard";
import { categories, filterLocalRestaurants } from "../data";

export default function Buscar() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("categoria") || "todos");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("api");

  useEffect(() => {
    const fromUrl = params.get("categoria");
    if (fromUrl) setCategory(fromUrl);
  }, [params]);

  useEffect(() => {
    let cancelled = false;
    const handle = window.setTimeout(async () => {
      setLoading(true);
      const categoryParam = category === "todos" ? undefined : category;
      const q = query.trim() || undefined;
      const result = await withFallback(
        () => listRestaurants({ category: categoryParam, q }),
        () => filterLocalRestaurants({ category: categoryParam, q }),
      );
      if (cancelled) return;
      setResults(result.data || []);
      setSource(result.source);
      setLoading(false);
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [category, query]);

  useEffect(() => {
    if (!loading) {
      window.MyFoodJS?.observeReveals();
    }
  }, [loading, results]);

  return (
    <section className="mf-section">
      <div className="mf-container">
        <h1 className="mf-page-title mf-display">Restaurantes</h1>
        <p className="mf-caption">
          Busque por nome, culinária ou filtre por categoria.
          {source === "fallback" ? " · modo offline" : ""}
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
          {loading
            ? "Buscando…"
            : `${results.length} resultado${results.length === 1 ? "" : "s"}`}
        </p>

        {!loading && (
          <div className="mf-grid-cards three">
            {results.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="mf-empty" style={{ marginTop: "1rem" }}>
            <h2 className="mf-title">Nada por aqui</h2>
            <p className="mf-caption">Tente outra categoria ou termo.</p>
          </div>
        )}
      </div>
    </section>
  );
}
