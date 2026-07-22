"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import Header from "./Header";
import { easeOut, popUpSpring, viewportHero } from "../lib/motion";

export default function Hero() {
  return (
    <section className="hero-stage relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-smoke" aria-hidden="true" />
      <div className="hero-smoke-drift" aria-hidden="true" />

      <Header />

      <div className="relative z-10 flex flex-1 flex-col justify-between pb-12 pt-28 sm:pb-16 lg:pb-20 lg:pt-32">
        <div className="site-shell relative flex flex-1 items-center justify-center py-8 sm:py-12">
          <motion.h1
            className="hero-name pointer-events-none relative -top-12 select-none text-center sm:-top-16 md:-top-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block">Fahad</span>
            <span className="block">Ur Rehman</span>
          </motion.h1>

          <motion.div
            className="hero-portrait absolute left-1/2 top-[68%] z-20 -translate-x-1/2 -translate-y-1/2 sm:top-[85%]"
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...popUpSpring, delay: 0.2 }}
          >
            <button
              type="button"
              className="hero-portrait-frame group relative block aspect-square w-[min(42vw,200px)] overflow-hidden rounded-[1.75rem] bg-[#2a2a2a] outline-none sm:w-[250px] md:w-[300px] lg:w-[340px]"
              aria-label={`${personal.name} portrait — hover to view in color`}
            >
              <Image
                src={personal.profileImage}
                alt={`${personal.name} portrait`}
                fill
                priority
                sizes="(max-width: 768px) 200px, 340px"
                className="hero-portrait-img object-cover object-top"
              />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="site-shell grid gap-10 sm:grid-cols-2 sm:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportHero}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
          }}
        >
          <motion.p
            className="hero-blurb"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: easeOut },
            }}
          >
            I currently work as a Frontend Engineer at{" "}
            <span className="underline decoration-white/40 underline-offset-4">
              {personal.company}
            </span>
            , currently available for work.
          </motion.p>
          <motion.p
            className="hero-blurb sm:ml-auto sm:text-right"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: easeOut },
            }}
          >
            Focused on interfaces and experiences, working remotely from{" "}
            {personal.location}.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
