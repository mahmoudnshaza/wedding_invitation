import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import PageFrame from "@/components/PageFrame";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahmoud & Shaza | Let's Get Married",
  description:
    "You are invited to celebrate the wedding of Mahmoud Saeed & Shaza Romhy — Friday, October 9, 2026, Hayah Hall, Cairo, Egypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="font-body antialiased bg-champagne text-charcoal overflow-x-hidden">
        <PageFrame />
        {children}
      </body>
    </html>
  );
}
