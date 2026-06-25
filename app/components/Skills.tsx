"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import SectionHeading from "./motion/SectionHeading";
import Tilt3D from "./motion/Tilt3D";
import { popUp, staggerFast, popUpSpring, viewportOnce } from "../lib/motion";

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="relative py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Expertise" title="I'm Good At This" align="center" />

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerFast}
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={popUp} transition={popUpSpring}>
              <Tilt3D intensity={18}>
                <motion.div
                  className="group flex flex-col items-center gap-3 rounded-xl border border-card-border bg-card/80 p-5 backdrop-blur-sm"
                  whileHover={{
                    borderColor: "rgba(200, 245, 66, 0.5)",
                    boxShadow: "0 20px 40px rgba(200, 245, 66, 0.08)",
                  }}
                  title={skill.name}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                  </motion.div>
                  <span className="text-xs font-semibold tracking-wide text-muted group-hover:text-foreground">
                    {skill.name}
                  </span>
                </motion.div>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
