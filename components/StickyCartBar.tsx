"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export function StickyCartBar() {
  const { count, total, openCart } = useCart();

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 p-3 shadow-2xl backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={openCart}
        className="mx-auto flex min-h-12 w-full max-w-md items-center justify-between rounded-2xl bg-ink px-4 text-white"
      >
        <span className="flex items-center gap-2 text-sm font-extrabold">
          <ShoppingBag size={18} />
          {count} produit{count > 1 ? "s" : ""}
        </span>
        <span className="text-sm font-extrabold text-sun">{total} DH</span>
      </button>
    </div>
  );
}
