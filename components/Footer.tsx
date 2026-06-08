import Link from "next/link";
import { categories } from "@/data/products";
import { storeConfig } from "@/config/store";
import { FooterSupportLinks } from "@/components/FooterSupportLinks";

export function Footer() {
  return (
    <footer>
      <FooterSupportLinks />
      <div className="bg-ink pb-24 pt-10 text-white lg:pb-8">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <img
            src="/Asya_market.svg"
            alt={`${storeConfig.storeName} logo`}
            className="h-auto w-44 object-contain"
          />
          <p className="mt-3 text-sm font-medium leading-6 text-zinc-300">
            Votre magasin d'outillage, jardin, bâtiment, plomberie, électricité, peinture et maison pour préparer vos demandes rapidement via WhatsApp.
          </p>
        </div>
        <div>
          <h3 className="font-extrabold">Catégories</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-medium text-zinc-300">
            {categories.slice(0, 8).map((category) => (
              <Link key={category} href="/products" className="hover:text-sun">
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Contact</h3>
          <div className="mt-3 space-y-2 text-sm font-medium text-zinc-300">
            <p>{storeConfig.phone}</p>
            <p>{storeConfig.address}</p>
            <p>{storeConfig.openingHours}</p>
          </div>
        </div>
      </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 text-sm font-semibold text-zinc-500 sm:px-6 lg:px-8">
          © 2026 ASYA MARKET. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
