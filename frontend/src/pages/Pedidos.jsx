import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ensureAuthSession, listOrders } from "../api";
import { withFallback } from "../api/withFallback";
import { formatCurrency, orders as localOrders } from "../data";

const STATUS_LABEL = {
  preparando: "Preparando",
  a_caminho: "A caminho",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

function statusClass(status) {
  if (status === "a_caminho" || status === "preparando") return "on-way";
  if (status === "entregue") return "done";
  return "";
}

function formatOrderDate(value) {
  if (!value) return "";
  if (value.includes("·")) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function itemsLabel(order) {
  if (order.itemsLabel) return order.itemsLabel;
  if (!Array.isArray(order.items)) return "";
  return order.items
    .map((item) =>
      item.quantity > 1 ? `${item.name} ×${item.quantity}` : item.name,
    )
    .join(" + ");
}

function toLocalFallback() {
  return localOrders.map((order) => ({
    id: order.id,
    restaurantName: order.restaurantName,
    itemsLabel: order.itemsLabel,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  }));
}

export default function Pedidos() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("api");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        await ensureAuthSession();
      } catch {
        /* API offline — withFallback cobre */
      }
      const result = await withFallback(listOrders, toLocalFallback);
      if (cancelled) return;
      setOrders(result.data || []);
      setSource(result.source);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mf-section">
      <div className="mf-container">
        <h1 className="mf-page-title mf-display">Pedidos</h1>
        <p className="mf-caption" style={{ marginBottom: "1.5rem" }}>
          Acompanhe o status com clareza, do preparo até a entrega.
          {source === "fallback" ? " · modo offline" : ""}
        </p>

        {loading ? (
          <p className="mf-caption">Carregando pedidos…</p>
        ) : orders.length === 0 ? (
          <div className="mf-empty">
            <h2 className="mf-title">Nenhum pedido ainda</h2>
            <p className="mf-caption">
              Finalize um pedido na sacola para acompanhar aqui.
            </p>
            <div className="mf-actions" style={{ justifyContent: "center" }}>
              <Link to="/buscar" className="mf-btn mf-btn-primary">
                Ver restaurantes
              </Link>
            </div>
          </div>
        ) : (
          <div className="mf-grid-cards">
            {orders.map((order) => (
              <article key={order.id} className="mf-panel">
                <div className="mf-order-head">
                  <div>
                    <p className="mf-caption" style={{ margin: 0 }}>
                      {order.id}
                    </p>
                    <h2
                      className="mf-title"
                      style={{ margin: "0.35rem 0" }}
                    >
                      {order.restaurantName}
                    </h2>
                    <p className="mf-caption" style={{ margin: 0 }}>
                      {itemsLabel(order)}
                    </p>
                  </div>
                  <span className={`mf-status ${statusClass(order.status)}`}>
                    {STATUS_LABEL[order.status] || order.status}
                  </span>
                </div>
                <div className="mf-summary-row" style={{ marginTop: "1rem" }}>
                  <span>{formatOrderDate(order.createdAt)}</span>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
                {(order.status === "a_caminho" ||
                  order.status === "preparando") && (
                  <div className="mf-progress" aria-hidden="true">
                    <span />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
