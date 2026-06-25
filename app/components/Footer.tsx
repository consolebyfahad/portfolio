"use client";

import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import SocialLinks from "./SocialLinks";
import FadeIn from "./motion/FadeIn";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FadeIn>
      <footer className="relative border-t border-card-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <motion.p
            className="text-sm text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {year} {personal.name}. All rights reserved.
          </motion.p>
          <SocialLinks className="flex items-center gap-3" />
        </div>
      </footer>
    </FadeIn>
  );
}
