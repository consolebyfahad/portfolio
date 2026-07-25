"use client";

import dynamic from "next/dynamic";
import IntroSplash from "./IntroSplash";

const CustomCursor = dynamic(() => import("./motion/CustomCursor"), { ssr: false });
const BackgroundEffects = dynamic(() => import("./motion/BackgroundEffects"), { ssr: false });
const ScrollProgress = dynamic(() => import("./motion/ScrollProgress"), { ssr: false });
const ScrollToTop = dynamic(() => import("./motion/ScrollToTop"), { ssr: false });

export default function ClientEffects() {
  return (
    <>
      <IntroSplash />
      <CustomCursor />
      <BackgroundEffects />
      <ScrollProgress />
      <ScrollToTop />
    </>
  );
}
