import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Eventos Madrid — Todo Madrid. Un solo lugar.",
  description:
    "Directorio premium de eventos y vida nocturna en Madrid. After work, clubs, tardeos, dinner parties y casual drinks.",
  keywords: "eventos madrid, nightlife madrid, clubs madrid, tardeos madrid, dinner parties madrid",
  openGraph: {
    title: "Eventos Madrid",
    description: "Todo Madrid. Un solo lugar.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${dmMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
