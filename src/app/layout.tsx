import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ContactConcierge } from "@/components/site/ContactConcierge";
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
  metadataBase: new URL("https://healwell-digital.vercel.app"),
  title: {
    template: "%s | Muhammad Tanveer Healthcare Administrator & HOD",
    default: "Muhammad Tanveer | Healthcare Administrator & HOD Physiotherapy Karachi",
  },
  description:
    "Muhammad Tanveer is an Assistant Healthcare Administrator at Jamila Sultan Welfare Society and HOD Physiotherapy at Dr Essa Center. AKUH Alumni and CEO of Ezaan Health Foundation.",
  authors: [{ name: "Muhammad Tanveer", url: "https://healwell-digital.vercel.app" }],
  keywords: [
    "Muhammad Tanveer",
    "Healthcare Administrator Karachi",
    "HOD Physiotherapy Karachi",
    "Ezaan Health Foundation",
    "Dr Essa Physiotherapy",
    "AKUH Alumni",
    "MSK Specialist Karachi",
    "Pain Management Karachi",
  ],
  openGraph: {
    title: "Muhammad Tanveer | Healthcare Administrator & HOD Physiotherapy",
    description: "Elite clinical leadership and rehabilitation services in Karachi.",
    url: "https://healwell-digital.vercel.app",
    siteName: "Muhammad Tanveer Healthcare",
    locale: "en_PK",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Tanveer | Healthcare Administrator & HOD",
    description: "Elite clinical leadership and rehabilitation services in Karachi.",
  },
  verification: {
    google: "add-your-google-verification-code-here",
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
          <ContactConcierge />
          <ChatWidget />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
