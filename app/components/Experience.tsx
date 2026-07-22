"use client";

import { motion } from "framer-motion";
import { experience } from "../data/portfolio";
import { fadeUp, staggerContainer, easeOut, viewportOnce } from "../lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="site-section relative bg-[#050505]">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={easeOut}
          className="mb-12 sm:mb-16"
        >
          <p className="section-kicker mb-5">Career</p>
          <h2 className="section-display">Experience</h2>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {experience.map((item) => (
            <motion.article
              key={item.title}
              className="group grid gap-4 border-t border-white/10 py-10 sm:grid-cols-[10rem_1fr] sm:gap-12 lg:grid-cols-[12rem_1fr]"
              variants={fadeUp}
              transition={easeOut}
            >
              <p className="font-display text-3xl text-white/45 transition-colors group-hover:text-white/75 sm:text-4xl lg:text-5xl">
                {item.period}
              </p>
              <div>
                <h3 className="font-display text-4xl text-[#dedcd3] sm:text-5xl lg:text-6xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-base font-medium text-white/70 sm:text-lg">{item.company}</p>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/55 sm:text-lg">
                  {item.description}
                </p>
                <p className="mt-5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
