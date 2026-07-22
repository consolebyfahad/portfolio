"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const DOT_SPRING = { stiffness: 500, damping: 32, mass: 0.35 };
const RING_SPRING = { stiffness: 140, damping: 22, mass: 0.55 };
const LABEL_SPRING = { stiffness: 220, damping: 24, mass: 0.4 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);
  const labelX = useSpring(mouseX, LABEL_SPRING);
  const labelY = useSpring(mouseY, LABEL_SPRING);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const activate = () => {
      const shouldEnable = finePointer.matches && !reducedMotion.matches;
      setEnabled(shouldEnable);
      document.documentElement.classList.toggle("custom-cursor-active", shouldEnable);
    };

    activate();
    finePointer.addEventListener("change", activate);
    reducedMotion.addEventListener("change", activate);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      finePointer.removeEventListener("change", activate);
      reducedMotion.removeEventListener("change", activate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, label, [role='button'], .project-row, .hero-portrait-frame"
      ) as HTMLElement | null;
      setIsPointer(!!interactive);

      const labeled = target.closest("[data-cursor-label]") as HTMLElement | null;
      setLabel(labeled?.getAttribute("data-cursor-label") ?? null);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => {
      setIsVisible(false);
      setLabel(null);
      setIsPointer(false);
    };
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — hidden on any interactive hover */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible && !isPointer && !label ? 0.35 : 0,
          width: 36,
          height: 36,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-full w-full rounded-full border border-white/70" />
      </motion.div>

      {/* Center dot — always visible when cursor is on screen */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible && !label ? 1 : 0,
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white" />
      </motion.div>

      {/* Hover label pill (e.g. View LinkedIn Profile) */}
      <AnimatePresence>
        {label && isVisible && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[10001]"
            style={{ x: labelX, y: labelY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: isClicking ? 0.94 : 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#d8d6cf] px-4 py-2.5 text-[13px] font-semibold tracking-tight text-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
