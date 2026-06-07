"use client";

import { categories, type Category } from "@/data/products";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: Category | "Tous";
  onChange: (value: Category | "Tous") => void;
}) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
      {(["Tous", ...categories] as const).map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => onChange(item)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
            value === item ? "bg-ink text-white" : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
