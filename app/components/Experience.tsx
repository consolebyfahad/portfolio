"use client";

import { motion } from "framer-motion";
import { experience } from "../data/portfolio";
import SectionHeading from "./motion/SectionHeading";
import Tilt3D from "./motion/Tilt3D";
import { slideInLeft, staggerContainer, easeOut, viewportOnce } from "../lib/motion";

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="relative border-t border-card-border py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Career" title="Experience" />

        <motion.div
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative flex gap-6 border-l-2 border-card-border pl-8"
              variants={slideInLeft}
              transition={{ ...easeOut, delay: i * 0.12 }}
            >
              <motion.div
                className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-accent bg-background"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 + i * 0.12 }}
                viewport={viewportOnce}
              />
              <Tilt3D intensity={8} className="flex-1">
                <motion.div
                  className="rounded-2xl border border-card-border bg-card/80 p-8 backdrop-blur-sm"
                  whileHover={{
                    borderColor: "rgba(200, 245, 66, 0.3)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <motion.span
                      className="text-sm font-medium text-accent"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.1, ...easeOut }}
                      viewport={viewportOnce}
                    >
                      {item.period}
                    </motion.span>
                  </div>
                  <p className="mb-4 text-sm font-semibold text-muted">{item.company}</p>
                  <p className="mb-5 text-sm leading-relaxed text-muted">{item.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <span className="tag">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
