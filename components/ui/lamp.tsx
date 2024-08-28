"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MiniLamp = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-12 w-full items-center justify-center overflow-visible",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-12 bg-slate-950 rounded-full overflow-hidden">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-radial from-cyan-500 to-transparent"
        />
      </div>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-6 left-0 right-0 h-64 bg-gradient-to-b from-cyan-500/50 to-transparent pointer-events-none"
      />
    </div>
  );
};