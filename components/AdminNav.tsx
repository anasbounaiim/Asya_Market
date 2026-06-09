"use client";

import Link from "next/link";
import { ArrowLeft, Boxes, LayoutDashboard, Store, Tags } from "lucide-react";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produits", icon: Boxes },
  { href: "/admin/catalog", label: "Categories & tags", icon: Tags },
];

export function AdminNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper">
      <aside className="border-b border-zinc-800 bg-ink text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[268px] lg:border-b-0 lg:border-r lg:border-zinc-800">
        <div className="flex h-full flex-col gap-5 px-3 py-4 sm:px-5 lg:px-4">
          <Link href="/admin" className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-sun text-ink">
              <Store size={21} strokeWidth={2.6} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold text-white">
                ASYA MARKET
              </span>
              <span className="block truncate text-xs font-bold text-zinc-400">
                Administration
              </span>
            </span>
          </Link>

          <div className="rounded-lg bg-yellow-400/10 px-3 py-2 text-xs font-extrabold text-sun ring-1 ring-yellow-400/20">
            Donnees demo
          </div>

          <nav className="grid gap-1">
            {adminLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-extrabold transition ${
                    isActive
                      ? "bg-sun text-ink shadow-sm"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-ink" : "text-sun"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto grid gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
            <p className="text-xs font-bold leading-5 text-zinc-400">
              Les changements CRUD restent locaux jusqu'au choix du backend.
            </p>
            <Link
              href="/"
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-3 text-sm font-extrabold text-ink transition hover:bg-sun"
            >
              <ArrowLeft size={17} />
              Boutique
            </Link>
          </div>
        </div>
      </aside>

      <main className="min-w-0 lg:ml-[268px]">{children}</main>
    </div>
  );
}
