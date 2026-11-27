import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { HelpWidget } from "@/components/help-widget";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const siteDescription =
  "Taf Africa met en relation les clients et les freelances d'Afrique francophone. Consultez librement, publiez votre besoin, payez par Mobile Money ou carte — sans créer de société.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: siteDescription,
      areaServed: ["Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Cameroun", "Bénin"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: siteDescription,
      inLanguage: "fr",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  applicationName: "Taf Africa",
  appleWebApp: {
    capable: true,
    title: "Taf Africa",
    statusBarStyle: "default",
  },
  title: {
    default: "Taf Africa — le talent et la mission, au même endroit",
    template: "%s · Taf Africa",
  },
  description: siteDescription,
  robots: { index: true, follow: true },
  keywords: [
    "freelance Afrique",
    "talents africains",
    "développeur freelance",
    "graphiste freelance",
    "missions freelance",
    "Mobile Money",
    "Taf Africa",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Taf Africa",
    title: "Taf Africa — le talent et la mission, au même endroit",
    description:
      "La marketplace qui réunit clients et freelances d'Afrique francophone.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taf Africa",
    description:
      "La marketplace qui réunit clients et freelances d'Afrique francophone.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${hanken.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
        <HelpWidget />
      </body>
    </html>
  );
}
