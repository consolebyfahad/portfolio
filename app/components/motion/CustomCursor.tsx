"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const DOT_SPRING = { stiffness: 500, damping: 32, mass: 0.35 };
const CIRCLE_SPRING = { stiffness: 180, damping: 22, mass: 0.5 };
const LABEL_SPRING = { stiffness: 220, damping: 24, mass: 0.4 };

function isImageTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return !!target.closest(
    "img, picture, video, canvas, svg, .hero-portrait-frame, [data-no-invert]"
  );
}

function isBoxButtonTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return !!target.closest("[data-cursor-box], .text-btn, .btn-outline-light");
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hideInvert, setHideInvert] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isStatus, setIsStatus] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);
  const circleX = useSpring(mouseX, CIRCLE_SPRING);
  const circleY = useSpring(mouseY, CIRCLE_SPRING);
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

    const syncTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return;

      const labeled = target.closest("[data-cursor-label]") as HTMLElement | null;
      const nextLabel = labeled?.getAttribute("data-cursor-label") ?? null;
      const nextStatus = labeled?.getAttribute("data-cursor-status") === "true";
      setLabel(nextLabel);
      setIsStatus(nextStatus);

      const interactive = target.closest(
        "a, button, input, textarea, select, label, [role='button'], .project-row, .hero-portrait-frame, [data-cursor-box], .text-btn"
      );
      setIsPointer(!!interactive || !!nextLabel);
      setHideInvert(isImageTarget(target) || isBoxButtonTarget(target));
    };

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      const under = document.elementFromPoint(e.clientX, e.clientY);
      setHideInvert(isImageTarget(under) || isBoxButtonTarget(under));
    };

    const onOver = (e: MouseEvent) => {
      syncTarget(e.target);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => {
      setIsVisible(false);
      setLabel(null);
      setIsStatus(false);
      setIsPointer(false);
      setHideInvert(false);
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
      {/* Invert circle — hidden on images & text buttons */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: circleX, y: circleY }}
        animate={{
          opacity: isVisible && !hideInvert ? 1 : 0,
          width: hideInvert ? 0 : isPointer ? 64 : 48,
          height: hideInvert ? 0 : isPointer ? 64 : 48,
          scale: isClicking ? 0.88 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full bg-white" />
      </motion.div>

      {/* Middle black dot — always */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-black" />
      </motion.div>

      {/* Portrait open-to-work label only */}
      <AnimatePresence>
        {label && isVisible && isStatus && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[10001]"
            style={{ x: labelX, y: labelY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: isClicking ? 0.94 : 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <div className="translate-x-5 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#d8d6cf] px-3.5 py-2 text-[12px] font-medium tracking-tight text-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:text-[13px]">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
