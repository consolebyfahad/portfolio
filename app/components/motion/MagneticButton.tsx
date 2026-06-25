"use client";

import { motion } from "framer-motion";
import ArrowIcon from "../icons/ArrowIcon";
import { springSnappy } from "../../lib/motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  showArrow?: boolean;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  external = false,
  showArrow = true,
}: MagneticButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-outline";

  const motionProps = {
    whileHover: {
      scale: 1.04,
      y: -3,
      ...(variant === "primary"
        ? { backgroundColor: "transparent", color: "var(--accent)" }
        : { borderColor: "var(--accent)", color: "var(--accent)" }),
    },
    whileTap: { scale: 0.97 },
    transition: springSnappy,
    className: `${baseClass} group ${className}`,
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
          <ArrowIcon variant={external ? "external" : "right"} size={16} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        {...motionProps}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}
