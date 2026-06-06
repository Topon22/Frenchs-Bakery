import type { Metadata } from "next";
import { Playfair_Display, Lora, Source_Sans_3, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "French's Bakery — Baked Fresh in Costa Mesa Since 1988",
  description:
    "Artisan breads, exquisite pastries, custom cakes and French-inspired dishes — made from scratch every morning. Over 36 years baking fresh in Costa Mesa. Try our legendary Wagon-Wheel Coffeecake in 40+ flavors.",
  keywords: [
    "French bakery Costa Mesa",
    "custom cakes Costa Mesa CA",
    "fresh baked pastries near me 92626",
    "coffeecake Costa Mesa",
    "Wagon-Wheel Coffeecake",
    "bakery Mesa-North Shopping Center",
    "best croissants Costa Mesa",
    "French's Bakery",
    "artisan bread Orange County",
    "bring your own recipe bakery",
  ],
  authors: [{ name: "French's Bakery" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "French's Bakery — Baked Fresh in Costa Mesa Since 1988",
    description:
      "Artisan breads, exquisite pastries, custom cakes and French-inspired dishes — made from scratch every morning.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${lora.variable} ${sourceSans.variable} ${cormorant.variable} ${caveat.variable} antialiased bg-background text-foreground font-source`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
