import { Baby, Beef, Cookie, CupSoda, Home, Milk, Package, Snowflake, Sparkles, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category } from "@/data/products";

const iconMap = {
  Épicerie: Wheat,
  Boissons: CupSoda,
  "Produits frais": Beef,
  "Fruits & légumes": Sparkles,
  "Produits laitiers": Milk,
  "Snacks & biscuits": Cookie,
  Hygiène: Package,
  "Maison & nettoyage": Home,
  Surgelés: Snowflake,
  Bébé: Baby,
} satisfies Record<Category, LucideIcon>;

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category];
  return (
    <a href={`/products?category=${encodeURIComponent(category)}`} className="flex w-36 shrink-0 flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-zinc-100 transition hover:-translate-y-1 sm:w-auto">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun text-ink">
        <Icon size={23} />
      </span>
      <span className="text-sm font-extrabold text-ink">{category}</span>
    </a>
  );
}
