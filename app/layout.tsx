import type { Metadata } from "next";
import { Archivo_Black, Manrope } from "next/font/google";
import { brand } from "@/lib/site-data";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: "BarışCreativeDesign | Creative Web Design Studio",
  description:
    "BarışCreativeDesign; web tasarım, UI/UX, yapay zeka destekli sistemler ve modern dijital arayüzler tasarlayan premium creative agency stüdyosu.",
  keywords: [
    "web tasarım",
    "UI/UX",
    "yapay zeka",
    "otomasyon",
    "e-ticaret",
    "creative agency",
    "BarışCreativeDesign",
  ],
  authors: [{ name: brand.compactName }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: brand.url,
    title: "BarışCreativeDesign | Creative Web Design Studio",
    description:
      "Markanı sıradanlıktan çıkaran yaratıcı web deneyimleri. Web tasarım, UI/UX, AI sistemler ve otomasyon.",
    siteName: brand.compactName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BarışCreativeDesign marka görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BarışCreativeDesign | Creative Web Design Studio",
    description: "Markanı sıradanlıktan çıkaran yaratıcı web deneyimleri.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body
        className={`${manrope.variable} ${archivoBlack.variable} bg-cream font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
