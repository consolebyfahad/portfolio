"use client";

import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import { springSnappy } from "../lib/motion";

export default function Header() {
  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-shell flex items-center justify-between py-7 lg:py-8">
        <motion.a
          href="#contact"
          className="btn-outline-light"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springSnappy}
        >
          Book a Call
        </motion.a>

        <nav className="flex items-center gap-6 sm:gap-10" aria-label="Top links">
          <span className="text-[15px] font-medium text-white/90 sm:text-base">Looplex</span>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="View LinkedIn Profile"
            className="text-[15px] font-medium text-white/90 transition-opacity hover:opacity-60 sm:text-base"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
