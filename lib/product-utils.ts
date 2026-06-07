import { products } from "@/data/products";

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((item) => item.category === product.category && item.slug !== slug)
    .slice(0, 4);
}
