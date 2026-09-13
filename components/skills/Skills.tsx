"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/content";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/primitives";
import { useCursor } from "@/lib/cursor-context";

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { setHovering } = useCursor();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(".skill-chip", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border px-6 py-24 md:px-8 md:py-32"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPointer({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <div
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-accent/10 blur-3xl transition-transform duration-300"
        style={{
          transform: `translate(${pointer.x - 128}px, ${pointer.y - 128}px)`,
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I use to design and ship systems."
        />

        <div className="space-y-14">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="meta mb-6">{group.label}</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    className="skill-chip font-display cursor-default border border-border bg-surface/60 px-5 py-3 text-lg text-foreground transition-colors duration-300 hover:border-accent/50 hover:text-accent md:text-2xl"
                    whileHover={{ y: -4, scale: 1.03 }}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
