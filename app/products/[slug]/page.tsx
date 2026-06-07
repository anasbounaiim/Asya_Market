import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { products } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/product-utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug);

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <SectionTitle title="Produits similaires" eyebrow={product.category} />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
