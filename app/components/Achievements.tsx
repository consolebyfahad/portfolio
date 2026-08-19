"use client";

import { motion } from "framer-motion";
import { achievements } from "../data/portfolio";
import { fadeUp, staggerContainer, easeOut, viewportOnce } from "../lib/motion";

export default function Achievements() {
  return (
    <section id="achievements" className="site-section relative bg-[#050505]">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={easeOut}
          className="mb-12 sm:mb-16"
        >
          <h2 className="section-display">What I&apos;ve Built</h2>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {achievements.map((item) => (
            <motion.article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
              variants={fadeUp}
              transition={easeOut}
            >
              <h3 className="font-display text-xl text-[#dedcd3] sm:text-2xl">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/55">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
