import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listManagedOrders, updateOrderStatus } from "../api";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../data";

const STATUS_OPTIONS = [
  { value: "preparando", label: "Preparando" },
  { value: "a_caminho", label: "A caminho" },
  { value: "entregue", label: "Entregue" },
  { value: "cancelado", label: "Cancelado" },
];

function itemsLabel(order) {
  if (!Array.isArray(order.items)) return "";
  return order.items
    .map((item) =>
      item.quantity > 1 ? `${item.name} ×${item.quantity}` : item.name,
    )
    .join(" + ");
}

export default function Painel() {
  const { user, isGuest, ready } = useAuth();
  const canManage =
    user?.role === "restaurant" || user?.role === "admin";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listManagedOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao carregar pedidos.",
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!ready || !canManage) {
      setLoading(false);
      return;
    }
    load();
  }, [ready, canManage]);

  async function onStatusChange(orderId, status) {
    setBusyId(orderId);
    setError("");
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? updated : order)),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível atualizar.",
      );
    } finally {
      setBusyId("");
    }
  }

  if (!ready) {
    return (
      <section className="mf-section">
        <div className="mf-container">
          <p className="mf-caption">Carregando painel…</p>
        </div>
      </section>
    );
  }

  if (isGuest || !canManage) {
    return (
      <section className="mf-section">
        <div className="mf-container" style={{ maxWidth: 640 }}>
          <h1 className="mf-page-title mf-display">Painel parceiro</h1>
          <p className="mf-caption">
            Entre com uma conta de restaurante ou admin para gerenciar pedidos.
          </p>
          <div className="mf-panel" style={{ marginTop: "1rem" }}>
            <p className="mf-caption" style={{ margin: 0 }}>
              Demo restaurante: <strong>restaurante@myfood.app</strong> / myfood123
            </p>
            <p className="mf-caption" style={{ margin: "0.5rem 0 0" }}>
              Demo admin: <strong>admin@myfood.app</strong> / myfood123
            </p>
          </div>
          <Link
            to="/perfil"
            className="mf-btn mf-btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Ir para login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mf-section">
      <div className="mf-container">
        <div className="mf-section-head">
          <div>
            <h1 className="mf-page-title mf-display">
              {user.role === "admin" ? "Painel admin" : "Painel do restaurante"}
            </h1>
            <p className="mf-caption">
              {user.name}
              {user.restaurantId ? ` · ${user.restaurantId}` : " · todos os pedidos"}
            </p>
          </div>
          <button type="button" className="mf-btn mf-btn-secondary" onClick={load}>
            Atualizar
          </button>
        </div>

        {error ? (
          <p className="mf-caption" style={{ color: "var(--mf-tomato)" }} role="alert">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="mf-caption">Carregando pedidos…</p>
        ) : orders.length === 0 ? (
          <div className="mf-empty">
            <h2 className="mf-title">Nenhum pedido na fila</h2>
            <p className="mf-caption">
              Quando clientes finalizarem na sacola, eles aparecem aqui.
            </p>
          </div>
        ) : (
          <div className="mf-grid-cards">
            {orders.map((order) => (
              <article key={order.id} className="mf-panel">
                <div className="mf-order-head">
                  <div>
                    <p className="mf-caption" style={{ margin: 0 }}>
                      {order.id} · {order.restaurantName}
                    </p>
                    <h2 className="mf-title" style={{ margin: "0.35rem 0" }}>
                      {itemsLabel(order)}
                    </h2>
                    <p className="mf-caption" style={{ margin: 0 }}>
                      {new Date(order.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
                <label
                  className="mf-caption"
                  style={{ display: "block", marginTop: "1rem" }}
                >
                  Status
                  <select
                    value={order.status}
                    disabled={busyId === order.id}
                    onChange={(event) =>
                      onStatusChange(order.id, event.target.value)
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "0.35rem",
                      padding: "0.7rem 0.85rem",
                      borderRadius: "0.75rem",
                      border: "1px solid var(--mf-line)",
                    }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
