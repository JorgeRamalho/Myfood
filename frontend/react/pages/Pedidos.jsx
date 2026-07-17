import { formatCurrency, orders } from "../data";

export default function Pedidos() {
  return (
    <section className="mf-section">
      <div className="mf-container">
        <h1 className="mf-page-title mf-display">Pedidos</h1>
        <p className="mf-caption" style={{ marginBottom: "1.5rem" }}>
          Acompanhe o status com clareza, do preparo até a entrega.
        </p>

        <div className="mf-grid-cards">
          {orders.map((order) => (
            <article key={order.id} className="mf-panel">
              <div className="mf-order-head">
                <div>
                  <p className="mf-caption" style={{ margin: 0 }}>
                    {order.id}
                  </p>
                  <h2 className="mf-title" style={{ margin: "0.35rem 0" }}>
                    {order.restaurantName}
                  </h2>
                  <p className="mf-caption" style={{ margin: 0 }}>
                    {order.itemsLabel}
                  </p>
                </div>
                <span
                  className={`mf-status ${
                    order.status === "a_caminho" ? "on-way" : "done"
                  }`}
                >
                  {order.status === "a_caminho" ? "A caminho" : "Entregue"}
                </span>
              </div>
              <div className="mf-summary-row" style={{ marginTop: "1rem" }}>
                <span>{order.createdAt}</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
              {order.status === "a_caminho" && (
                <div className="mf-progress" aria-hidden="true">
                  <span />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
