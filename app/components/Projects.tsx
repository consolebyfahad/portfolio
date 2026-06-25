"use client";

import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import SectionHeading from "./motion/SectionHeading";
import Tilt3D from "./motion/Tilt3D";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  easeOut,
  viewportOnce,
} from "../lib/motion";
import ArrowIcon from "./icons/ArrowIcon";

function ExternalLinkIcon() {
  return <ArrowIcon variant="external" size={15} />;
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <motion.section
      id="work"
      className="relative border-t border-card-border py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Portfolio" title="Things I Worked On" />

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              transition={{ ...easeOut, delay: i * 0.06 }}
            >
              <Tilt3D intensity={10}>
                <motion.article
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card/80 p-8 backdrop-blur-sm"
                  whileHover={{
                    borderColor: "rgba(200, 245, 66, 0.3)",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(200, 245, 66, 0.05)",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  />

                  <div className="mb-4 flex items-start justify-between gap-4" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <div className="flex shrink-0 gap-2">
                      {project.url && (
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon !h-8 !w-8"
                          aria-label={`Visit ${project.title}`}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLinkIcon />
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon !h-8 !w-8"
                          aria-label={`${project.title} on GitHub`}
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <GitHubIcon />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted" style={{ transform: "translateZ(20px)" }}>
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2" style={{ transform: "translateZ(10px)" }}>
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <span className="tag">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
