import type { Metadata } from "next";
import { AdminTaxonomyApp } from "@/components/AdminTaxonomyApp";

export const metadata: Metadata = {
  title: "Categories et tags - ASYA MARKET",
};

export default function AdminCatalogPage() {
  return <AdminTaxonomyApp />;
}
