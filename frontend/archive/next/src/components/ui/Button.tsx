"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "teal";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type={type}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "px-3.5 py-2 text-sm",
        size === "md" && "px-5 py-3 text-sm",
        size === "lg" && "px-6 py-3.5 text-base",
        variant === "primary" &&
          "bg-[linear-gradient(135deg,#E0311F,#9B1B1F)] text-white shadow-[0_12px_28px_rgba(224,49,31,0.28)]",
        variant === "secondary" &&
          "bg-white text-ink border border-[rgba(20,20,20,0.08)]",
        variant === "ghost" && "bg-transparent text-ink",
        variant === "teal" &&
          "bg-[linear-gradient(135deg,#0D9488,#14B8A6)] text-white shadow-[0_12px_28px_rgba(13,148,136,0.28)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
