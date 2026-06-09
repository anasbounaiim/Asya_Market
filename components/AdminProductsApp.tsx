"use client";

import {
  Check,
  Image as ImageIcon,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { categories, products as seedProducts, type Category, type Product } from "@/data/products";

type ProductDraft = {
  id?: number;
  name: string;
  slug: string;
  category: Category;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  inStock: boolean;
  isPromo: boolean;
  isNew: boolean;
  isBestSeller: boolean;
};

const emptyDraft: ProductDraft = {
  name: "",
  slug: "",
  category: categories[0],
  price: "",
  oldPrice: "",
  image: "",
  description: "",
  inStock: true,
  isPromo: false,
  isNew: false,
  isBestSeller: false,
};

function productToDraft(product: Product): ProductDraft {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: String(product.price),
    oldPrice: product.oldPrice ? String(product.oldPrice) : "",
    image: product.image,
    description: product.description,
    inStock: product.inStock,
    isPromo: product.isPromo,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
  };
}

function draftToProduct(draft: ProductDraft, nextId: number): Product {
  return {
    id: draft.id ?? nextId,
    name: draft.name.trim(),
    slug: (draft.slug || slugify(draft.name)).trim(),
    category: draft.category,
    price: Number(draft.price) || 0,
    oldPrice: draft.oldPrice ? Number(draft.oldPrice) : undefined,
    image: draft.image.trim(),
    description: draft.description.trim(),
    inStock: draft.inStock,
    isPromo: draft.isPromo,
    isNew: draft.isNew,
    isBestSeller: draft.isBestSeller,
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminProductsApp() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "Tous">("Tous");
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return items
      .filter((product) =>
        lowerQuery
          ? [product.name, product.slug, product.category].some((value) =>
              value.toLowerCase().includes(lowerQuery),
            )
          : true,
      )
      .filter((product) => (category === "Tous" ? true : product.category === category))
      .sort((a, b) => b.id - a.id);
  }, [category, items, query]);

  const stats = useMemo(
    () => ({
      total: items.length,
      available: items.filter((product) => product.inStock).length,
      promo: items.filter((product) => product.isPromo).length,
      missing: items.filter((product) => !product.inStock).length,
    }),
    [items],
  );

  function updateDraft<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setDraft((current) => ({
      ...current,
      [key]: value,
      slug: key === "name" && (!current.slug || current.slug === slugify(current.name))
        ? slugify(String(value))
        : current.slug,
    }));
  }

  function resetForm() {
    setDraft(emptyDraft);
    setEditingId(null);
  }

  function editProduct(product: Product) {
    setDraft(productToDraft(product));
    setEditingId(product.id);
  }

  function deleteProduct(productId: number) {
    setItems((current) => current.filter((product) => product.id !== productId));
    if (editingId === productId) resetForm();
  }

  function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextId = Math.max(0, ...items.map((product) => product.id)) + 1;
    const product = draftToProduct(draft, nextId);

    setItems((current) => {
      if (editingId) {
        return current.map((item) => (item.id === editingId ? product : item));
      }
      return [product, ...current];
    });
    resetForm();
  }

  return (
    <div className="px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5">
        <header className="flex flex-col gap-3 border-b border-zinc-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-yellow-600">
              Admin
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
              Gestion produits
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-zinc-600">
              Interface frontend connectee aux donnees de demo. La persistance sera ajoutee avec la technologie choisie.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <Stat label="Produits" value={stats.total} />
            <Stat label="Stock" value={stats.available} />
            <Stat label="Promo" value={stats.promo} />
            <Stat label="Rupture" value={stats.missing} />
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="grid gap-4">
            <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
              <label className="flex min-h-11 flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3">
                <Search size={18} className="text-zinc-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher"
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                />
              </label>
              <label className="flex min-h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 sm:w-72">
                <SlidersHorizontal size={18} className="text-yellow-600" />
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as Category | "Tous")}
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
                >
                  <option value="Tous">Toutes les categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[84px_1.4fr_1fr_110px_120px_108px] gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-zinc-500 lg:grid">
                <span>Image</span>
                <span>Produit</span>
                <span>Categorie</span>
                <span>Prix</span>
                <span>Etat</span>
                <span className="text-right">Actions</span>
              </div>

              <div className="divide-y divide-zinc-200">
                {filteredProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    isEditing={editingId === product.id}
                    onEdit={() => editProduct(product)}
                    onDelete={() => deleteProduct(product.id)}
                  />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="p-8 text-center text-sm font-bold text-zinc-500">
                    Aucun produit trouve.
                  </div>
                )}
              </div>
            </div>
          </div>

          <ProductForm
            draft={draft}
            editingId={editingId}
            onChange={updateDraft}
            onSubmit={saveProduct}
            onCancel={resetForm}
          />
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm sm:min-w-24">
      <p className="text-lg font-extrabold text-ink">{value}</p>
      <p className="text-xs font-bold text-zinc-500">{label}</p>
    </div>
  );
}

function ProductRow({
  product,
  isEditing,
  onEdit,
  onDelete,
}: {
  product: Product;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article
      className={`grid gap-3 p-3 lg:grid-cols-[84px_1.4fr_1fr_110px_120px_108px] lg:items-center lg:px-4 ${
        isEditing ? "bg-yellow-50" : "bg-white"
      }`}
    >
      <div className="flex items-start gap-3 lg:contents">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-zinc-100">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
          ) : (
            <ImageIcon size={22} className="text-zinc-400" />
          )}
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-extrabold text-ink">{product.name}</p>
          <p className="mt-1 truncate text-xs font-semibold text-zinc-500">{product.slug}</p>
          <div className="mt-2 flex flex-wrap gap-1 lg:hidden">
            <Badge tone={product.inStock ? "green" : "zinc"}>
              {product.inStock ? "Disponible" : "Rupture"}
            </Badge>
            {product.isPromo && <Badge tone="yellow">Promo</Badge>}
            {product.isNew && <Badge tone="blue">New</Badge>}
            {product.isBestSeller && <Badge tone="black">Top</Badge>}
          </div>
        </div>
      </div>

      <p className="hidden min-w-0 truncate text-sm font-bold text-zinc-700 lg:block">
        {product.category}
      </p>
      <div className="text-sm font-extrabold text-ink lg:block">
        {product.price} dh
        {product.oldPrice && (
          <span className="ml-2 text-xs font-bold text-zinc-400 line-through">
            {product.oldPrice} dh
          </span>
        )}
      </div>
      <div className="hidden flex-wrap gap-1 lg:flex">
        <Badge tone={product.inStock ? "green" : "zinc"}>
          {product.inStock ? "Stock" : "Rupture"}
        </Badge>
        {product.isPromo && <Badge tone="yellow">Promo</Badge>}
        {product.isNew && <Badge tone="blue">New</Badge>}
        {product.isBestSeller && <Badge tone="black">Top</Badge>}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Modifier"
          title="Modifier"
          className="grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 bg-white text-ink transition hover:border-yellow-300 hover:bg-yellow-50"
        >
          <Pencil size={17} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Supprimer"
          title="Supprimer"
          className="grid h-10 w-10 place-items-center rounded-lg border border-red-100 bg-white text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

function ProductForm({
  draft,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}: {
  draft: ProductDraft;
  editingId: number | null;
  onChange: <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-5 grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-ink">
            {editingId ? "Modifier produit" : "Nouveau produit"}
          </h2>
          <p className="text-xs font-bold text-zinc-500">
            {editingId ? `ID ${editingId}` : "Brouillon local"}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Reinitialiser"
          title="Reinitialiser"
          className="grid h-10 w-10 place-items-center rounded-lg bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid gap-3">
        <Field label="Nom">
          <input
            required
            value={draft.name}
            onChange={(event) => onChange("name", event.target.value)}
            className="field-input"
            placeholder="Nom du produit"
          />
        </Field>
        <Field label="Slug">
          <input
            required
            value={draft.slug}
            onChange={(event) => onChange("slug", slugify(event.target.value))}
            className="field-input"
            placeholder="slug-produit"
          />
        </Field>
        <Field label="Categorie">
          <select
            value={draft.category}
            onChange={(event) => onChange("category", event.target.value as Category)}
            className="field-input"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prix">
            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={draft.price}
              onChange={(event) => onChange("price", event.target.value)}
              className="field-input"
              placeholder="0"
            />
          </Field>
          <Field label="Ancien prix">
            <input
              min="0"
              step="0.01"
              type="number"
              value={draft.oldPrice}
              onChange={(event) => onChange("oldPrice", event.target.value)}
              className="field-input"
              placeholder="Optionnel"
            />
          </Field>
        </div>
        <Field label="Image">
          <input
            required
            value={draft.image}
            onChange={(event) => onChange("image", event.target.value)}
            className="field-input"
            placeholder="https://..."
          />
        </Field>
        <Field label="Description">
          <textarea
            required
            value={draft.description}
            onChange={(event) => onChange("description", event.target.value)}
            className="field-input min-h-24 resize-none py-3"
            placeholder="Description courte"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Toggle label="En stock" checked={draft.inStock} onChange={(value) => onChange("inStock", value)} />
        <Toggle label="Promo" checked={draft.isPromo} onChange={(value) => onChange("isPromo", value)} />
        <Toggle label="Nouveau" checked={draft.isNew} onChange={(value) => onChange("isNew", value)} />
        <Toggle label="Top vente" checked={draft.isBestSeller} onChange={(value) => onChange("isBestSeller", value)} />
      </div>

      <button
        type="submit"
        className="flex h-11 items-center justify-center gap-2 rounded-lg bg-sun px-4 text-sm font-extrabold text-ink transition hover:bg-yellow-300"
      >
        {editingId ? <Check size={18} /> : <Plus size={18} />}
        {editingId ? "Enregistrer" : "Ajouter"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-xs font-extrabold uppercase tracking-wide text-zinc-500">
      {label}
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 text-sm font-extrabold transition ${
        checked
          ? "border-yellow-300 bg-yellow-50 text-ink"
          : "border-zinc-200 bg-zinc-50 text-zinc-600"
      }`}
    >
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-yellow-400"
      />
    </label>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "yellow" | "blue" | "black" | "zinc";
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    yellow: "bg-yellow-50 text-yellow-700 ring-yellow-100",
    blue: "bg-sky-50 text-sky-700 ring-sky-100",
    black: "bg-ink text-sun ring-ink",
    zinc: "bg-zinc-100 text-zinc-600 ring-zinc-200",
  };

  return (
    <span className={`rounded-full px-2 py-1 text-[11px] font-extrabold ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}
