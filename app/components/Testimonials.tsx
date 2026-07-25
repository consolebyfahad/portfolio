"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { testimonials } from "../data/portfolio";
import { easeOut, viewportOnce } from "../lib/motion";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-testimonial-card]");
    const amount = card ? card.offsetWidth + 24 : 360;
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="testimonials" className="site-section relative overflow-hidden bg-[#050505]">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={easeOut}
          className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="section-display">Testimonials</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:bg-white hover:text-black"
              aria-label="Scroll testimonials left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:bg-white hover:text-black"
              aria-label="Scroll testimonials right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ ...easeOut, delay: 0.08 }}
        ref={scrollerRef}
        className="testimonial-scroller flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-1600px)/2+1.25rem))] pb-4 scroll-smooth sm:gap-7 sm:px-[max(2rem,calc((100vw-1600px)/2+2rem))] lg:px-[max(4rem,calc((100vw-1600px)/2+4rem))]"
      >
        {testimonials.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            data-testimonial-card
            className="group flex w-[min(85vw,380px)] shrink-0 snap-start flex-col justify-between rounded-3xl border border-white/12 bg-white/[0.03] p-7 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:w-[420px] sm:p-9"
          >
            <div>
              <p className="font-display text-5xl leading-none text-white/25">“</p>
              <p className="mt-4 text-base leading-relaxed text-[#dedcd3]/90 sm:text-lg">
                {item.quote}
              </p>
            </div>
            <div className="mt-10 border-t border-white/10 pt-5">
              <p className="font-display text-2xl tracking-wide text-[#dedcd3]">{item.name}</p>
              <p className="mt-1 text-sm text-white/50">
                {item.role} · {item.company}
              </p>
            </div>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
