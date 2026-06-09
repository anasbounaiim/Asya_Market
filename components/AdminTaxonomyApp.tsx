"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, Pencil, Plus, Search, Tag, Trash2, X } from "lucide-react";
import { categories as seedCategories, products } from "@/data/products";

type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

type TagItem = {
  id: number;
  name: string;
  slug: string;
  color: string;
};

const tagColors = [
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
] as const;

const initialCategories: CategoryItem[] = seedCategories.map((category, index) => ({
  id: index + 1,
  name: category,
  slug: slugify(category),
  description: "Categorie catalogue",
}));

const initialTags: TagItem[] = [
  { id: 1, name: "Promotion", slug: "promotion", color: "yellow" },
  { id: 2, name: "Nouveau", slug: "nouveau", color: "blue" },
  { id: 3, name: "Top vente", slug: "top-vente", color: "black" },
  { id: 4, name: "Rupture", slug: "rupture", color: "red" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminTaxonomyApp() {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [tags, setTags] = useState<TagItem[]>(initialTags);
  const [categoryDraft, setCategoryDraft] = useState<Omit<CategoryItem, "id">>({
    name: "",
    slug: "",
    description: "",
  });
  const [tagDraft, setTagDraft] = useState<Omit<TagItem, "id">>({
    name: "",
    slug: "",
    color: "yellow",
  });
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return categories.filter((category) =>
      lowerQuery
        ? [category.name, category.slug, category.description].some((value) =>
            value.toLowerCase().includes(lowerQuery),
          )
        : true,
    );
  }, [categories, query]);

  const filteredTags = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return tags.filter((tagItem) =>
      lowerQuery
        ? [tagItem.name, tagItem.slug, tagItem.color].some((value) =>
            value.toLowerCase().includes(lowerQuery),
          )
        : true,
    );
  }, [query, tags]);

  function updateCategoryName(name: string) {
    setCategoryDraft((current) => ({
      ...current,
      name,
      slug: !current.slug || current.slug === slugify(current.name) ? slugify(name) : current.slug,
    }));
  }

  function updateTagName(name: string) {
    setTagDraft((current) => ({
      ...current,
      name,
      slug: !current.slug || current.slug === slugify(current.name) ? slugify(name) : current.slug,
    }));
  }

  function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextCategory: CategoryItem = {
      id: editingCategoryId ?? Math.max(0, ...categories.map((category) => category.id)) + 1,
      name: categoryDraft.name.trim(),
      slug: (categoryDraft.slug || slugify(categoryDraft.name)).trim(),
      description: categoryDraft.description.trim() || "Categorie catalogue",
    };

    setCategories((current) =>
      editingCategoryId
        ? current.map((category) => (category.id === editingCategoryId ? nextCategory : category))
        : [nextCategory, ...current],
    );
    resetCategoryForm();
  }

  function saveTag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTag: TagItem = {
      id: editingTagId ?? Math.max(0, ...tags.map((tagItem) => tagItem.id)) + 1,
      name: tagDraft.name.trim(),
      slug: (tagDraft.slug || slugify(tagDraft.name)).trim(),
      color: tagDraft.color,
    };

    setTags((current) =>
      editingTagId
        ? current.map((tagItem) => (tagItem.id === editingTagId ? nextTag : tagItem))
        : [nextTag, ...current],
    );
    resetTagForm();
  }

  function editCategory(category: CategoryItem) {
    setEditingCategoryId(category.id);
    setCategoryDraft({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
  }

  function editTag(tagItem: TagItem) {
    setEditingTagId(tagItem.id);
    setTagDraft({
      name: tagItem.name,
      slug: tagItem.slug,
      color: tagItem.color,
    });
  }

  function resetCategoryForm() {
    setEditingCategoryId(null);
    setCategoryDraft({ name: "", slug: "", description: "" });
  }

  function resetTagForm() {
    setEditingTagId(null);
    setTagDraft({ name: "", slug: "", color: "yellow" });
  }

  function categoryProductCount(categoryName: string) {
    return products.filter((product) => product.category === categoryName).length;
  }

  return (
    <div className="px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5">
        <header className="flex flex-col gap-3 border-b border-zinc-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-yellow-600">
              Catalogue
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
              Categories et tags
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-zinc-600">
              Ajoutez, modifiez et organisez les groupes produits avant de connecter le backend.
            </p>
          </div>
          <label className="flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 shadow-sm lg:w-80">
            <Search size={18} className="text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
            />
          </label>
        </header>

        <section className="grid gap-5 xl:grid-cols-2 xl:items-start">
          <TaxonomyPanel
            title="Categories"
            description="Groupes principaux du catalogue"
            count={categories.length}
            form={
              <CategoryForm
                draft={categoryDraft}
                editingId={editingCategoryId}
                onNameChange={updateCategoryName}
                onSlugChange={(slug) =>
                  setCategoryDraft((current) => ({ ...current, slug: slugify(slug) }))
                }
                onDescriptionChange={(description) =>
                  setCategoryDraft((current) => ({ ...current, description }))
                }
                onSubmit={saveCategory}
                onCancel={resetCategoryForm}
              />
            }
          >
            {filteredCategories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                productCount={categoryProductCount(category.name)}
                isEditing={editingCategoryId === category.id}
                onEdit={() => editCategory(category)}
                onDelete={() =>
                  setCategories((current) => current.filter((item) => item.id !== category.id))
                }
              />
            ))}
            {filteredCategories.length === 0 && <EmptyState />}
          </TaxonomyPanel>

          <TaxonomyPanel
            title="Tags"
            description="Badges et etiquettes affichables"
            count={tags.length}
            form={
              <TagForm
                draft={tagDraft}
                editingId={editingTagId}
                onNameChange={updateTagName}
                onSlugChange={(slug) =>
                  setTagDraft((current) => ({ ...current, slug: slugify(slug) }))
                }
                onColorChange={(color) => setTagDraft((current) => ({ ...current, color }))}
                onSubmit={saveTag}
                onCancel={resetTagForm}
              />
            }
          >
            {filteredTags.map((tagItem) => (
              <TagRow
                key={tagItem.id}
                tagItem={tagItem}
                isEditing={editingTagId === tagItem.id}
                onEdit={() => editTag(tagItem)}
                onDelete={() => setTags((current) => current.filter((item) => item.id !== tagItem.id))}
              />
            ))}
            {filteredTags.length === 0 && <EmptyState />}
          </TaxonomyPanel>
        </section>
      </div>
    </div>
  );
}

function TaxonomyPanel({
  title,
  description,
  count,
  form,
  children,
}: {
  title: string;
  description: string;
  count: number;
  form: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-zinc-200 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-ink">{title}</h2>
          <p className="text-xs font-bold text-zinc-500">{description}</p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-extrabold text-zinc-600">
          {count}
        </span>
      </div>
      {form}
      <div className="grid gap-2">{children}</div>
    </article>
  );
}

function CategoryForm({
  draft,
  editingId,
  onNameChange,
  onSlugChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}: {
  draft: Omit<CategoryItem, "id">;
  editingId: number | null;
  onNameChange: (name: string) => void;
  onSlugChange: (slug: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-lg bg-zinc-50 p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={draft.name}
          onChange={(event) => onNameChange(event.target.value)}
          className="field-input bg-white"
          placeholder="Nom categorie"
        />
        <input
          required
          value={draft.slug}
          onChange={(event) => onSlugChange(event.target.value)}
          className="field-input bg-white"
          placeholder="slug-categorie"
        />
      </div>
      <input
        value={draft.description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        className="field-input bg-white"
        placeholder="Description courte"
      />
      <FormActions editing={Boolean(editingId)} onCancel={onCancel} />
    </form>
  );
}

function TagForm({
  draft,
  editingId,
  onNameChange,
  onSlugChange,
  onColorChange,
  onSubmit,
  onCancel,
}: {
  draft: Omit<TagItem, "id">;
  editingId: number | null;
  onNameChange: (name: string) => void;
  onSlugChange: (slug: string) => void;
  onColorChange: (color: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-lg bg-zinc-50 p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={draft.name}
          onChange={(event) => onNameChange(event.target.value)}
          className="field-input bg-white"
          placeholder="Nom tag"
        />
        <input
          required
          value={draft.slug}
          onChange={(event) => onSlugChange(event.target.value)}
          className="field-input bg-white"
          placeholder="slug-tag"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {tagColors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onColorChange(color.value)}
            title={color.label}
            aria-label={color.label}
            className={`h-10 rounded-lg ring-2 transition ${tagColorClasses[color.value].swatch} ${
              draft.color === color.value ? "ring-ink" : "ring-transparent"
            }`}
          />
        ))}
      </div>
      <FormActions editing={Boolean(editingId)} onCancel={onCancel} />
    </form>
  );
}

function FormActions({ editing, onCancel }: { editing: boolean; onCancel: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        aria-label="Annuler"
        title="Annuler"
        className="grid h-10 w-10 place-items-center rounded-lg bg-white text-zinc-600 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
      >
        <X size={17} />
      </button>
      <button
        type="submit"
        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-sun px-4 text-sm font-extrabold text-ink transition hover:bg-yellow-300"
      >
        {editing ? <Check size={17} /> : <Plus size={17} />}
        {editing ? "Enregistrer" : "Ajouter"}
      </button>
    </div>
  );
}

function CategoryRow({
  category,
  productCount,
  isEditing,
  onEdit,
  onDelete,
}: {
  category: CategoryItem;
  productCount: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_auto] sm:items-center ${
        isEditing ? "border-yellow-300 bg-yellow-50" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-ink">{category.name}</p>
        <p className="mt-1 truncate text-xs font-bold text-zinc-500">{category.slug}</p>
        <p className="mt-2 text-xs font-semibold text-zinc-500">{category.description}</p>
      </div>
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-extrabold text-zinc-600">
          {productCount} produits
        </span>
        <RowActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

function TagRow({
  tagItem,
  isEditing,
  onEdit,
  onDelete,
}: {
  tagItem: TagItem;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_auto] sm:items-center ${
        isEditing ? "border-yellow-300 bg-yellow-50" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-extrabold ${tagColorClasses[tagItem.color].badge}`}
        >
          <Tag size={13} />
          {tagItem.name}
        </span>
        <p className="mt-2 truncate text-xs font-bold text-zinc-500">{tagItem.slug}</p>
      </div>
      <RowActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
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
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm font-bold text-zinc-500">
      Aucun resultat.
    </div>
  );
}

const tagColorClasses: Record<string, { badge: string; swatch: string }> = {
  yellow: {
    badge: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-100",
    swatch: "bg-yellow-400",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    swatch: "bg-emerald-500",
  },
  blue: {
    badge: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    swatch: "bg-sky-500",
  },
  black: {
    badge: "bg-ink text-sun ring-1 ring-ink",
    swatch: "bg-ink",
  },
  red: {
    badge: "bg-red-50 text-red-700 ring-1 ring-red-100",
    swatch: "bg-red-500",
  },
};
