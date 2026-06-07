"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { createWhatsAppLink, generateCartOrderMessage } from "@/lib/whatsapp";

export function OrderSummary() {
  const { items, total, increase, decrease, removeItem } = useCart();
  const whatsappLink = createWhatsAppLink(generateCartOrderMessage(items, total));

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-zinc-50 p-6 text-center">
        <p className="font-extrabold text-ink">Votre commande est vide.</p>
        <p className="mt-1 text-sm font-medium text-zinc-500">Ajoutez des produits pour préparer votre message WhatsApp.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-zinc-50 p-3">
            <div>
              <p className="font-extrabold text-ink">{product.name}</p>
              <p className="text-sm font-bold text-zinc-500">{product.price} DH x {quantity} = {product.price * quantity} DH</p>
              <div className="mt-2 flex items-center gap-2">
                <button type="button" aria-label="Diminuer" onClick={() => decrease(product.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white text-zinc-700">
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-sm font-extrabold">{quantity}</span>
                <button type="button" aria-label="Augmenter" onClick={() => increase(product.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white text-zinc-700">
                  <Plus size={15} />
                </button>
              </div>
            </div>
            <button type="button" aria-label="Supprimer" onClick={() => removeItem(product.id)} className="grid h-9 w-9 place-items-center rounded-xl bg-white text-red-600">
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-ink p-4 text-white">
        <span className="font-bold">Total estimé</span>
        <span className="text-xl font-extrabold text-sun">{total} DH</span>
      </div>
      <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-sun px-5 text-sm font-extrabold text-ink">
        Envoyer la commande sur WhatsApp
      </a>
    </div>
  );
}
