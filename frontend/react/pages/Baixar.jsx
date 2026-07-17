import { QRCodeSVG } from "qrcode.react";
import { brand } from "../data";

export default function Baixar() {
  return (
    <>
      <section className="mf-download-hero">
        <div className="mf-container">
          <div>
            <p style={{ margin: 0, letterSpacing: "0.14em", fontSize: "0.75rem", fontWeight: 700, opacity: 0.75 }}>
              INSTALE O MYFOOD
            </p>
            <h1 className="mf-display">O site também leva você ao app</h1>
            <p style={{ maxWidth: "32rem", opacity: 0.9, lineHeight: 1.6 }}>
              Escaneie o QR Code da loja do seu celular e continue pedindo com a
              mesma identidade MyFood.
            </p>
          </div>
          <img
            src="/brand/hero-food.png"
            alt="Experiência visual MyFood"
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "280px",
              objectFit: "cover",
              borderRadius: "1.6rem",
              justifySelf: "end",
            }}
          />
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container mf-qr-grid">
          <article className="mf-qr-card">
            <h2 className="mf-title">📱 Google Play</h2>
            <div className="mf-qr-box">
              <QRCodeSVG
                value={brand.stores.playStore}
                size={180}
                bgColor="#F7F6F4"
                fgColor="#141414"
              />
            </div>
            <a
              href={brand.stores.playStore}
              target="_blank"
              rel="noreferrer"
              className="mf-btn mf-btn-teal mf-btn-block"
              style={{ marginTop: "1.4rem" }}
            >
              Abrir na Play Store
            </a>
          </article>

          <article className="mf-qr-card">
            <h2 className="mf-title">🍎 App Store</h2>
            <div className="mf-qr-box">
              <QRCodeSVG
                value={brand.stores.appStore}
                size={180}
                bgColor="#F7F6F4"
                fgColor="#141414"
              />
            </div>
            <a
              href={brand.stores.appStore}
              target="_blank"
              rel="noreferrer"
              className="mf-btn mf-btn-primary mf-btn-block"
              style={{ marginTop: "1.4rem" }}
            >
              Abrir na App Store
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
