"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

export default function Magnetic({ children, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.35 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * 0.32);
    rawY.set(dy * 0.32);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

interface MagneticPortraitProps {
  children: ReactNode;
  className?: string;
  range?: number;
}

/** Soft mouse-follow + idle float for hero portrait. */
export function MagneticPortrait({
  children,
  className = "",
  range = 42,
}: MagneticPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 80, damping: 16, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 80, damping: 16, mass: 0.6 });
  const rotateX = useSpring(rawRotateX, { stiffness: 110, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 110, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * range);
    rawY.set(py * range);
    rawRotateX.set(-py * 9);
    rawRotateY.set(px * 9);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <div className={`perspective-[1200px] ${className}`}>
      {/* Idle float layer */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Magnetic follow layer */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
