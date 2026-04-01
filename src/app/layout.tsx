import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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

const interDisplay = localFont({
  src: [
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Thin.ttf",           weight: "100", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-ThinItalic.ttf",      weight: "100", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-ExtraLight.ttf",      weight: "200", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-ExtraLightItalic.ttf",weight: "200", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Light.ttf",           weight: "300", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-LightItalic.ttf",     weight: "300", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Regular.ttf",         weight: "400", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Italic.ttf",          weight: "400", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Medium.ttf",          weight: "500", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-MediumItalic.ttf",    weight: "500", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-SemiBold.ttf",        weight: "600", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-SemiBoldItalic.ttf",  weight: "600", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Bold.ttf",            weight: "700", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-BoldItalic.ttf",      weight: "700", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-ExtraBold.ttf",       weight: "800", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-Black.ttf",           weight: "900", style: "normal" },
    { path: "./spriha/fonts/inter-display/ttf/InterDisplay-BlackItalic.ttf",     weight: "900", style: "italic" },
  ],
  variable: "--font-inter-display",
});

export const metadata: Metadata = {
  title: "Dashboard Playground",
  description: "A Next.js dashboard prototype using Blend Design System.",
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interDisplay.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
