import { createWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function FloatingWhatsAppButton() {
  const href = createWhatsAppLink("Bonjour ASYA MARKET, je souhaite demander un devis ou passer une commande.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Demander un devis sur WhatsApp"
      className="fixed bottom-5 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-2xl transition hover:bg-emerald-700 lg:bottom-6"
    >
      <WhatsAppIcon size={27} />
    </a>
  );
}
