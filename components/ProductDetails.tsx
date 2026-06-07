"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { NewBadge, PromoBadge, StockBadge } from "@/components/Badges";
import { QuantitySelector } from "@/components/QuantitySelector";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCart } from "@/components/CartProvider";
import { createWhatsAppLink, generateProductOrderMessage } from "@/lib/whatsapp";

export function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const whatsappLink = createWhatsAppLink(generateProductOrderMessage(product, quantity));

  return (
    <article className="grid gap-6 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-zinc-100 md:grid-cols-2 md:p-6">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isPromo && <PromoBadge />}
          {product.isNew && <NewBadge />}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-extrabold text-yellow-600">{product.category}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">{product.name}</h1>
        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
          <h2 className="text-sm font-extrabold uppercase text-ink">
            Description du produit
          </h2>
          <p className="mt-2 text-base font-medium leading-7 text-zinc-600">
            {product.description}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-end gap-3">
          <p className="text-3xl font-extrabold text-ink">{product.price} DH</p>
          {product.oldPrice && <p className="pb-1 text-lg font-bold text-zinc-400 line-through">{product.oldPrice} DH</p>}
          <StockBadge inStock={product.inStock} />
        </div>
        <div className="mt-6 flex items-center gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <span className="text-sm font-semibold text-zinc-500">Quantité</span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addItem(product, quantity)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sun px-5 text-sm font-extrabold text-ink transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
          >
            <ShoppingCart size={18} />
            Ajouter à la commande
          </button>
          <WhatsAppButton href={whatsappLink} />
        </div>
      </div>
    </article>
  );
}
