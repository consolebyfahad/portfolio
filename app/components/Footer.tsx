"use client";

import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import Magnetic from "./motion/Magnetic";
import { easeOut, viewportOnce } from "../lib/motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const emailHref = `mailto:${personal.email}`;
  const whatsappHref = `https://wa.me/${personal.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi Fahad, I want to contact you."
  )}`;

  return (
    <footer id="lets-talk" className="relative scroll-mt-8 bg-[#050505] pb-10 pt-0 sm:pb-12">
      <motion.h2
        className="font-display w-full px-2 text-center text-[clamp(1rem,15vw,21rem)] leading-[0.78] tracking-[0.01em] text-[#dedcd3] sm:px-3"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={easeOut}
      >
        Let&apos;s Talk
      </motion.h2>

      <div className="site-shell">
        <motion.div
          className="mt-14 flex flex-col gap-12 sm:mt-20 lg:mt-24 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...easeOut, delay: 0.1 }}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-white/85 sm:text-sm">
              Have a project in mind? I&apos;m open to web and mobile work — drop me a line.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-white/85 sm:text-sm">
              <Magnetic>
                <a
                  href={emailHref}
                  data-cursor-box="true"
                  className="text-btn underline decoration-transparent underline-offset-[6px]"
                >
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </div>

          <nav className="flex items-center gap-8 sm:gap-10" aria-label="Social links">
            <Magnetic>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-box="true"
                className="text-btn text-lg font-semibold sm:text-xl"
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-box="true"
                className="text-btn text-lg font-semibold sm:text-xl"
              >
                GitHub
              </a>
            </Magnetic>
          </nav>
        </motion.div>

        <div className="mt-14 border-t border-white/15 pt-6 sm:mt-18 sm:pt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 sm:text-xs">
              © {year} {personal.name}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 sm:text-xs">
              Want to chat? Message me on WhatsApp —{" "}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-box="true"
                className="text-btn underline decoration-white/50 underline-offset-4"
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
