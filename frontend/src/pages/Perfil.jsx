import { useState } from "react";
import { Link } from "react-router-dom";
import { brand, deliveryLocation } from "../data";
import { useAuth } from "../context/AuthContext";

const ACCOUNT_ROWS = [
  {
    id: "address",
    label: "Endereço de entrega",
    detail: deliveryLocation.full,
  },
  {
    id: "payment",
    label: "Forma de pagamento",
    detail: "Pagamento na entrega (dinheiro ou Pix) — demo.",
  },
  {
    id: "help",
    label: "Ajuda e acessibilidade",
    detail:
      "Use Tab para navegar, contraste reforçado e prefers-reduced-motion respeitado.",
  },
];

export default function Perfil() {
  const { user, isGuest, login, register, logout, ensureGuest } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [openRow, setOpenRow] = useState("address");

  const displayName = user?.name || "convidado";
  const canManage = user?.role === "restaurant" || user?.role === "admin";

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "register") {
        await register({ name, email, password });
      } else {
        await login({ email, password });
      }
      setPassword("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível autenticar.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    logout();
    try {
      await ensureGuest();
    } catch {
      /* API offline */
    }
  }

  return (
    <section className="mf-section">
      <div className="mf-container" style={{ maxWidth: "720px" }}>
        <div
          className="mf-panel"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <img
            src="./brand/client-avatar.png"
            alt="Foto do perfil do cliente"
            width="72"
            height="72"
            style={{
              borderRadius: "999px",
              objectFit: "cover",
              boxShadow: "0 0 0 3px #fff, 0 0 0 6px rgba(224,49,31,0.28)",
            }}
          />
          <div>
            <h1
              className="mf-page-title mf-display"
              style={{ fontSize: "2.2rem" }}
            >
              Olá, {displayName}
            </h1>
            <p className="mf-caption" style={{ margin: "0.35rem 0 0" }}>
              {user?.email || brand.tagline}
              {isGuest ? " · convidado" : user?.role ? ` · ${user.role}` : ""}
            </p>
          </div>
        </div>

        {canManage ? (
          <Link
            to="/painel"
            className="mf-btn mf-btn-teal mf-btn-block"
            style={{ marginTop: "1rem" }}
          >
            Abrir painel de pedidos
          </Link>
        ) : null}

        {isGuest ? (
          <form
            className="mf-panel"
            style={{ marginTop: "1rem" }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <button
                type="button"
                className={
                  mode === "login"
                    ? "mf-btn mf-btn-primary"
                    : "mf-btn mf-btn-secondary"
                }
                onClick={() => setMode("login")}
              >
                Entrar
              </button>
              <button
                type="button"
                className={
                  mode === "register"
                    ? "mf-btn mf-btn-primary"
                    : "mf-btn mf-btn-secondary"
                }
                onClick={() => setMode("register")}
              >
                Criar conta
              </button>
            </div>

            {mode === "register" && (
              <label
                className="mf-caption"
                style={{ display: "block", marginBottom: "0.75rem" }}
              >
                Nome
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "0.35rem",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--mf-line)",
                  }}
                />
              </label>
            )}

            <label
              className="mf-caption"
              style={{ display: "block", marginBottom: "0.75rem" }}
            >
              E-mail
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "0.35rem",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--mf-line)",
                }}
              />
            </label>

            <label
              className="mf-caption"
              style={{ display: "block", marginBottom: "0.75rem" }}
            >
              Senha
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "0.35rem",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--mf-line)",
                }}
              />
            </label>

            {error ? (
              <p className="mf-caption" style={{ color: "var(--mf-tomato)" }}>
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="mf-btn mf-btn-primary mf-btn-block"
              disabled={busy}
            >
              {busy
                ? "Aguarde…"
                : mode === "login"
                  ? "Entrar"
                  : "Criar conta"}
            </button>
            <p className="mf-caption" style={{ marginTop: "0.75rem" }}>
              Cliente: cliente@myfood.app / myfood123
              <br />
              Restaurante: restaurante@myfood.app / myfood123
            </p>
          </form>
        ) : (
          <div className="mf-panel" style={{ marginTop: "1rem", padding: 0 }}>
            {ACCOUNT_ROWS.map((row) => {
              const open = openRow === row.id;
              return (
                <div key={row.id} style={{ borderBottom: "1px solid var(--mf-line)" }}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenRow(open ? "" : row.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      fontWeight: 600,
                      background: "transparent",
                      border: 0,
                    }}
                  >
                    {row.label} {open ? "▾" : "›"}
                  </button>
                  {open ? (
                    <p
                      className="mf-caption"
                      style={{
                        margin: "0 1.25rem 1rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.detail}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

        <button
          type="button"
          className="mf-btn mf-btn-secondary mf-btn-block"
          style={{ marginTop: "1rem", color: "var(--mf-tomato)" }}
          onClick={handleLogout}
        >
          Sair da conta
        </button>
      </div>
    </section>
  );
}
