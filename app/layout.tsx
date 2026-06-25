import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
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
  openGraph: {
    title: "Fahad Ur Rehman — Frontend Engineer",
    description:
      "Frontend Engineer specializing in React, React Native, TypeScript, and Expo.",
    images: ["/fahad.png"],
  },
};

import CustomCursor from "./components/motion/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
