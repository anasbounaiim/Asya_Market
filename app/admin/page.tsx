import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  PackageCheck,
  PackageX,
  Star,
  Tags,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Dashboard admin - ASYA MARKET",
};

export default function AdminPage() {
  const totalProducts = products.length;
  const inStock = products.filter((product) => product.inStock).length;
  const outOfStock = products.filter((product) => !product.inStock).length;
  const promoProducts = products.filter((product) => product.isPromo).length;
  const bestSellers = products.filter((product) => product.isBestSeller).length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

  const categoryStats = categories
    .map((category) => ({
      category,
      count: products.filter((product) => product.category === category).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5">
        <header className="flex flex-col gap-3 border-b border-zinc-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-yellow-600">
              Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
              Vue generale
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-zinc-600">
              Simulation du tableau de bord admin avec les produits de demonstration.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-sun px-4 text-sm font-extrabold text-ink transition hover:bg-yellow-300 sm:w-fit"
          >
            Gerer les produits
            <ArrowRight size={18} />
          </Link>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Boxes} label="Produits" value={totalProducts} detail="Catalogue actif" />
          <MetricCard icon={PackageCheck} label="En stock" value={inStock} detail="Disponibles" />
          <MetricCard icon={Tags} label="Promotions" value={promoProducts} detail="Offres visibles" />
          <MetricCard icon={PackageX} label="Ruptures" value={outOfStock} detail="A surveiller" danger />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-ink">Categories</h2>
                <p className="text-xs font-bold text-zinc-500">Distribution des produits</p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-extrabold text-zinc-600">
                {categoryStats.length} actives
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {categoryStats.map((item) => {
                const percentage = Math.round((item.count / totalProducts) * 100);

                return (
                  <div key={item.category} className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-extrabold text-ink">{item.category}</p>
                      <p className="text-sm font-bold text-zinc-500">{item.count}</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-sun"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-sun">
                  <TrendingUp size={21} />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-ink">{totalValue.toLocaleString()} dh</h2>
                  <p className="text-xs font-bold text-zinc-500">Valeur catalogue simulee</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <MiniStat label="Top ventes" value={bestSellers} icon={Star} />
                <MiniStat label="Categories" value={categories.length} icon={Boxes} />
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="border-b border-zinc-200 pb-3">
                <h2 className="text-lg font-extrabold text-ink">Alertes stock</h2>
                <p className="text-xs font-bold text-zinc-500">Produits non disponibles</p>
              </div>
              <div className="mt-3 grid gap-2">
                {products
                  .filter((product) => !product.inStock)
                  .map((product) => (
                    <div key={product.id} className="rounded-lg bg-red-50 px-3 py-2">
                      <p className="text-sm font-extrabold text-red-700">{product.name}</p>
                      <p className="text-xs font-bold text-red-500">{product.category}</p>
                    </div>
                  ))}
                {outOfStock === 0 && (
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">
                    Tous les produits sont disponibles.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
            <div>
              <h2 className="text-lg font-extrabold text-ink">Produits recents</h2>
              <p className="text-xs font-bold text-zinc-500">Simulation d'activite catalogue</p>
            </div>
            <Link href="/admin/products" className="text-sm font-extrabold text-yellow-700 hover:text-ink">
              Voir tout
            </Link>
          </div>
          <div className="divide-y divide-zinc-200">
            {recentProducts.map((product) => (
              <div key={product.id} className="grid gap-3 px-4 py-3 sm:grid-cols-[1fr_160px_110px] sm:items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-ink">{product.name}</p>
                  <p className="truncate text-xs font-bold text-zinc-500">{product.category}</p>
                </div>
                <p className="text-sm font-extrabold text-ink">{product.price} dh</p>
                <span
                  className={`w-fit rounded-full px-2 py-1 text-xs font-extrabold ${
                    product.inStock
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {product.inStock ? "En stock" : "Rupture"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  danger = false,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  detail: string;
  danger?: boolean;
}) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-extrabold text-ink">{value}</p>
          <p className="mt-1 text-sm font-extrabold text-zinc-700">{label}</p>
          <p className="mt-1 text-xs font-bold text-zinc-500">{detail}</p>
        </div>
        <span
          className={`grid h-11 w-11 place-items-center rounded-lg ${
            danger ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-700"
          }`}
        >
          <Icon size={21} />
        </span>
      </div>
    </article>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-zinc-50 p-3">
      <Icon size={18} className="text-yellow-600" />
      <p className="mt-2 text-lg font-extrabold text-ink">{value}</p>
      <p className="text-xs font-bold text-zinc-500">{label}</p>
    </div>
  );
}
