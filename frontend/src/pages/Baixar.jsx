import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { brand } from "../data";

export default function Baixar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installHint, setInstallHint] = useState("");

  useEffect(() => {
    function onBeforeInstall(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) {
      setInstallHint(
        "No navegador, use o menu “Instalar app” / “Adicionar à tela inicial”.",
      );
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setInstallHint(
      choice.outcome === "accepted"
        ? "MyFood instalado neste dispositivo."
        : "Instalação cancelada.",
    );
  }

  return (
    <>
      <section className="mf-download-hero">
        <div className="mf-container">
          <div>
            <p
              style={{
                margin: 0,
                letterSpacing: "0.14em",
                fontSize: "0.75rem",
                fontWeight: 700,
                opacity: 0.75,
              }}
            >
              INSTALE O MYFOOD
            </p>
            <h1 className="mf-display">O site também leva você ao app</h1>
            <p style={{ maxWidth: "32rem", opacity: 0.9, lineHeight: 1.6 }}>
              Instale o MyFood como app no celular ou computador (PWA). Links das
              lojas nativas ficam como placeholder até o lançamento oficial.
            </p>
            <button
              type="button"
              className="mf-btn mf-btn-primary"
              style={{ marginTop: "1.25rem" }}
              onClick={handleInstall}
            >
              Instalar MyFood
            </button>
            {installHint ? (
              <p className="mf-caption" style={{ marginTop: "0.75rem", opacity: 0.9 }}>
                {installHint}
              </p>
            ) : null}
          </div>
          <img
            src="./brand/hero-food.png"
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
            <h2 className="mf-title">Google Play</h2>
            <p className="mf-caption">Placeholder — app nativo ainda não publicado.</p>
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
            <h2 className="mf-title">App Store</h2>
            <p className="mf-caption">Placeholder — app nativo ainda não publicado.</p>
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
