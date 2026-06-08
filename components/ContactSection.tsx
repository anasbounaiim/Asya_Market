import { Clock, MapPin, Phone } from "lucide-react";
import { storeConfig } from "@/config/store";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function ContactSection() {
  const whatsappLink = createWhatsAppLink("Bonjour ASYA MARKET, je souhaite vous contacter pour un produit ou un devis.");

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
      <SectionTitle title="Contact & localisation" eyebrow="Nous trouver" />
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-zinc-100">
          <div className="space-y-4 text-sm font-semibold text-zinc-700">
            <p className="flex gap-3"><MapPin className="text-yellow-600" size={20} /> {storeConfig.address}</p>
            <p className="flex gap-3"><Phone className="text-yellow-600" size={20} /> {storeConfig.phone}</p>
            <p className="flex gap-3"><Clock className="text-yellow-600" size={20} /> {storeConfig.openingHours}</p>
          </div>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sun px-5 text-sm font-extrabold text-ink">
            <WhatsAppIcon size={19} /> Contactez-nous
          </a>
        </div>
        <a href={storeConfig.googleMapsUrl} className="grid min-h-64 place-items-center rounded-2xl bg-zinc-200 p-6 text-center shadow-soft ring-1 ring-zinc-100">
          <div>
            <MapPin className="mx-auto text-yellow-600" size={36} />
            <p className="mt-3 text-lg font-extrabold text-ink">Google Maps</p>
            <p className="mt-1 text-sm font-semibold text-zinc-600">Remplacez le lien dans config/store.ts</p>
          </div>
        </a>
      </div>
    </section>
  );
}
