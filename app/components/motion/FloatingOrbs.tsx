"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 480, x: "8%", y: "20%", color: "rgba(255, 255, 255, 0.04)", duration: 22 },
  { size: 360, x: "70%", y: "10%", color: "rgba(255, 255, 255, 0.035)", duration: 26 },
  { size: 520, x: "50%", y: "60%", color: "rgba(255, 255, 255, 0.03)", duration: 30 },
];

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 25, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
