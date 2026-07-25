"use client";

import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { fadeUp, staggerContainer, easeOut, viewportOnce } from "../lib/motion";
import ArrowIcon from "./icons/ArrowIcon";

export default function Projects() {
  return (
    <section id="work" className="site-section relative bg-[#050505]">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={easeOut}
          className="mb-12 sm:mb-16"
        >
          <h2 className="section-display">Projects</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {projects.map((project) => {
            const href = project.url ?? project.github;
            return (
              <motion.a
                key={project.title}
                href={href ?? undefined}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                className="project-row group grid sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)_auto] sm:items-center"
                variants={fadeUp}
                transition={easeOut}
              >
                <h3 className="project-row-title">{project.title}</h3>
                <div className="project-row-meta">
                  <p className="mb-3 max-w-xl">{project.description}</p>
                  <p>
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 group-hover:border-white/50 group-hover:bg-white group-hover:text-black">
                  <ArrowIcon variant={project.url ? "external" : "right"} size={18} />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
