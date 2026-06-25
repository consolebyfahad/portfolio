"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  float?: boolean;
}

export default function Tilt3D({
  children,
  className = "",
  intensity = 14,
  float = false,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 22 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    rawRotateX.set(-py * intensity);
    rawRotateY.set(px * intensity);
    x.set(px * 20);
    y.set(py * 20);
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    x.set(0);
    y.set(0);
  }

  return (
    <div className={`perspective-[1200px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={float ? { y: [0, -14, 0] } : undefined}
        transition={float ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{
          rotateX,
          rotateY,
          x,
          y,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
