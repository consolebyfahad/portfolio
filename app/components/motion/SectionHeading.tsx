"use client";

import { motion } from "framer-motion";
import { slideInLeft, staggerContainer, easeOut, viewportOnce } from "../../lib/motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionHeading({ label, title, align = "left" }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.p className="section-label mb-3" variants={slideInLeft} transition={easeOut}>
        {label}
      </motion.p>
      <motion.h2
        className="section-title"
        variants={slideInLeft}
        transition={{ ...easeOut, delay: 0.08 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`mt-4 h-[2px] bg-accent origin-left ${align === "center" ? "mx-auto" : ""}`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: align === "center" ? "60px" : "80px" }}
      />
    </motion.div>
  );
}
