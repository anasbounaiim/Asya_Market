import Link from "next/link";

export function MobileMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-2 border-t border-zinc-800 py-3">
      <Link href="/#categories" onClick={onNavigate} className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-zinc-800">
        Catégories
      </Link>
      <Link href="/products" onClick={onNavigate} className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-zinc-800">
        Produits
      </Link>
      <Link href="/#contact" onClick={onNavigate} className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-zinc-800">
        Contact
      </Link>
    </div>
  );
}
