"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "../icons/ArrowIcon";
import { springSnappy } from "../../lib/motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const nearBottom = scrollTop + viewportHeight >= docHeight - 120;
      const scrolledEnough = scrollTop > 300;

      setVisible(nearBottom && scrolledEnough);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="scroll-to-top-btn fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-accent text-background shadow-lg shadow-accent/20"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={springSnappy}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(200, 245, 66, 0.35)",
          }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowIcon variant="up" size={22} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
