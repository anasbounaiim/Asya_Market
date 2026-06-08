"use client";

import Avatar from "boring-avatars";
import { SectionTitle } from "@/components/SectionTitle";

const avatarColors = ["#111111", "#181818", "#facc15", "#fbbf24", "#fde047"];

const testimonials = [
  {
    name: "Karim Benali",
    area: "Travaux maison",
    text: "J'ai trouvé les outils et accessoires plomberie rapidement, puis l'équipe a confirmé la disponibilité sur WhatsApp.",
  },
  {
    name: "Youssef Amrani",
    area: "Retrait magasin",
    text: "J'ajoute les références pour le chantier, j'envoie le message et je passe récupérer après confirmation.",
  },
  {
    name: "Nadia Karim",
    area: "Jardin & maison",
    text: "Le site est clair sur mobile, les rayons sont faciles à filtrer et les promotions sont bien mises en avant.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle
        title="Avis clients"
        eyebrow="Témoignages"
        description="Quelques retours de clients qui préparent leurs achats maison, jardin et chantier chez ASYA MARKET."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-zinc-100"
          >
            <div className="flex items-center gap-3">
              <Avatar
                name={testimonial.name}
                variant="beam"
                colors={avatarColors}
                size={48}
              />
              <div>
                <h3 className="font-extrabold text-ink">{testimonial.name}</h3>
                <p className="text-xs font-bold text-yellow-600">{testimonial.area}</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium leading-6 text-zinc-600">
              “{testimonial.text}”
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
