import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASYA MARKET - Outillage, jardin, bâtiment et maison",
  description:
    "Demandez vos produits d'outillage, jardin, BTP, solaire, plomberie, électricité, peinture et maison chez ASYA MARKET via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={jakarta.className}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
