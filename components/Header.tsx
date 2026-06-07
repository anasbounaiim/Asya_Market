"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { storeConfig } from "@/config/store";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/components/CartProvider";
import { TopBar } from "@/components/TopBar";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const whatsappLink = createWhatsAppLink("Bonjour ASYA MARKET, je souhaite passer une commande.");

  const nav = [
    { href: "/#categories", label: "Catégories" },
    { href: "/products", label: "Produits" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-ink text-white shadow-lg">
      <TopBar />
      <div className="mx-auto w-full max-w-[100vw] px-3 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex min-h-16 items-center gap-2 sm:gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-12 w-32 place-items-center sm:h-16 sm:w-44">
              <img
                src="/Asya_market.svg"
                alt={`${storeConfig.storeName} logo`}
                className="h-full w-full object-contain"
              />
            </span>
          </Link>

          <label className="ml-auto hidden min-h-11 flex-1 max-w-lg items-center gap-2 rounded-full bg-white px-4 text-zinc-900 lg:flex">
            <Search size={18} className="text-zinc-500" />
            <input
              placeholder="Rechercher vos produits"
              className="w-full bg-transparent text-sm font-semibold outline-none"
              onFocus={() => (window.location.href = "/products")}
            />
          </label>

          <nav className="ml-auto hidden items-center gap-6 text-sm font-bold lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-sun">
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center justify-center gap-2 rounded-full bg-sun px-5 text-sm font-extrabold text-ink transition hover:bg-yellow-300 lg:inline-flex"
          >
            <WhatsAppIcon size={18} />
            Commander
          </a>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Ouvrir la commande"
              onClick={openCart}
              className="relative grid h-9 w-9 place-items-center rounded-xl bg-zinc-800 sm:h-10 sm:w-10"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-xs font-extrabold text-ink">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-800 sm:h-10 sm:w-10 lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className="pb-3 lg:hidden">
          <Link href="/products" className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-zinc-700">
            <Search size={18} className="text-zinc-500" />
            Rechercher vos produits
          </Link>
        </div>
        {menuOpen && (
          <div className="space-y-2 border-t border-zinc-800 py-3 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-zinc-800"
              >
                {item.label}
              </Link>
            ))}
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="block rounded-xl bg-sun px-3 py-3 text-center text-sm font-extrabold text-ink">
              Commander sur WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
