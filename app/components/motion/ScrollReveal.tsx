"use client";

import { motion } from "framer-motion";
import {
  slideInLeft,
  slideInRight,
  slideInUp,
  popUp,
  easeOut,
  popUpSpring,
  viewportOnce,
} from "../../lib/motion";

type RevealDirection = "up" | "left" | "right" | "pop";

const variants = {
  up: slideInUp,
  left: slideInLeft,
  right: slideInRight,
  pop: popUp,
};

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants[direction]}
      transition={
        direction === "pop"
          ? { ...popUpSpring, delay }
          : { ...easeOut, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
