export type Category =
  | "Épicerie"
  | "Boissons"
  | "Produits frais"
  | "Fruits & légumes"
  | "Produits laitiers"
  | "Snacks & biscuits"
  | "Hygiène"
  | "Maison & nettoyage"
  | "Surgelés"
  | "Bébé";

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  inStock: boolean;
  isPromo: boolean;
  isNew: boolean;
  isBestSeller: boolean;
};

export const categories: Category[] = [
  "Épicerie",
  "Boissons",
  "Produits frais",
  "Fruits & légumes",
  "Produits laitiers",
  "Snacks & biscuits",
  "Hygiène",
  "Maison & nettoyage",
  "Surgelés",
  "Bébé",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Huile de table",
    slug: "huile-de-table",
    category: "Épicerie",
    price: 18,
    oldPrice: 22,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
    description: "Huile de table pratique pour la cuisine quotidienne.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Sucre",
    slug: "sucre",
    category: "Épicerie",
    price: 9,
    image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=700&q=80",
    description: "Sucre pour thé, café, pâtisserie et courses de tous les jours.",
    inStock: true,
    isPromo: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Farine",
    slug: "farine",
    category: "Épicerie",
    price: 12,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
    description: "Farine polyvalente pour pain, crêpes et préparations maison.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Lait",
    slug: "lait",
    category: "Produits laitiers",
    price: 7,
    oldPrice: 8,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
    description: "Lait frais pour le petit déjeuner et les recettes familiales.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 5,
    name: "Eau minérale",
    slug: "eau-minerale",
    category: "Boissons",
    price: 6,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=80",
    description: "Eau minérale fraîche, idéale à la maison ou au travail.",
    inStock: true,
    isPromo: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Thé",
    slug: "the",
    category: "Épicerie",
    price: 25,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
    description: "Thé pour accompagner les moments de partage au quotidien.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 7,
    name: "Café",
    slug: "cafe",
    category: "Épicerie",
    price: 32,
    oldPrice: 36,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    description: "Café au goût riche pour bien commencer la journée.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "Biscuits",
    slug: "biscuits",
    category: "Snacks & biscuits",
    price: 10,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
    description: "Biscuits pour les pauses, goûters et petites envies.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 9,
    name: "Détergent",
    slug: "detergent",
    category: "Maison & nettoyage",
    price: 28,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=700&q=80",
    description: "Détergent efficace pour garder la maison propre facilement.",
    inStock: true,
    isPromo: false,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 10,
    name: "Shampooing",
    slug: "shampooing",
    category: "Hygiène",
    price: 24,
    oldPrice: 29,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80",
    description: "Shampooing doux pour l'hygiène et le soin quotidien.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 11,
    name: "Yaourt",
    slug: "yaourt",
    category: "Produits laitiers",
    price: 4,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80",
    description: "Yaourt frais à ajouter aux courses de la semaine.",
    inStock: false,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 12,
    name: "Jus",
    slug: "jus",
    category: "Boissons",
    price: 8,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=700&q=80",
    description: "Jus fruité et pratique pour les repas et les sorties.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: true,
  },
];
