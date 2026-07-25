"use client";

import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import Magnetic from "./motion/Magnetic";
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
        <Magnetic>
          <motion.a
            href="#lets-talk"
            className="btn-outline-light"
            data-cursor-box="true"
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            Book a Call
          </motion.a>
        </Magnetic>

        <nav className="flex items-center gap-6 sm:gap-10" aria-label="Top links">
          <Magnetic>
            <span className="text-btn text-[15px] font-medium sm:text-base" data-cursor-box="true">
              Looplex
            </span>
          </Magnetic>
          <Magnetic>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-box="true"
              className="text-btn text-[15px] font-medium sm:text-base"
            >
              LinkedIn
            </a>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  );
}
