import { categories } from "@/data/products";
import { CategoryCard } from "@/components/CategoryCard";
import { SectionTitle } from "@/components/SectionTitle";

export function CategoryScroller() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle title="Nos catégories" eyebrow="Rayons" />
      <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
    </section>
  );
}
