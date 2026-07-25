"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Olá",
  "こんにちは",
  "안녕하세요",
  "Merhaba",
  "Shalom",
  "नमस्ते",
  "السلام علیکم",
];

const WORD_MS = 300;
const HOLD_LAST_MS = 650;
const EXIT_MS = 900;
const FADE_MS = 0.25;

type IntroSplashProps = {
  onComplete?: () => void;
};

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"cycle" | "exit" | "done">("cycle");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      onComplete?.();
      return;
    }
    setEnabled(true);
    document.documentElement.classList.add("intro-active");
    return () => {
      document.documentElement.classList.remove("intro-active");
    };
  }, [onComplete]);

  useEffect(() => {
    if (!enabled || phase !== "cycle") return;

    if (index >= GREETINGS.length - 1) {
      const hold = window.setTimeout(() => setPhase("exit"), HOLD_LAST_MS);
      return () => window.clearTimeout(hold);
    }

    const tick = window.setTimeout(() => setIndex((i) => i + 1), WORD_MS);
    return () => window.clearTimeout(tick);
  }, [enabled, phase, index]);

  useEffect(() => {
    if (phase !== "exit") return;
    const done = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.remove("intro-active");
      onComplete?.();
    }, EXIT_MS);
    return () => window.clearTimeout(done);
  }, [phase, onComplete]);

  if (!enabled || phase === "done") return null;

  const word = GREETINGS[index];

  return (
    <motion.div
      className="intro-splash fixed inset-0 z-[100000] flex items-center justify-center bg-[#050505]"
      initial={false}
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="relative flex h-[clamp(3rem,10vw,6.5rem)] w-full max-w-[90vw] items-center justify-center px-6">
        <AnimatePresence initial={false}>
          <motion.p
            key={word}
            className="intro-word absolute inset-0 flex items-center justify-center text-center font-display text-[clamp(2.4rem,8vw,5.5rem)] leading-none tracking-[0.02em] text-[#dedcd3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_MS, ease: "easeInOut" }}
          >
            {word}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
