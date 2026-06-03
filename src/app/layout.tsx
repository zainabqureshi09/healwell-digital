import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { StickyContact } from "@/components/site/StickyContact";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Muhammad Tanveer | Best Physiotherapist in Karachi",
  description:
    "Professional physiotherapy services in Karachi. Specializing in home care, sports injuries, and rehabilitation.",
  authors: [{ name: "Muhammad Tanveer" }],
  openGraph: {
    title: "Muhammad Tanveer | Physiotherapist",
    description: "Professional physiotherapy services in Karachi.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background flex flex-col antialiased">
        <Providers>
          <Nav />
          <main className="flex-grow">{children}</main>
          <Footer />
          <StickyContact />
          <ChatWidget />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
