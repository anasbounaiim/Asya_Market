import { ProductListing } from "@/components/ProductListing";
import { SectionTitle } from "@/components/SectionTitle";
import { categories, products, type Category } from "@/data/products";

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const requestedCategory = searchParams?.category;
  const initialCategory = categories.includes(requestedCategory as Category)
    ? (requestedCategory as Category)
    : "Tous";

  return (
    <div className="overflow-x-hidden bg-paper">
      <section className="mx-auto w-full max-w-[100vw] px-3 py-5 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <SectionTitle
          title="Tous les produits"
          eyebrow="Catalogue"
          description="Recherchez, filtrez et ajoutez vos articles à la demande WhatsApp."
        />
        <ProductListing products={products} initialCategory={initialCategory} />
      </section>
    </div>
  );
}
