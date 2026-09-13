"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/lib/cursor-context";

export function CustomCursor() {
  const { hovering, label } = useCursor();
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 28 });
  const springY = useSpring(y, { stiffness: 380, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.documentElement.classList.add("cursor-none-desktop");

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const expanded = hovering || Boolean(label);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-white/80 transition-all duration-300"
        style={{
          width: expanded ? (label ? 72 : 40) : 12,
          height: expanded ? (label ? 72 : 40) : 12,
          background: expanded ? "rgba(255,255,255,0.12)" : "white",
        }}
      >
        {label ? (
          <span className="text-[10px] font-medium tracking-[0.2em] text-white">
            {label}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
