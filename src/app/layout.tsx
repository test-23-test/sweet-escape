import type { Metadata, Viewport } from "next";
import { fraunces, dmSans, caveat, jetbrainsMono } from "@/lib/fonts";
import { Providers } from "@/components/layout/Providers";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CartDrawer } from "@/components/order/CartDrawer";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { BackToTop } from "@/components/ui/BackToTop";
import { ToastStack } from "@/components/ui/ToastStack";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sweetescape.in"),
  title: {
    default: "SweetEscape — bakery in Chandigarh",
    template: "%s · SweetEscape",
  },
  description:
    "An artisanal fusion bakery in Chandigarh. Classical French technique, Indian-ingredient flourishes. SCO 114, Sector 35-B.",
  keywords: [
    "bakery",
    "Chandigarh",
    "artisan pastry",
    "SweetEscape",
    "viennoiserie",
    "Sector 35",
  ],
  openGraph: {
    title: "SweetEscape — bakery in Chandigarh",
    description:
      "Classical French technique, Indian-ingredient flourishes. Baked fresh every morning at 5am on Sector 35-B.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "SweetEscape — artisanal fusion bakery in Chandigarh" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.svg"] },
};

export const viewport: Viewport = {
  themeColor: "#F7EFE2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "SweetEscape",
  description: "An artisanal fusion bakery in Chandigarh. Classical French technique, Indian-ingredient flourishes.",
  url: "https://sweetescape.in",
  telephone: "+91-172-419-7326",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SCO 114, Sector 35-B",
    addressLocality: "Chandigarh",
    addressRegion: "CH",
    postalCode: "160022",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 30.7291, longitude: 76.7586 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "08:00", closes: "22:00" },
  ],
  priceRange: "₹₹",
  servesCuisine: ["French pastry", "Fusion bakery", "Indian-inspired viennoiserie"],
  image: "https://sweetescape.in/og.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={[fraunces.variable, dmSans.variable, caveat.variable, jetbrainsMono.variable].join(" ")}
    >
      <head>
        <link rel="preconnect" href="https://fastly.picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SmoothScroll>
            <Navbar />
            <ScrollProgress />
            <main id="content" className="relative min-h-[100dvh]">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </SmoothScroll>
          <GrainOverlay />
          <WhatsAppFAB />
          <BackToTop />
          <ToastStack />
        </Providers>
      </body>
    </html>
  );
}
