import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Sora } from "next/font/google";
import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Motion";
import { site } from "@/content/site";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["500", "600", "700"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

const description =
  "Divyam Saini builds products end to end: PRD, design, build, evaluation on real data, launch. Co-founder of Trido Rentals, IIT Roorkee.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Divyam", template: "%s — Divyam" },
  description,
  openGraph: { title: "Divyam Saini — products, built and proven", description, url: "/", siteName: "Divyam Saini", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F1F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E10" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${dmSans.variable} ${plexMono.variable} antialiased`}>
      <head>
        {/* lets scroll reveals hide content only when JS can show it again */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen leading-normal">
        <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        {children}
        <Pointer />
        <Reveal />
      </body>
    </html>
  );
}
