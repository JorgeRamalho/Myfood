"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MapPin, Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/buscar", label: "Restaurantes" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/baixar", label: "Baixar app" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(20,20,20,0.06)] bg-white/90 backdrop-blur-xl">
      <div className="mf-container flex h-[4.5rem] items-center gap-3">
        <div className="min-w-0 shrink">
          <Logo />
        </div>

        <nav
          aria-label="Navegação principal"
          className="mx-auto hidden items-center gap-1 lg:flex"
        >
          {navItems.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-blush text-tomato"
                    : "text-[rgba(20,20,20,0.68)] hover:bg-mist hover:text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full bg-mist px-3 py-2 text-left md:inline-flex lg:inline-flex"
            aria-label="Alterar endereço de entrega"
          >
            <MapPin className="h-4 w-4 shrink-0 text-tomato" aria-hidden />
            <span className="max-w-[10rem] truncate text-xs font-semibold text-ink xl:max-w-[14rem]">
              Rua Previsto Columbia, 210
            </span>
          </button>

          <Link
            href="/carrinho"
            className="relative grid h-11 w-11 place-items-center rounded-2xl bg-mist text-ink transition hover:bg-blush"
            aria-label={`Sacola${itemCount ? ` com ${itemCount} itens` : ""}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-tomato px-1 text-[0.65rem] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/perfil"
            className="relative h-11 w-11 overflow-hidden rounded-full shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(224,49,31,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_#fff,0_0_0_4px_rgba(224,49,31,0.55)]"
            aria-label="Área do cliente"
          >
            <Image
              src="/brand/client-avatar.png"
              alt="Foto do perfil do cliente"
              fill
              className="object-cover"
              sizes="44px"
            />
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-mist text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="border-t border-[rgba(20,20,20,0.06)] bg-white lg:hidden"
        >
          <nav aria-label="Menu mobile" className="mf-container flex flex-col py-3">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-mist"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
