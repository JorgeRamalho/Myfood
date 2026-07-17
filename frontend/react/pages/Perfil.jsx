import { brand } from "../data";

const rows = [
  "Endereços salvos",
  "Formas de pagamento",
  "Favoritos",
  "Notificações",
  "Ajuda e acessibilidade",
];

export default function Perfil() {
  return (
    <section className="mf-section">
      <div className="mf-container" style={{ maxWidth: "720px" }}>
        <div className="mf-panel" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <img
            src="/brand/client-avatar.png"
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
            <h1 className="mf-page-title mf-display" style={{ fontSize: "2.2rem" }}>
              Olá, convidado
            </h1>
            <p className="mf-caption" style={{ margin: "0.35rem 0 0" }}>
              {brand.tagline}
            </p>
          </div>
        </div>

        <div className="mf-panel" style={{ marginTop: "1rem", padding: 0 }}>
          {rows.map((label) => (
            <button
              key={label}
              type="button"
              style={{
                width: "100%",
                textAlign: "left",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--mf-line)",
                fontWeight: 600,
              }}
            >
              {label} ›
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mf-btn mf-btn-secondary mf-btn-block"
          style={{ marginTop: "1rem", color: "var(--mf-tomato)" }}
        >
          Sair da conta
        </button>
      </div>
    </section>
  );
}
