"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 400, x: "10%", y: "15%", color: "rgba(200, 245, 66, 0.07)", duration: 18 },
  { size: 300, x: "75%", y: "10%", color: "rgba(200, 245, 66, 0.05)", duration: 22 },
  { size: 500, x: "60%", y: "60%", color: "rgba(100, 200, 255, 0.04)", duration: 25 },
  { size: 250, x: "5%", y: "70%", color: "rgba(200, 245, 66, 0.06)", duration: 20 },
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
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
            y: [0, -40, 20, 0],
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
