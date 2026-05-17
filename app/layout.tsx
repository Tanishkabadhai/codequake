import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codequake | Architectural Instability Detection",
  description: "Detect repository fault zones, propagation risk, and software shockwaves with IBM Bob reasoning."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
