import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Enrico Avagliano — La pesca a portata di click",
  description:
    "Tecniche, lenze, specie e diari di pesca in mare e in foce. Blog e app di Enrico Avagliano.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "E. Avagliano",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1520",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

