import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["Intel Clear", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Interview task",
  description:
    "Next.js (App Router) application in TypeScript that queries the Jobicy API and displays remote job listings. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
