"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { hero, socials } from "@/lib/content";
import { AnimatedLink, MagneticButton } from "@/components/ui/primitives";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const gridX = useTransform(sx, [-1, 1], ["2%", "-2%"]);
  const gridY = useTransform(sy, [-1, 1], ["2%", "-2%"]);

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
      onMouseMove={(e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        mx.set(nx);
        my.set(ny);
      }}
    >
      <motion.div
        className="grid-bg pointer-events-none absolute inset-[-10%] opacity-70"
        style={{ x: gridX, y: gridY }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="meta text-accent"
        >
          {hero.status}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="font-display text-lg text-foreground md:text-xl"
        >
          {hero.brand}
        </motion.p>

        <h1 className="font-display max-w-3xl text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.headline.map((line, i) => (
            <motion.span
              key={line}
              className="block overflow-hidden"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.28 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78 }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={hero.primaryCta.href}>
            {hero.primaryCta.label}
            <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href={hero.secondaryCta.href} variant="ghost">
            {hero.secondaryCta.label}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="flex gap-5"
        >
          {socials
            .filter((s) => s.label === "GitHub" || s.label === "LinkedIn")
            .map((s) => (
              <AnimatedLink key={s.href} href={s.href} external>
                {s.label}
              </AnimatedLink>
            ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Link
          href="/about"
          className="meta absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.6rem] md:flex"
        >
          <span className="relative h-10 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 h-4 bg-accent"
              animate={{ y: ["-100%", "220%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Explore
        </Link>
      </motion.div>
    </section>
  );
}
