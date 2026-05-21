import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LoadingOverlay } from "@/components/common/loading-overlay";
import { TooltipProvider } from "@/components/ui/tooltip";

const anekLatin = localFont({
  src: "../public/fonts/AnekLatin-VariableFont_wdth,wght.ttf",
  variable: "--font-anek-latin",
  display: "swap",
});

const anekDevanagari = localFont({
  src: "../public/fonts/AnekDevanagari-VariableFont_wdth,wght.ttf",
  variable: "--font-anek-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plantilla Frontend - Nettalco",
  description: "Sistema administrativo Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${anekLatin.variable} ${anekDevanagari.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <LoadingOverlay />
      </body>
    </html>
  );
}
