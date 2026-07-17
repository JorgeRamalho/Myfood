import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { formatCurrency } from "../data";

export default function Carrinho() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const deliveryFee = items.length ? 5.9 : 0;
  const total = subtotal + deliveryFee;

  return (
    <section className="mf-section">
      <div className="mf-container">
        <div className="mf-section-head">
          <div>
            <h1 className="mf-page-title mf-display">Sacola</h1>
            <p className="mf-caption">Revise os itens antes de finalizar.</p>
          </div>
          {items.length > 0 && (
            <button type="button" className="mf-link" onClick={clear}>
              Limpar sacola
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mf-empty">
            <h2 className="mf-title">Sua sacola está vazia</h2>
            <p className="mf-caption">Explore restaurantes e adicione pratos.</p>
            <div className="mf-actions" style={{ justifyContent: "center" }}>
              <Link to="/buscar" className="mf-btn mf-btn-primary">
                Ver restaurantes
              </Link>
            </div>
          </div>
        ) : (
          <div className="mf-split">
            <div className="mf-panel">
              {items.map((item) => (
                <div key={item.id} className="mf-cart-item">
                  <img src={item.image} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <p className="mf-caption" style={{ margin: 0, color: "var(--mf-teal)" }}>
                      {item.restaurantName}
                    </p>
                    <h2 className="mf-title" style={{ margin: "0.2rem 0", fontSize: "1.1rem" }}>
                      {item.name}
                    </h2>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                    <div className="mf-qty">
                      <button
                        type="button"
                        aria-label={`Diminuir ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label={`Remover ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        style={{ marginLeft: "0.4rem", color: "var(--mf-tomato)" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="mf-panel">
              <h2 className="mf-title" style={{ marginTop: 0 }}>
                Resumo
              </h2>
              <div className="mf-summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="mf-summary-row">
                <span>Entrega</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="mf-summary-total">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <button type="button" className="mf-btn mf-btn-teal mf-btn-block" style={{ marginTop: "1rem" }}>
                Finalizar pedido
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
