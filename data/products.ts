export type Category =
  | "Agriculture & Jardin"
  | "Outillage"
  | "Bâtiment et travaux publics"
  | "Énergie solaire et pompage"
  | "Électricité & Luminaire"
  | "Sanitaire Plomberie"
  | "Quincaillerie Droguerie"
  | "Peinture & revêtement"
  | "Cuisine & Maison";

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
  "Agriculture & Jardin",
  "Outillage",
  "Bâtiment et travaux publics",
  "Énergie solaire et pompage",
  "Électricité & Luminaire",
  "Sanitaire Plomberie",
  "Quincaillerie Droguerie",
  "Peinture & revêtement",
  "Cuisine & Maison",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Pulvérisateur de jardin 16L",
    slug: "pulverisateur-jardin-16l",
    category: "Agriculture & Jardin",
    price: 185,
    oldPrice: 220,
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=700&q=80",
    description: "Pulvérisateur pratique pour traitement des plantes, potagers et espaces verts.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Perceuse visseuse sans fil",
    slug: "perceuse-visseuse-sans-fil",
    category: "Outillage",
    price: 690,
    oldPrice: 790,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=700&q=80",
    description: "Perceuse compacte pour montage, bricolage, perçage léger et travaux de finition.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Caisse à outils métallique",
    slug: "caisse-outils-metallique",
    category: "Outillage",
    price: 260,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80",
    description: "Caisse robuste pour ranger et transporter clés, pinces, tournevis et accessoires.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 4,
    name: "Bétonnière chantier 160L",
    slug: "betonniere-chantier-160l",
    category: "Bâtiment et travaux publics",
    price: 2450,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80",
    description: "Bétonnière adaptée aux petits chantiers, rénovations et travaux de maçonnerie.",
    inStock: true,
    isPromo: false,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 5,
    name: "Pompe solaire submersible",
    slug: "pompe-solaire-submersible",
    category: "Énergie solaire et pompage",
    price: 3200,
    oldPrice: 3600,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=80",
    description: "Solution de pompage pour irrigation, puits et alimentation en eau avec énergie solaire.",
    inStock: true,
    isPromo: true,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Projecteur LED extérieur 100W",
    slug: "projecteur-led-exterieur-100w",
    category: "Électricité & Luminaire",
    price: 145,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=700&q=80",
    description: "Projecteur LED puissant pour façades, ateliers, garages et zones de travail.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 7,
    name: "Disjoncteur différentiel",
    slug: "disjoncteur-differentiel",
    category: "Électricité & Luminaire",
    price: 210,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=80",
    description: "Protection électrique pour tableaux domestiques, ateliers et installations techniques.",
    inStock: true,
    isPromo: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "Mitigeur évier chromé",
    slug: "mitigeur-evier-chrome",
    category: "Sanitaire Plomberie",
    price: 290,
    oldPrice: 340,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    description: "Mitigeur moderne pour cuisine ou local technique, facile à installer.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 9,
    name: "Raccords plomberie assortis",
    slug: "raccords-plomberie-assortis",
    category: "Sanitaire Plomberie",
    price: 65,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80",
    description: "Lot de raccords pour réparations, installations d'eau et maintenance sanitaire.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 10,
    name: "Serrure multipoints",
    slug: "serrure-multipoints",
    category: "Quincaillerie Droguerie",
    price: 420,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",
    description: "Serrure de sécurité pour portes d'entrée, locaux professionnels et chantiers.",
    inStock: false,
    isPromo: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 11,
    name: "Peinture façade blanche 15L",
    slug: "peinture-facade-blanche-15l",
    category: "Peinture & revêtement",
    price: 380,
    oldPrice: 430,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=80",
    description: "Peinture extérieure couvrante pour façades, murs et travaux de rénovation.",
    inStock: true,
    isPromo: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 12,
    name: "Kit accessoires cuisine",
    slug: "kit-accessoires-cuisine",
    category: "Cuisine & Maison",
    price: 175,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
    description: "Accessoires utiles pour aménagement, entretien et petites installations maison.",
    inStock: true,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
  },
];
