"use client";

import { Search } from "lucide-react";

export function ProductSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3">
      <Search size={19} className="text-zinc-500" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher un produit"
        className="w-full bg-transparent text-sm font-semibold outline-none"
      />
    </label>
  );
}
