import type { Metadata } from "next";
import { Creepster, IM_Fell_English, Share_Tech_Mono } from "next/font/google";
import { createMetadata } from "@/lib/seo";
import "./globals.css";

const display = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const serif = IM_Fell_English({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = createMetadata({
  title: "The Cat. The Hat. — Sighting Archive",
  description:
    "A fictional map of United States sightings of a polite, too-tall cat in a striped hat. Click a pin for photos and details.",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${serif.variable} ${mono.variable} antialiased`}>
        <a href="#map-region" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#f3e6c8] focus:px-3 focus:py-2 focus:text-[#12080a]">
          Skip to map
        </a>
        {children}
      </body>
    </html>
  );
}
