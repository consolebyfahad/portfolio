"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { navLinks, personal } from "../data/portfolio";
import SocialLinks from "./SocialLinks";
import { fadeUp, springSnappy } from "../lib/motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md"
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={springSnappy}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="font-[family-name:var(--font-syne)] text-xl font-extrabold tracking-tight text-foreground"
            aria-label="Home"
          >
            {personal.initials}
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium text-muted"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SocialLinks className="hidden items-center gap-3 sm:flex" />
          <motion.button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="border-t border-card-border bg-background px-6 py-4 md:hidden"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.ul
              className="flex flex-col gap-4 overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={fadeUp}>
                  <a
                    href={link.href}
                    className="block text-base font-medium text-muted transition-colors hover:text-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-4 border-t border-card-border pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SocialLinks className="flex items-center gap-3" />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
