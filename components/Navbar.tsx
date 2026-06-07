import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center gap-6 text-sm font-bold">
      <Link href="/#categories">Catégories</Link>
      <Link href="/products">Produits</Link>
      <Link href="/#contact">Contact</Link>
    </nav>
  );
}
