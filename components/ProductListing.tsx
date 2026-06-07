"use client";

import {
  ArrowDownAZ,
  Baby,
  Beef,
  Cookie,
  CupSoda,
  Home,
  Milk,
  Package,
  Search,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Tag,
  Wheat,
} from "lucide-react";
import { useMemo, useState } from "react";
import { categories, type Category, type Product } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";

type Sort = "default" | "price-asc" | "price-desc";

const categoryIcons = {
  Tous: SlidersHorizontal,
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
} as const;

export function ProductListing({
  products,
  initialCategory = "Tous",
}: {
  products: Product[];
  initialCategory?: Category | "Tous";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "Tous">(initialCategory);
  const [promoOnly, setPromoOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return products
      .filter((product) => product.name.toLowerCase().includes(lowerQuery))
      .filter((product) => (category === "Tous" ? true : product.category === category))
      .filter((product) => (promoOnly ? product.isPromo : true))
      .filter((product) => (newOnly ? product.isNew : true))
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return a.id - b.id;
      });
  }, [category, newOnly, products, promoOnly, query, sort]);

  return (
    <div className="grid w-full min-w-0 max-w-full gap-4 lg:grid-cols-[280px_1fr] lg:items-start">
      <aside className="w-full min-w-0 max-w-full rounded-xl bg-white p-3 shadow-soft sm:rounded-2xl sm:p-4 lg:sticky lg:top-28">
        <p className="mb-3 hidden items-center gap-2 text-sm font-extrabold text-ink lg:flex">
          <SlidersHorizontal size={17} className="text-yellow-600" />
          Filtres produits
        </p>
        <div className="grid min-w-0 gap-3">
          <label className="flex min-h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3">
            <Search size={19} className="text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit"
              className="min-w-0 w-full bg-transparent text-sm font-semibold outline-none"
            />
          </label>
          <label className="flex min-h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3">
            <ArrowDownAZ size={18} className="text-yellow-600" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="min-w-0 w-full bg-transparent text-sm font-bold outline-none"
            >
              <option value="default">Tri par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </label>
        </div>
        <div className="hide-scrollbar mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 lg:grid lg:max-h-[420px] lg:grid-cols-1 lg:overflow-y-auto">
          {(["Tous", ...categories] as const).map((item) => (
            <FilterCategoryButton
              key={item}
              label={item}
              isActive={category === item}
              onClick={() => setCategory(item)}
            />
          ))}
        </div>
        <div className="mt-3 grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <label className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-700 sm:justify-start sm:px-4 sm:text-sm">
            <Tag size={16} className="text-yellow-600" />
            <input type="checkbox" checked={promoOnly} onChange={(e) => setPromoOnly(e.target.checked)} />
            Promotions
          </label>
          <label className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-700 sm:justify-start sm:px-4 sm:text-sm">
            <Sparkles size={16} className="text-yellow-600" />
            <input type="checkbox" checked={newOnly} onChange={(e) => setNewOnly(e.target.checked)} />
            Nouveautés
          </label>
        </div>
      </aside>
      <section className="w-full min-w-0 max-w-full overflow-hidden">
        <div className="mb-3 flex flex-col gap-1 rounded-xl bg-white px-3 py-3 shadow-soft sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:rounded-2xl sm:px-4">
          <p className="text-sm font-extrabold text-ink">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </p>
          <p className="text-xs font-bold text-zinc-500">
            Commande sans compte, directement via WhatsApp
          </p>
        </div>
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center font-bold text-zinc-600 shadow-soft">
            Aucun produit trouvé.
          </div>
        )}
      </section>
    </div>
  );
}

function FilterCategoryButton({
  label,
  isActive,
  onClick,
}: {
  label: Category | "Tous";
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = categoryIcons[label];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition lg:justify-start ${
        isActive
          ? "bg-ink text-white"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      <Icon size={16} className={isActive ? "text-sun" : "text-yellow-600"} />
      {label}
    </button>
  );
}
