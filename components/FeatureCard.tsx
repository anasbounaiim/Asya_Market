import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-zinc-100">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-sun">
        <Icon size={23} />
      </span>
      <h3 className="mt-4 text-base font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-6 text-zinc-600">{description}</p>
    </div>
  );
}
