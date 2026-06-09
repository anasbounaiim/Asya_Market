import type { Metadata } from "next";
import { AdminProductsApp } from "@/components/AdminProductsApp";

export const metadata: Metadata = {
  title: "Admin produits - ASYA MARKET",
};

export default function AdminProductsPage() {
  return <AdminProductsApp />;
}
