import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./CartContext";
import Home from "./pages/Home";
import Buscar from "./pages/Buscar";
import Restaurante from "./pages/Restaurante";
import Carrinho from "./pages/Carrinho";
import Pedidos from "./pages/Pedidos";
import Baixar from "./pages/Baixar";
import Perfil from "./pages/Perfil";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    window.MyFoodJS?.setYear();
    window.MyFoodJS?.observeReveals();
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <div className="mf-site">
        <Header />
        <main id="conteudo-principal" className="mf-main">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/restaurante/:id" element={<Restaurante />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/baixar" element={<Baixar />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
