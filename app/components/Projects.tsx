"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { fadeUp, staggerContainer, easeOut, viewportOnce } from "../lib/motion";
import ArrowIcon from "./icons/ArrowIcon";

type Project = (typeof projects)[number];

function projectImageSrc(title: string) {
  const slug = title.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  return `/${slug}.png`;
}

function ProjectRow({ project }: { project: Project }) {
  const [imageReady, setImageReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const href = project.url ?? project.github;
  const imageSrc = projectImageSrc(project.title);
console.log(imageSrc);
  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    setImageReady(image.naturalWidth > 0);
  }, [imageSrc]);

  return (
    <motion.a
      href={href ?? undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`project-row group grid sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)_auto] sm:items-center${
        imageReady ? " has-preview" : ""
      }`}
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
      <span className="relative inline-flex h-12 w-12 shrink-0">
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 ${
            imageReady
              ? "group-hover:scale-90 group-hover:opacity-0"
              : "group-hover:border-white/50 group-hover:bg-white group-hover:text-black"
          }`}
        >
          <ArrowIcon variant={project.url ? "external" : "right"} size={18} />
        </span>
        <span
          aria-hidden={!imageReady}
          className={`pointer-events-none absolute top-1/2 left-0 z-10 -translate-y-1/2 overflow-hidden border border-white/20 bg-[#111] shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:left-auto sm:right-0 ${
            imageReady
              ? "h-12 w-12 rounded-full opacity-0 group-hover:h-[7.25rem] group-hover:w-[11.5rem] group-hover:rounded-2xl group-hover:opacity-100"
              : "h-12 w-12 rounded-full opacity-0"
          }`}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt=""
            onLoad={() => setImageReady(true)}
            onError={() => setImageReady(false)}
            className="h-full w-full object-cover object-[center_30%]"
          />
        </span>
      </span>
    </motion.a>
  );
}

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
          {projects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
