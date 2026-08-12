import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";
import "./utils/js.script.js";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    {/* HashRouter: rotas funcionam no Live Server e em hospedagem estática */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
