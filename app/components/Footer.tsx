"use client";

import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import { easeOut, viewportOnce } from "../lib/motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const emailHref = personal.email ? `mailto:${personal.email}` : personal.linkedin;

  return (
    <footer className="relative bg-[#050505] px-4 pb-5 pt-4 sm:px-6 sm:pb-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] border border-white/15 px-5 pb-7 pt-16 sm:px-10 sm:pb-9 sm:pt-24 lg:px-14 lg:pt-28">
        <motion.h2
          className="font-display text-center text-[clamp(5.5rem,22vw,16rem)] leading-[0.82] tracking-[0.01em] text-[#dedcd3]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={easeOut}
        >
          Let&apos;s Talk
        </motion.h2>

        <motion.div
          className="mt-14 flex flex-col gap-12 sm:mt-20 lg:mt-24 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...easeOut, delay: 0.1 }}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-white/85 sm:text-sm">
              Got a question, proposal, project, or want to work together on something?
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-white/85 sm:text-sm">
              <a
                href={emailHref}
                {...(personal.email ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="underline decoration-white/50 underline-offset-[6px] transition-colors hover:text-white hover:decoration-white"
              >
                Send me an email
              </a>
              <span className="mx-2 no-underline"> or </span>
              <a
                href="#contact"
                className="underline decoration-white/50 underline-offset-[6px] transition-colors hover:text-white hover:decoration-white"
              >
                Book a Call
              </a>
            </p>
          </div>

          <nav className="flex items-center gap-8 sm:gap-10" aria-label="Social links">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="View LinkedIn Profile"
              className="text-lg font-semibold text-white transition-opacity hover:opacity-65 sm:text-xl"
            >
              LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="View GitHub Profile"
              className="text-lg font-semibold text-white transition-opacity hover:opacity-65 sm:text-xl"
            >
              GitHub
            </a>
          </nav>
        </motion.div>

        <div className="mt-14 border-t border-white/15 pt-6 sm:mt-18 sm:pt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 sm:text-xs">
              Copyright {year}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 sm:text-xs">
              Need a help in website dm me{" "}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/50 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {personal.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
