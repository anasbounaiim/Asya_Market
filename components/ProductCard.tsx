"use client";

import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";
import { NewBadge, PromoBadge } from "@/components/Badges";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items, increase, decrease } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <article className="group flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-soft sm:rounded-2xl">
      <div className="relative bg-zinc-50">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="aspect-square p-2 sm:aspect-[1.12] sm:p-3">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {product.isPromo && <PromoBadge />}
          {product.isNew && <NewBadge />}
          {product.isBestSeller && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-sun sm:px-2.5 sm:py-1 sm:text-xs">
              Top
            </span>
          )}
        </div>

        <Link
          href={`/products/${product.slug}`}
          aria-label={`Voir ${product.name}`}
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-zinc-200 transition hover:bg-sun sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        >
          <ArrowUpRight size={14} strokeWidth={2.5} className="sm:h-4 sm:w-4" />
        </Link>

        {!product.inStock && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-[1px]">
            <span className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-extrabold text-white">
              En rupture
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        <div>
          <div>
            <p className="truncate text-[11px] font-bold text-yellow-600 sm:text-xs">
              {product.category}
            </p>
            <Link href={`/products/${product.slug}`}>
              <h3 className="mt-1 line-clamp-2 text-xs font-extrabold leading-4 text-ink transition group-hover:text-yellow-700 sm:text-sm sm:leading-5">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-2 sm:pt-3">
          <div className="flex items-end justify-between gap-1 sm:gap-2">
            <div className="min-w-0">
              <p className="text-base font-extrabold text-ink sm:text-xl">{product.price} dh</p>
              {product.oldPrice ? (
                <p className="text-[11px] font-bold text-zinc-400 line-through sm:text-xs">
                  {product.oldPrice} dh
                </p>
              ) : (
                <p className="text-[11px] font-semibold text-zinc-500 sm:text-xs">Prix magasin</p>
              )}
            </div>
            <p className="hidden pb-1 text-[11px] font-bold uppercase text-zinc-400 sm:block">
              {product.inStock ? "Disponible" : "Rupture"}
            </p>
          </div>

          <CartAction
            quantity={quantity}
            disabled={!product.inStock}
            onAdd={() => addItem(product)}
            onIncrease={() => increase(product.id)}
            onDecrease={() => decrease(product.id)}
          />
        </div>
      </div>
    </article>
  );
}

function CartAction({
  quantity,
  disabled,
  onAdd,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  disabled: boolean;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onAdd}
        className="mt-2 flex h-9 w-full items-center justify-center rounded-xl bg-sun px-2 text-xs font-extrabold text-ink transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 sm:mt-3 sm:h-10 sm:px-3 sm:text-sm"
      >
        Ajouter
      </button>
    );
  }

  return (
    <div className="mt-2 grid h-9 grid-cols-[34px_1fr_34px] overflow-hidden rounded-xl border border-yellow-400 bg-yellow-50 text-ink sm:mt-3 sm:h-10 sm:grid-cols-[40px_1fr_40px]">
      <button
        type="button"
        aria-label="Diminuer"
        onClick={onDecrease}
        className="grid place-items-center border-r border-yellow-200 bg-white transition hover:bg-yellow-100"
      >
        <Minus size={17} strokeWidth={2.7} />
      </button>
      <span className="grid place-items-center bg-sun text-sm font-extrabold">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Augmenter"
        onClick={onIncrease}
        className="grid place-items-center border-l border-yellow-200 bg-white transition hover:bg-yellow-100"
      >
        <Plus size={18} strokeWidth={2.8} />
      </button>
    </div>
  );
}
