import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plantas Jiménez | Belleza Natural de Temporada",
  description:
    "Descubre nuestra selecta colección de hortensias y plantas de interior. Transforma tu hogar en un oasis de serenidad con plantas excepcionales cultivadas desde 1985.",
  keywords:
    "plantas, ecommerce, diseño biofílico, hortensias, plantas de interior, plantas premium, jardinería",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoniModa.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}
