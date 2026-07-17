"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Apple, Smartphone } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export default function DownloadPage() {
  return (
    <div>
      <section className="mf-hero-panel">
        <div className="mf-container relative z-10 grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <FadeIn>
            <div className="space-y-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                Instale o MyFood
              </p>
              <h1 className="mf-display text-4xl font-extrabold md:text-6xl">
                O site também leva você ao app
              </h1>
              <p className="max-w-md text-base text-white/88 md:text-lg">
                Escaneie o QR Code da loja do seu celular e continue pedindo com
                a mesma identidade MyFood.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-[1.8rem] md:h-80">
              <Image
                src="/brand/hero-food.png"
                alt="Experiência visual MyFood"
                fill
                className="object-cover"
                sizes="420px"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mf-section">
        <div className="mf-container grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.08}>
            <article className="h-full rounded-[1.5rem] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-teal" aria-hidden />
                <h2 className="mf-title text-2xl font-semibold">Google Play</h2>
              </div>
              <div className="mx-auto w-fit rounded-2xl bg-mist p-5">
                <QRCodeSVG
                  value={brand.stores.playStore}
                  size={180}
                  level="M"
                  bgColor="#F7F6F4"
                  fgColor="#141414"
                  aria-label="QR Code Google Play MyFood"
                />
              </div>
              <a
                href={brand.stores.playStore}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block"
              >
                <Button className="w-full" size="lg" variant="teal">
                  Abrir na Play Store
                </Button>
              </a>
            </article>
          </FadeIn>

          <FadeIn delay={0.14}>
            <article className="h-full rounded-[1.5rem] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <Apple className="h-5 w-5 text-ink" aria-hidden />
                <h2 className="mf-title text-2xl font-semibold">App Store</h2>
              </div>
              <div className="mx-auto w-fit rounded-2xl bg-mist p-5">
                <QRCodeSVG
                  value={brand.stores.appStore}
                  size={180}
                  level="M"
                  bgColor="#F7F6F4"
                  fgColor="#141414"
                  aria-label="QR Code App Store MyFood"
                />
              </div>
              <a
                href={brand.stores.appStore}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block"
              >
                <Button className="w-full" size="lg">
                  Abrir na App Store
                </Button>
              </a>
            </article>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
