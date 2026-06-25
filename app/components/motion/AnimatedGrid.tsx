"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedGrid() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 0.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0"
      style={{ opacity, y }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200, 245, 66, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 245, 66, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
