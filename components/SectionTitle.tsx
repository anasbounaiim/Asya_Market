export function SectionTitle({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-1">
      {eyebrow && <p className="text-xs font-extrabold uppercase tracking-wide text-yellow-600">{eyebrow}</p>}
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm font-medium text-zinc-600">{description}</p>}
    </div>
  );
}
