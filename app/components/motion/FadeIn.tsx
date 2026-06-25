"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  slideInUp,
  popUp,
  easeOut,
  popUpSpring,
  viewportOnce,
} from "../../lib/motion";

type RevealDirection = "up" | "left" | "right" | "pop";

const variants: Record<RevealDirection, typeof fadeUp> = {
  up: slideInUp,
  left: slideInLeft,
  right: slideInRight,
  pop: popUp,
};

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: RevealDirection;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  ...props
}: FadeInProps) {
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
      {...props}
    >
      {children}
    </motion.div>
  );
}
