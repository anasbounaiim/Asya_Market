export function PromoBadge() {
  return (
    <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white sm:px-2.5 sm:py-1 sm:text-xs">
      Promo
    </span>
  );
}

export function NewBadge() {
  return (
    <span className="rounded-full bg-sun px-2 py-0.5 text-[10px] font-bold text-ink sm:px-2.5 sm:py-1 sm:text-xs">
      Nouveau
    </span>
  );
}

export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
        inStock ? "bg-emerald-100 text-emerald-700" : "bg-zinc-200 text-zinc-600"
      }`}
    >
      {inStock ? "Disponible" : "En rupture"}
    </span>
  );
}
