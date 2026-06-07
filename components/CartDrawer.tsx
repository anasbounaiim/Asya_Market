"use client";

import { ReceiptText, ShoppingBasket, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { OrderSummary } from "@/components/OrderSummary";

export function CartDrawer() {
  const { isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Fermer la commande"
        className="absolute inset-0 bg-black/50"
        onClick={closeCart}
      />
      <aside className="absolute bottom-0 right-0 top-auto max-h-[88vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl sm:bottom-auto sm:top-0 sm:h-full sm:max-h-none sm:max-w-md sm:rounded-l-2xl sm:rounded-tr-none sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun text-ink">
              <ShoppingBasket size={24} strokeWidth={2.6} />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-yellow-600">
                <ReceiptText size={14} strokeWidth={2.6} />
                Commande
              </p>
              <h2 className="text-2xl font-extrabold text-ink">Votre panier</h2>
            </div>
          </div>
          <button type="button" aria-label="Fermer" onClick={closeCart} className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100">
            <X size={20} />
          </button>
        </div>
        <OrderSummary />
      </aside>
    </div>
  );
}
