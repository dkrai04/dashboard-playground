import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { LayoutProps } from "@/types";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Playground",
  description: "A Next.js dashboard prototype using Blend Design System.",
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
