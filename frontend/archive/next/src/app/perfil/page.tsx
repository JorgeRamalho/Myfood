"use client";

import Image from "next/image";
import {
  Bell,
  CreditCard,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
} from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { brand } from "@/lib/brand";

const rows = [
  { icon: MapPin, label: "Endereços salvos" },
  { icon: CreditCard, label: "Formas de pagamento" },
  { icon: Heart, label: "Favoritos" },
  { icon: Bell, label: "Notificações" },
  { icon: HelpCircle, label: "Ajuda e acessibilidade" },
];

export default function ProfilePage() {
  return (
    <div className="mf-section">
      <div className="mf-container mx-auto max-w-3xl space-y-6">
        <FadeIn>
          <section className="flex items-center gap-5 rounded-[1.5rem] bg-white p-6 shadow-sm md:p-8">
            <Image
              src="/brand/client-avatar.png"
              alt="Foto do perfil do cliente"
              width={72}
              height={72}
              className="rounded-full object-cover shadow-[0_0_0_3px_#fff,0_0_0_6px_rgba(224,49,31,0.28)]"
            />
            <div>
              <h1 className="mf-display text-3xl font-extrabold md:text-4xl">
                Olá, convidado
              </h1>
              <p className="mf-caption mt-2 text-base">{brand.tagline}</p>
            </div>
          </section>
        </FadeIn>

        <ul className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
          {rows.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-mist"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-tomato">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1 text-sm font-semibold md:text-base">
                  {label}
                </span>
                <span className="text-[rgba(20,20,20,0.35)]" aria-hidden>
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-tomato shadow-sm"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
