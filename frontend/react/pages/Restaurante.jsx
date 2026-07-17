import { Link, useParams } from "react-router-dom";
import { useCart } from "../CartContext";
import { formatCurrency, getRestaurantById } from "../data";

export default function Restaurante() {
  const { id } = useParams();
  const restaurant = getRestaurantById(id);
  const { addItem } = useCart();

  if (!restaurant) {
    return (
      <section className="mf-section">
        <div className="mf-container mf-empty">
          <h1 className="mf-title">Restaurante não encontrado</h1>
          <Link to="/buscar" className="mf-link">
            Voltar aos restaurantes
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mf-cover">
        <img src={restaurant.cover} alt={`Capa de ${restaurant.name}`} />
        <div className="mf-container mf-cover-content">
          <Link to="/buscar" className="mf-btn mf-btn-secondary" style={{ width: "fit-content" }}>
            ← Voltar
          </Link>
          <h1 className="mf-display">{restaurant.name}</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>{restaurant.cuisine}</p>
          <div className="mf-pills">
            <span className="mf-pill">
              ★ {restaurant.rating.toFixed(1)} · {restaurant.reviews}
            </span>
            <span className="mf-pill">{restaurant.deliveryMinutes} min</span>
            <span className="mf-pill">
              Taxa {formatCurrency(restaurant.deliveryFee)}
            </span>
          </div>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container">
          <h2 className="mf-title" style={{ marginTop: 0 }}>
            Cardápio
          </h2>
          <div className="mf-menu-grid">
            {restaurant.menu.map((item) => (
              <article key={item.id} className="mf-menu-item">
                <img src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h3 className="mf-title">{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="mf-menu-foot">
                    <span className="mf-price">{formatCurrency(item.price)}</span>
                    <button
                      type="button"
                      className="mf-btn mf-btn-primary"
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
                      + Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
