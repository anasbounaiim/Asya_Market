import { ContactSection } from "@/components/ContactSection";
import { FeatureCard } from "@/components/FeatureCard";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { CategoryScroller } from "@/components/CategoryScroller";
import { Testimonials } from "@/components/Testimonials";
import { products } from "@/data/products";
import { BadgeCheck, Bike, HandCoins, ShoppingBasket } from "lucide-react";

export default function HomePage() {
  const promos = products.filter((product) => product.isPromo);
  const news = products.filter((product) => product.isNew);
  const bestSellers = products.filter((product) => product.isBestSeller);

  return (
    <div className="bg-paper">
      <Hero />
      <CategoryScroller />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle title="Promotions" eyebrow="Prix du moment" />
        <ProductGrid products={promos} />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle title="Nouveautés" eyebrow="À découvrir" />
        <ProductGrid products={news} />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle title="Meilleures ventes" eyebrow="Les essentiels" />
        <ProductGrid products={bestSellers} />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle title="Pourquoi nous choisir" eyebrow="Simple et local" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={ShoppingBasket} title="Produits variés" description="Tous vos essentiels du quotidien au même endroit." />
          <FeatureCard icon={BadgeCheck} title="Commande rapide" description="Ajoutez vos produits et envoyez la commande directement sur WhatsApp." />
          <FeatureCard icon={HandCoins} title="Prix raisonnables" description="Des prix adaptés aux courses de tous les jours." />
          <FeatureCard icon={Bike} title="Livraison / retrait" description="Choisissez la livraison selon votre zone ou le retrait en magasin." />
        </div>
      </section>
      <Testimonials />
      <ContactSection />
    </div>
  );
}
