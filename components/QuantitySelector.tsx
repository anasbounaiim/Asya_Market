"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="flex h-10 w-28 items-center justify-between rounded-xl border border-zinc-200 bg-white px-1">
      <button
        type="button"
        aria-label="Diminuer"
        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-700 transition hover:bg-zinc-100"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center text-sm font-bold">{value}</span>
      <button
        type="button"
        aria-label="Augmenter"
        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-700 transition hover:bg-zinc-100"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
