import { Link, NavLink } from "react-router-dom";
import { useCart } from "../CartContext";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/buscar", label: "Restaurantes" },
  { to: "/pedidos", label: "Pedidos" },
  { to: "/baixar", label: "Baixar app" },
];

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="mf-header">
      <div className="mf-container mf-header-inner">
        <Link to="/" className="mf-logo" aria-label="MyFood início">
          <img src="/brand/logo-mark.png" alt="" />
          <span className="mf-logo-text">
            My<span>Food</span>
          </span>
        </Link>

        <nav className="mf-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mf-header-actions">
          <Link
            to="/carrinho"
            className="mf-icon-btn"
            aria-label="Abrir sacola"
          >
            🛒
            <span
              className="mf-badge"
              data-cart-count
              hidden={itemCount <= 0}
            >
              {itemCount}
            </span>
          </Link>
          <Link to="/perfil" className="mf-avatar-btn" aria-label="Área do cliente">
            <img
              src="/brand/client-avatar.png"
              alt="Foto do perfil do cliente"
              width="44"
              height="44"
            />
          </Link>
          <button
            type="button"
            className="mf-icon-btn mf-menu-btn"
            data-menu-toggle
            aria-expanded="false"
            aria-controls="menu-mobile"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className="mf-mobile-nav"
        data-mobile-nav
        aria-label="Menu mobile"
      >
        <div className="mf-container">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
