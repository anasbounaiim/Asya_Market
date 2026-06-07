import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function WhatsAppButton({
  href,
  label = "Commander sur WhatsApp",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 ${className}`}
    >
      <WhatsAppIcon size={19} />
      <span>{label}</span>
    </a>
  );
}
