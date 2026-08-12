import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listFeaturedRestaurants,
  listRestaurants,
} from "../api";
import { withFallback } from "../api/withFallback";
import FoodCarousel from "../components/FoodCarousel";
import RestaurantCard from "../components/RestaurantCard";
import {
  brand,
  categories,
  getLocalFeaturedRestaurants,
  filterLocalRestaurants,
} from "../data";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("api");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const [featuredResult, nearbyResult] = await Promise.all([
        withFallback(listFeaturedRestaurants, getLocalFeaturedRestaurants),
        withFallback(
          () => listRestaurants(),
          () => filterLocalRestaurants(),
        ),
      ]);
      if (cancelled) return;
      setFeatured(featuredResult.data || []);
      setNearby(nearbyResult.data || []);
      setSource(
        featuredResult.source === "api" && nearbyResult.source === "api"
          ? "api"
          : "fallback",
      );
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      window.MyFoodJS?.observeReveals();
    }
  }, [loading, featured, nearby]);

  return (
    <>
      <section className="mf-hero mf-hero-first" aria-labelledby="hero-title">
        <img src="./brand/hero-food.png" alt="" aria-hidden="true" />
        <div className="mf-container mf-hero-content">
          <h1 id="hero-title" className="mf-display">
            My<span>Food</span>
          </h1>
          <p className="lead">{brand.slogan}</p>
          <p>
            Peça nos melhores restaurantes da sua região, com entrega rápida e
            uma experiência web clara do início ao fim.
          </p>
          <div className="mf-actions">
            <Link to="/buscar" className="mf-btn mf-btn-secondary">
              Explorar restaurantes →
            </Link>
            <Link to="/baixar" className="mf-btn mf-btn-ghost">
              Baixar o app
            </Link>
          </div>
        </div>
      </section>

      <section
        className="mf-section"
        style={{ background: "rgba(255,255,255,0.5)" }}
      >
        <div className="mf-container">
          <div className="mf-section-head">
            <div>
              <h2 className="mf-title">Categorias</h2>
              <p className="mf-caption">
                Escolha o que combina com o seu momento.
              </p>
            </div>
            <Link to="/buscar" className="mf-link">
              Ver todas
            </Link>
          </div>
          <div className="mf-grid-cats">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/buscar?categoria=${category.id}`}
                className="mf-cat mf-reveal"
              >
                <span className="mf-cat-icon" aria-hidden="true">
                  {category.emoji}
                </span>
                <strong>{category.name}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section" style={{ paddingTop: 0 }}>
        <div className="mf-container">
          <div className="mf-section-head">
            <div>
              <h2 className="mf-title">Em alta perto de você</h2>
              <p className="mf-caption">
                Destaques em Guaíra e arredores · Curitiba-PR
                {source === "fallback" ? " · modo offline" : ""}
              </p>
            </div>
          </div>
          {loading ? (
            <p className="mf-caption">Carregando destaques…</p>
          ) : (
            <div className="mf-grid-cards">
              {featured.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <FoodCarousel />

      <section className="mf-section">
        <div className="mf-container">
          <div className="mf-banner mf-reveal">
            <div>
              <p
                style={{
                  margin: 0,
                  opacity: 0.75,
                  letterSpacing: "0.12em",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                APP MYFOOD
              </p>
              <h2 className="mf-display">Leve o MyFood no bolso</h2>
              <p>
                Escaneie o QR Code e instale pela Play Store ou App Store.
              </p>
              <div className="mf-actions">
                <Link to="/baixar" className="mf-btn mf-btn-secondary">
                  Ver QR Codes →
                </Link>
              </div>
            </div>
            <div className="mf-banner-mark">
              <img src="./brand/logo-mark.png" alt="Logomarca MyFood" />
            </div>
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <div className="mf-section-head">
            <div>
              <h2 className="mf-title">Restaurantes próximos</h2>
              <p className="mf-caption">
                Perto de você em Guaíra · Curitiba-PR
              </p>
            </div>
          </div>
          {loading ? (
            <p className="mf-caption">Carregando restaurantes…</p>
          ) : (
            <div className="mf-grid-cards three">
              {nearby.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
