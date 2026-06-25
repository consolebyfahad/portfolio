"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ArrowVariant = "right" | "external" | "down";

interface ArrowIconProps {
  variant?: ArrowVariant;
  size?: number;
  className?: string;
}

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ArrowPaths({ variant }: { variant: ArrowVariant }) {
  const paths: Record<ArrowVariant, ReactNode> = {
    right: (
      <>
        <line x1="4" y1="12" x2="16" y2="12" {...strokeProps} />
        <polyline points="11,7 17,12 11,17" fill="none" {...strokeProps} />
      </>
    ),
    external: (
      <>
        <path d="M7 17L17 7" fill="none" {...strokeProps} />
        <path d="M9 7h8v8" fill="none" {...strokeProps} />
      </>
    ),
    down: (
      <>
        <line x1="12" y1="5" x2="12" y2="15" {...strokeProps} />
        <polyline points="7,11 12,16 17,11" fill="none" {...strokeProps} />
      </>
    ),
  };

  return <>{paths[variant]}</>;
}

export default function ArrowIcon({
  variant = "right",
  size = 18,
  className = "",
}: ArrowIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      whileHover={{ x: variant === "down" ? 0 : 3, y: variant === "down" ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <ArrowPaths variant={variant} />
    </motion.svg>
  );
}
