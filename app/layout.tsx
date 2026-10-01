import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZAXA · Movimiento propio",
  description: "Colecciones, novedades y ropa deportiva ZAXA. Propuesta interactiva.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
