"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { orders, formatCurrency, type OrderStatus } from "@/data/mock";
import { cn } from "@/lib/cn";

const statusLabel: Record<OrderStatus, string> = {
  preparando: "Preparando",
  a_caminho: "A caminho",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

const statusClass: Record<OrderStatus, string> = {
  preparando: "bg-amber/15 text-amber",
  a_caminho: "bg-teal/15 text-teal",
  entregue: "bg-[rgba(20,20,20,0.06)] text-ink",
  cancelado: "bg-tomato/10 text-tomato",
};

export default function OrdersPage() {
  return (
    <div className="mf-section">
      <div className="mf-container space-y-8">
        <FadeIn>
          <div className="max-w-2xl">
            <h1 className="mf-display text-4xl font-extrabold md:text-5xl">
              Pedidos
            </h1>
            <p className="mf-caption mt-2 text-base">
              Acompanhe o status com clareza, do preparo até a entrega.
            </p>
          </div>
        </FadeIn>

        <ul className="grid gap-4 md:grid-cols-2">
          {orders.map((order, index) => (
            <FadeIn key={order.id} delay={index * 0.05}>
              <li className="h-full rounded-[1.4rem] bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[rgba(20,20,20,0.45)]">
                      {order.id}
                    </p>
                    <h2 className="mf-title mt-1 text-xl font-semibold">
                      {order.restaurantName}
                    </h2>
                    <p className="mt-1 text-sm text-[rgba(20,20,20,0.65)]">
                      {order.itemsLabel}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      statusClass[order.status],
                    )}
                  >
                    {statusLabel[order.status]}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-[rgba(20,20,20,0.55)]">
                    {order.createdAt}
                  </span>
                  <span className="text-base font-bold">
                    {formatCurrency(order.total)}
                  </span>
                </div>
                {order.status === "a_caminho" && (
                  <div className="mt-4 overflow-hidden rounded-full bg-[rgba(13,148,136,0.12)]">
                    <div className="mf-shimmer h-2 w-2/3 rounded-full bg-[linear-gradient(90deg,#0D9488,#14B8A6)]" />
                  </div>
                )}
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </div>
  );
}
