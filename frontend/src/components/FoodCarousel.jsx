import { useEffect, useState } from "react";
import { foodCarouselSlides } from "../data/foodCarousel";

const AUTO_MS = 4200;

export default function FoodCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = foodCarouselSlides.length;

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goTo = (next) => {
    setIndex((next + total) % total);
  };

  const current = foodCarouselSlides[index];

  return (
    <section
      className="mf-food-carousel"
      aria-roledescription="carrossel"
      aria-label="Carrossel de refeições"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mf-food-carousel-track">
        {foodCarouselSlides.map((slide, slideIndex) => (
          <figure
            key={slide.id}
            className={`mf-food-slide ${slideIndex === index ? "is-active" : ""}`}
            aria-hidden={slideIndex !== index}
          >
            <img src={slide.image} alt={slide.title} />
            <figcaption>
              <span>{slide.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mf-food-carousel-ui mf-container">
        <p className="mf-food-carousel-kicker">Sabores em destaque</p>
        <p className="mf-food-carousel-title mf-display" aria-live="polite">
          {current.title}
        </p>

        <div className="mf-food-carousel-controls">
          <button
            type="button"
            className="mf-food-nav"
            aria-label="Imagem anterior"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
          <div className="mf-food-dots" role="tablist" aria-label="Selecionar imagem">
            {foodCarouselSlides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Ir para ${slide.title}`}
                className={`mf-food-dot ${slideIndex === index ? "is-active" : ""}`}
                onClick={() => goTo(slideIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            className="mf-food-nav"
            aria-label="Próxima imagem"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
