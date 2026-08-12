import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[rgba(20,20,20,0.06)] bg-ink text-white">
      <div className="mf-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={48}
              height={48}
              className="rounded-xl"
              aria-hidden
            />
            <div>
              <p className="mf-display text-2xl font-bold">
                My<span className="text-[#FF8A72]">Food</span>
              </p>
              <p className="text-sm text-white/65">{brand.slogan}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/70">
            Site de delivery com restaurantes perto de você, pedidos claros e
            instalação do app por QR Code.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Explorar
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/buscar" className="hover:text-white">
                Restaurantes
              </Link>
            </li>
            <li>
              <Link href="/pedidos" className="hover:text-white">
                Meus pedidos
              </Link>
            </li>
            <li>
              <Link href="/carrinho" className="hover:text-white">
                Sacola
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            App
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/baixar" className="hover:text-white">
                Baixar com QR Code
              </Link>
            </li>
            <li>
              <Link href="/perfil" className="hover:text-white">
                Minha conta
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mf-container flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MyFood. Todos os direitos reservados.</p>
          <p>{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
