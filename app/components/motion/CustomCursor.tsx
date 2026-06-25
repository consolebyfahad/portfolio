"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SPRING = { stiffness: 600, damping: 35, mass: 0.4 };
const RING_SPRING = { stiffness: 160, damping: 20, mass: 0.6 };

function CursorArrow({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <line
        x1="4"
        y1="12"
        x2="16"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polyline
        points="11,7 17,12 11,17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);

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
        "a, button, input, textarea, select, label, [role='button']"
      );
      setIsPointer(!!interactive);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
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
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? (isPointer ? 1 : 0.45) : 0,
          width: isPointer ? 54 : 40,
          height: isPointer ? 54 : 40,
          scale: isClicking ? 0.88 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-full w-full rounded-full border transition-colors duration-200"
          style={{
            borderWidth: isPointer ? 2 : 1.5,
            borderColor: isPointer ? "var(--accent)" : "rgba(200, 245, 66, 0.35)",
            boxShadow: isPointer ? "0 0 20px rgba(200, 245, 66, 0.25)" : "none",
          }}
        />
      </motion.div>

      {/* Arrow cursor — always visible */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          animate={{
            width: isPointer ? 32 : 22,
            height: isPointer ? 32 : 22,
            backgroundColor: isPointer ? "var(--accent)" : "transparent",
            borderRadius: isPointer ? "50%" : 4,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <CursorArrow
            size={isPointer ? 14 : 18}
            className={isPointer ? "text-background" : "text-accent"}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
