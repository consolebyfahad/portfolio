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

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="scroll-to-top-btn fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={springSnappy}
          whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,1)", color: "#050505" }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowIcon variant="up" size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
