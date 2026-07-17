/**
 * MyFood — scripts utilitários do website
 * Trabalha junto com a pasta /react
 */

const MyFoodJS = {
  init() {
    this.bindGlobalEvents();
    this.observeReveals();
    this.setYear();
  },

  bindGlobalEvents() {
    document.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-menu-toggle]");
      if (toggle) {
        const menu = document.querySelector("[data-mobile-nav]");
        menu?.classList.toggle("open");
        const expanded = menu?.classList.contains("open");
        toggle.setAttribute("aria-expanded", String(Boolean(expanded)));
      }

      if (event.target.closest("[data-mobile-nav] a")) {
        document.querySelector("[data-mobile-nav]")?.classList.remove("open");
      }
    });

    window.addEventListener("myfood:cart-updated", (event) => {
      const count = event.detail?.count ?? 0;
      document.querySelectorAll("[data-cart-count]").forEach((badge) => {
        badge.textContent = String(count);
        badge.hidden = count <= 0;
      });
    });
  },

  observeReveals() {
    const nodes = document.querySelectorAll(".mf-reveal");
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
  },

  setYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  },

  money(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },

  notifyCart(count) {
    window.dispatchEvent(
      new CustomEvent("myfood:cart-updated", {
        detail: { count },
      }),
    );
  },
};

window.MyFoodJS = MyFoodJS;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => MyFoodJS.init());
} else {
  MyFoodJS.init();
}

export default MyFoodJS;
