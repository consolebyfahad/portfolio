"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import Tilt3D from "./motion/Tilt3D";
import MagneticButton from "./motion/MagneticButton";
import {
  slideInLeft,
  popUp,
  heroStagger,
  easeOut,
  popUpSpring,
  viewportHero,
} from "../lib/motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <motion.div
        className="hero-glow -top-20 right-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="hero-glow bottom-0 left-0 opacity-50"
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
        {/* Text — slides in from left */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportHero}
          variants={heroStagger}
        >
          <motion.p className="text-lg text-muted" variants={slideInLeft} transition={easeOut}>
            Hi!{" "}
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, rotate: -20, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ ...popUpSpring, delay: 0.9 }}
              className="inline-block"
            >
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block"
              >
                ✌🏼
              </motion.span>
            </motion.span>
          </motion.p>
          <motion.p
            className="text-sm font-medium uppercase tracking-widest text-muted"
            variants={slideInLeft}
            transition={easeOut}
          >
            my name is
          </motion.p>
          <motion.h1
            className="font-[family-name:var(--font-syne)] text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
            variants={slideInLeft}
            transition={easeOut}
          >
            <span className="gradient-text">{personal.name}</span>
          </motion.h1>
          <motion.p
            className="font-[family-name:var(--font-syne)] text-xl font-semibold text-accent sm:text-2xl"
            variants={slideInLeft}
            transition={easeOut}
          >
            {personal.tagline}
          </motion.p>
          <motion.p
            className="max-w-lg text-base leading-relaxed text-muted sm:text-lg"
            variants={slideInLeft}
            transition={easeOut}
          >
            {personal.bio}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            variants={slideInLeft}
            transition={easeOut}
          >
            <MagneticButton href="#contact">Get in Touch</MagneticButton>
            <MagneticButton href={personal.github} variant="outline" external>
              View GitHub
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Profile — pop-up from below with spring */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={viewportHero}
          variants={popUp}
          transition={{ ...popUpSpring, delay: 0.35 }}
        >
          <Tilt3D float intensity={16} className="relative">
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                className="absolute -inset-4 rounded-full bg-accent/10 blur-2xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={viewportHero}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              />
              <motion.div
                className="relative h-72 w-72 overflow-hidden rounded-full border-2 border-card-border sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                style={{ transform: "translateZ(40px)" }}
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={popUpSpring}
                viewport={viewportHero}
              >
                <Image
                  src={personal.profileImage}
                  alt={`${personal.name} profile photo`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </motion.div>
              <motion.div
                className="absolute -inset-1 rounded-full border border-accent/20"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportHero}
                transition={{ duration: 0.7, delay: 0.55 }}
                style={{ transform: "translateZ(20px)" }}
              >
                <motion.div
                  className="h-full w-full rounded-full border border-accent/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </Tilt3D>
        </motion.div>
      </div>
    </section>
  );
}
