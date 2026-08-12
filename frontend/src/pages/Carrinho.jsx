import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { deliveryLocation, formatCurrency } from "../data";

export default function Carrinho() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const { ensureAuthSession } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState("entrega");
  const deliveryFee = items.length ? 5.9 : 0;
  const total = subtotal + deliveryFee;

  async function handleCheckout() {
    if (!items.length || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      await ensureAuthSession();

      const byRestaurant = new Map();
      for (const item of items) {
        const key = item.restaurantId;
        if (!byRestaurant.has(key)) {
          byRestaurant.set(key, {
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
            items: [],
          });
        }
        byRestaurant.get(key).items.push({
          menuItemId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        });
      }

      for (const payload of byRestaurant.values()) {
        await createOrder(payload);
      }

      clear();
      navigate("/pedidos");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível finalizar. Verifique se a API está no ar.",
      );
    } finally {
      setSubmitting(false);
    }
  }

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
                    <p
                      className="mf-caption"
                      style={{ margin: 0, color: "var(--mf-teal)" }}
                    >
                      {item.restaurantName}
                    </p>
                    <h2
                      className="mf-title"
                      style={{ margin: "0.2rem 0", fontSize: "1.1rem" }}
                    >
                      {item.name}
                    </h2>
                    <strong>
                      {formatCurrency(item.price * item.quantity)}
                    </strong>
                    <div className="mf-qty">
                      <button
                        type="button"
                        aria-label={`Diminuir ${item.name}`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar ${item.name}`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label={`Remover ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        style={{
                          marginLeft: "0.4rem",
                          color: "var(--mf-tomato)",
                        }}
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
              <div style={{ marginBottom: "1rem" }}>
                <p className="mf-caption" style={{ margin: 0 }}>
                  Entregar em
                </p>
                <p style={{ margin: "0.25rem 0 0", fontWeight: 600 }}>
                  {deliveryLocation.full}
                </p>
              </div>
              <label className="mf-caption" style={{ display: "block", marginBottom: "1rem" }}>
                Pagamento
                <select
                  value={payment}
                  onChange={(event) => setPayment(event.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "0.35rem",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--mf-line)",
                  }}
                >
                  <option value="entrega">Na entrega (dinheiro / Pix)</option>
                  <option value="cartao">Cartão na entrega</option>
                </select>
              </label>
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
              {error ? (
                <p
                  className="mf-caption"
                  style={{ color: "var(--mf-tomato)", marginTop: "0.75rem" }}
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
              <button
                type="button"
                className="mf-btn mf-btn-teal mf-btn-block"
                style={{ marginTop: "1rem" }}
                disabled={submitting}
                onClick={handleCheckout}
              >
                {submitting ? "Enviando…" : "Finalizar pedido"}
              </button>
              <p className="mf-caption" style={{ marginTop: "0.75rem" }}>
                Pagamento selecionado:{" "}
                {payment === "cartao" ? "cartão na entrega" : "dinheiro / Pix"}.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
