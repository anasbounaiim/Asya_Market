import Link from "next/link";
import { ArrowRight, BadgePercent, Clock, MapPin, Sparkles, Tags, Truck } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { storeConfig } from "@/config/store";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Hero() {
  const whatsappLink = createWhatsAppLink("Bonjour ASYA MARKET, je souhaite demander un devis ou commander des articles.");

  return (
    <section className="mx-auto max-w-7xl px-3 pb-8 pt-4 sm:px-6 lg:px-8 lg:pt-8">
      <div className="overflow-hidden rounded-2xl bg-ink text-white shadow-soft">
        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:p-10 xl:p-12">
          <div className="flex flex-col justify-center lg:pr-4">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-sun">
              <Sparkles size={15} />
              {storeConfig.deliveryText}
            </div>
            <h1 className="sr-only">ASYA MARKET</h1>
            <img
              src="/Asya_market.svg"
              alt="ASYA MARKET"
              className="h-auto w-full max-w-[320px] object-contain sm:max-w-[520px]"
            />
            <p className="mt-3 text-lg font-bold leading-7 text-sun sm:text-xl">
              Matériel, outillage et équipement pour maison, jardin et chantier
            </p>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-zinc-200 sm:text-base">
              Retrouvez les essentiels en agriculture, outillage, BTP, solaire, plomberie, électricité, peinture, quincaillerie et maison. Envoyez votre panier sur WhatsApp pour confirmer la disponibilité, le prix et le retrait ou la livraison.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun px-6 text-sm font-extrabold text-ink transition hover:bg-yellow-300">
                Voir les produits <ArrowRight size={18} />
              </Link>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-ink transition hover:bg-zinc-100">
                <WhatsAppIcon size={19} /> Commander sur WhatsApp
              </a>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 sm:gap-3">
              <div className="min-w-0">
                <div className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sun ring-1 ring-white/10">
                  <Tags size={18} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-extrabold text-sun sm:text-2xl">9</p>
                <p className="text-xs font-bold text-zinc-300">Rayons</p>
              </div>
              <div className="min-w-0">
                <div className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sun ring-1 ring-white/10">
                  <Clock size={18} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-extrabold text-sun sm:text-2xl">8h-19h</p>
                <p className="text-xs font-bold text-zinc-300">Horaires</p>
              </div>
              <div className="min-w-0">
                <div className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sun ring-1 ring-white/10">
                  <WhatsAppIcon size={18} />
                </div>
                <p className="truncate text-lg font-extrabold text-sun sm:text-2xl">WhatsApp</p>
                <p className="text-xs font-bold text-zinc-300">Commande</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div className="relative overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl ring-1 ring-white/10">
              <div className="aspect-[16/9]">
                <img
                  src="/brico-hero.png"
                  alt="Rayons outillage, plomberie, solaire et jardin"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              <div className="absolute bottom-3 left-3 rounded-full bg-black/75 px-4 py-2 text-xs font-extrabold text-sun backdrop-blur">
                Devis et commande via WhatsApp
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <HeroService icon={BadgePercent} title="Promo" text="Prix du jour" />
              <HeroService icon={MapPin} title="Retrait" text="Au magasin" />
              <HeroService icon={Truck} title="Livraison" text="Selon zone" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroService({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof BadgePercent;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-white/10 px-2.5 py-3 text-center ring-1 ring-white/10">
      <Icon className="mx-auto text-yellow-600" size={18} strokeWidth={2.5} />
      <p className="mt-1 text-xs font-extrabold text-white sm:text-sm">{title}</p>
      <p className="mt-0.5 hidden text-[11px] font-bold text-zinc-400 sm:block">{text}</p>
    </div>
  );
}
