import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import CustomCursor from "./components/motion/CustomCursor";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fahad Ur Rehman — Frontend Engineer",
  description:
    "Frontend Engineer from Lahore, Pakistan. React, React Native, TypeScript, and building polished user experiences.",
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    apple: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
  openGraph: {
    title: "Fahad Ur Rehman — Frontend Engineer",
    description:
      "Frontend Engineer specializing in React, React Native, TypeScript, and Expo.",
    images: ["/fahad.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
