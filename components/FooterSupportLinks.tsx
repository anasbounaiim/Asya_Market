"use client";

import { FileText, Headphones, RotateCcw, Store, X } from "lucide-react";
import { useState } from "react";

type SupportItem = {
  icon: typeof FileText;
  label: string;
  title: string;
  content: string[];
};

const supportLinks: SupportItem[] = [
  {
    icon: FileText,
    label: "Termes et conditions",
    title: "Termes et conditions",
    content: [
      "Les prix affichés sont indicatifs et peuvent être ajustés selon la disponibilité en magasin.",
      "La commande est confirmée uniquement après échange avec ASYA MARKET via WhatsApp.",
      "Aucun paiement en ligne n'est requis sur le site.",
    ],
  },
  {
    icon: RotateCcw,
    label: "Politique de retour",
    title: "Politique de retour",
    content: [
      "Les retours sont étudiés selon l'état du produit et le délai après achat.",
      "Les produits frais ou ouverts peuvent ne pas être repris.",
      "Contactez-nous sur WhatsApp avec une photo du produit et les détails de la commande.",
    ],
  },
  {
    icon: Headphones,
    label: "Assistance client",
    title: "Assistance client",
    content: [
      "Notre équipe vous accompagne pour vérifier la disponibilité, la livraison et le retrait.",
      "Pour une réponse rapide, envoyez votre demande directement sur WhatsApp.",
      "Les horaires d'assistance suivent les horaires d'ouverture du magasin.",
    ],
  },
  {
    icon: Store,
    label: "Retrait en magasin",
    title: "Retrait en magasin",
    content: [
      "Préparez votre commande sur le site puis envoyez-la sur WhatsApp.",
      "Nous confirmons la disponibilité avant votre passage.",
      "Le retrait se fait à l'adresse du magasin pendant les horaires d'ouverture.",
    ],
  },
];

export function FooterSupportLinks() {
  const [activeItem, setActiveItem] = useState<SupportItem | null>(null);

  return (
    <>
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {supportLinks.map(({ icon: Icon, label, ...item }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveItem({ icon: Icon, label, ...item })}
              className="group flex min-h-32 flex-col items-center justify-center gap-3 border-zinc-200 px-3 py-6 text-center transition hover:bg-yellow-50 lg:border-l last:lg:border-r"
            >
              <Icon className="text-yellow-600 transition group-hover:scale-110" size={34} strokeWidth={1.9} />
              <span className="text-base font-semibold text-ink sm:text-lg">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {activeItem && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4 py-6">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-black/55"
            onClick={() => setActiveItem(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun text-ink">
                  <activeItem.icon size={25} strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase text-yellow-600">ASYA MARKET</p>
                  <h2 className="text-2xl font-extrabold text-ink">{activeItem.title}</h2>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setActiveItem(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-ink transition hover:bg-zinc-200"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {activeItem.content.map((line) => (
                <p key={line} className="rounded-xl bg-zinc-50 p-3 text-sm font-medium leading-6 text-zinc-700">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
