"use client";

import { motion } from "framer-motion";
import { about, skillGroups } from "../data/portfolio";
import { fadeUp, staggerContainer, easeOut, viewportOnce } from "../lib/motion";

export default function Skills() {
  return (
    <section id="skills" className="site-section relative mt-20 bg-[#050505] sm:mt-28 lg:mt-32">
      <div className="site-shell">
        <motion.h2
          className="about-headline max-w-5xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {about.headline}
        </motion.h2>

        <motion.div
          className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col gap-6 sm:gap-7" variants={fadeUp} transition={easeOut}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="about-body">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div className="flex flex-col gap-8 sm:gap-9 lg:pt-1" variants={fadeUp} transition={easeOut}>
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="about-skill-title">{group.title}</h3>
                <p className="about-skill-list">{group.items}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
