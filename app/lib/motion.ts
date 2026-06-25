import type { Variants, Transition } from "framer-motion";

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const popUpSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 18,
  mass: 0.8,
};

export const easeOut: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const popUp: Variants = {
  hidden: { opacity: 0, scale: 0.55, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: popUpSpring,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

export const viewportOnce = {
  once: true,
  margin: "-100px" as const,
};

export const viewportHero = {
  once: true,
  margin: "-50px" as const,
};
