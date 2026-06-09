"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { StickyCartBar } from "@/components/StickyCartBar";
import { AdminNav } from "@/components/AdminNav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <AdminNav>{children}</AdminNav>;
  }

  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsAppButton />
      <CartDrawer />
      <StickyCartBar />
    </CartProvider>
  );
}
