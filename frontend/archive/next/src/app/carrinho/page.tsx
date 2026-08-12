"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/data/mock";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const deliveryFee = items.length ? 5.9 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="mf-section">
      <div className="mf-container space-y-8">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="mf-display text-4xl font-extrabold md:text-5xl">
                Sacola
              </h1>
              <p className="mf-caption mt-2 text-base">
                Revise os itens antes de finalizar o pedido.
              </p>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-sm font-semibold text-tomato"
              >
                Limpar sacola
              </button>
            )}
          </div>
        </FadeIn>

        {items.length === 0 ? (
          <div className="rounded-[1.5rem] bg-white p-12 text-center shadow-sm">
            <p className="mf-title text-2xl font-semibold">Sua sacola está vazia</p>
            <p className="mf-caption mt-2 text-base">
              Explore restaurantes e adicione pratos com um clique.
            </p>
            <Link href="/buscar" className="mt-6 inline-block">
              <Button size="lg">Ver restaurantes</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-[1.4rem] bg-white p-4 shadow-sm"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-teal">
                      {item.restaurantName}
                    </p>
                    <h2 className="mf-title truncate text-lg font-semibold">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm font-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(20,20,20,0.04)] p-1">
                        <button
                          type="button"
                          className="grid h-9 w-9 place-items-center rounded-full bg-white"
                          aria-label={`Diminuir ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-5 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="grid h-9 w-9 place-items-center rounded-full bg-white"
                          aria-label={`Aumentar ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="grid h-10 w-10 place-items-center rounded-xl text-tomato"
                        aria-label={`Remover ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit space-y-3 rounded-[1.4rem] bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="mf-title text-xl font-semibold">Resumo</h2>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Entrega</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t border-[rgba(20,20,20,0.06)] pt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-tomato">{formatCurrency(total)}</span>
              </div>
              <Button className="mt-2 w-full" size="lg" variant="teal">
                Finalizar pedido
              </Button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
