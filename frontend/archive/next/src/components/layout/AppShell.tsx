"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CartProvider } from "@/context/CartContext";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-dvh flex-col bg-[radial-gradient(circle_at_top,#ffe4dc_0%,transparent_32%),linear-gradient(180deg,#f0efec,#f7f6f4)]">
        <SiteHeader />
        <main id="conteudo-principal" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
