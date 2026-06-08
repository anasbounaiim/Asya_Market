import { storeConfig } from "@/config/store";
import type { Product } from "@/data/products";

export type CartLine = {
  product: Product;
  quantity: number;
};

export function generateProductOrderMessage(product: Product, quantity: number) {
  return `Bonjour ASYA MARKET, je souhaite vérifier ce produit:
Produit: ${product.name}
Quantité: ${quantity}
Prix: ${product.price} DH
Merci de confirmer la disponibilité et le prix.`;
}

export function generateCartOrderMessage(cartItems: CartLine[], total: number) {
  const lines = cartItems
    .map(
      ({ product, quantity }) =>
        `- ${product.name} x ${quantity} = ${product.price * quantity} DH`,
    )
    .join("\n");

  return `Bonjour ASYA MARKET,

Je souhaite demander un devis ou passer cette commande:

${lines}

Total estimé: ${total} DH

Nom:
Adresse:
Mode souhaité: Livraison / Retrait magasin

Merci de confirmer la disponibilité et le prix.`;
}

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
