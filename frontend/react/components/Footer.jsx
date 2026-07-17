import { Link } from "react-router-dom";
import { brand } from "../data";

export default function Footer() {
  return (
    <footer className="mf-footer">
      <div className="mf-container mf-footer-grid">
        <div>
          <div className="mf-logo" style={{ marginBottom: "1rem" }}>
            <img src="/brand/logo-mark.png" alt="" width="48" height="48" />
            <div>
              <h3 className="mf-display">
                My<span style={{ color: "#FF8A72" }}>Food</span>
              </h3>
              <p style={{ margin: 0 }}>{brand.slogan}</p>
            </div>
          </div>
          <p>
            Website de delivery com restaurantes perto de você e instalação do
            app por QR Code.
          </p>
        </div>

        <div>
          <h4>Explorar</h4>
          <ul>
            <li>
              <Link to="/buscar">Restaurantes</Link>
            </li>
            <li>
              <Link to="/pedidos">Meus pedidos</Link>
            </li>
            <li>
              <Link to="/carrinho">Sacola</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>App</h4>
          <ul>
            <li>
              <Link to="/baixar">Baixar com QR Code</Link>
            </li>
            <li>
              <Link to="/perfil">Minha conta</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mf-container mf-footer-bottom">
        <p>
          © <span data-year /> MyFood. Todos os direitos reservados.
        </p>
        <p>{brand.tagline}</p>
      </div>
    </footer>
  );
}
