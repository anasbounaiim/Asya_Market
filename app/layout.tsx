import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { StickyCartBar } from "@/components/StickyCartBar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASYA MARKET - Votre marché de proximité",
  description:
    "Commandez vos courses du quotidien chez ASYA MARKET directement via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={jakarta.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsAppButton />
          <CartDrawer />
          <StickyCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
