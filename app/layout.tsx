import type { Metadata, Viewport } from "next";
import { Archivo_Black, DM_Sans } from "next/font/google";
import ClientEffects from "./components/ClientEffects";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fahadurrehman.vercel.app");

const title = "Fahad Ur Rehman | Frontend, Web & React Native Developer";
const description =
  "Fahad Ur Rehman is a Frontend Engineer and web & mobile developer from Lahore. Specializing in React, React Native, Next.js, and TypeScript — building fast, polished digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Fahad Ur Rehman",
  },
  description,
  applicationName: "Fahad Ur Rehman Portfolio",
  authors: [{ name: "Fahad Ur Rehman", url: siteUrl }],
  creator: "Fahad Ur Rehman",
  publisher: "Fahad Ur Rehman",
  keywords: [
    "Fahad Ur Rehman",
    "Fahad",
    "Frontend Developer",
    "Frontend Engineer",
    "Web Developer",
    "Mobile Developer",
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "TypeScript",
    "Expo",
    "UI Developer",
    "Lahore",
    "Pakistan",
    "Portfolio",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/jpeg", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg" }],
    shortcut: "/favicon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Fahad Ur Rehman",
    title,
    description,
    images: [
      {
        url: "/fahad.jpg",
        width: 800,
        height: 800,
        alt: "Fahad Ur Rehman — Frontend, React & React Native Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/fahad.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Fahad Ur Rehman",
      description,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Fahad Ur Rehman",
      alternateName: ["Fahad", "Fahad Rehman"],
      url: siteUrl,
      image: `${siteUrl}/fahad.jpg`,
      jobTitle: "Frontend Engineer",
      description,
      email: "mailto:fahad00rehman@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      worksFor: {
        "@type": "Organization",
        name: "Axon Technologies",
      },
      knowsAbout: [
        "Frontend Development",
        "Web Development",
        "Mobile Development",
        "React",
        "React Native",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Expo",
        "Redux",
        "UI Engineering",
      ],
      sameAs: [
        "https://github.com/consolebyfahad",
        "https://www.linkedin.com/in/fahad0/",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: title,
      about: { "@id": `${siteUrl}/#person` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
