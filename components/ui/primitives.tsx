"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/lib/cursor-context";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost" | "link";
  external?: boolean;
  cursorLabel?: string;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  external,
  cursorLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const { setHovering, setLabel } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
    setLabel(null);
  };

  const onEnter = () => {
    setHovering(true);
    if (cursorLabel) setLabel(cursorLabel);
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-colors duration-300",
    variant === "primary" &&
      "border border-accent/40 bg-accent-soft text-foreground hover:border-accent hover:bg-accent/20",
    variant === "ghost" &&
      "border border-border bg-transparent text-foreground hover:border-accent/50 hover:bg-accent-soft",
    variant === "link" &&
      "rounded-none border-0 bg-transparent px-0 py-0 text-muted underline-offset-4 hover:text-foreground hover:underline",
    className,
  );

  const shared = {
    ref: ref as never,
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onMouseEnter: onEnter,
    className: classes,
  };

  if (href && !external && isInternalHref(href)) {
    return (
      <MotionLink {...shared} href={href} onClick={onClick}>
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...shared} type={type} onClick={onClick}>
      {children}
    </motion.button>
  );
}

export function AnimatedLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const { setHovering } = useCursor();
  const classes = cn(
    "group relative inline-flex text-sm text-muted transition-colors hover:text-foreground",
    className,
  );
  const handlers = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };

  const inner = (
    <>
      <span>{children}</span>
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </>
  );

  if (!external && isInternalHref(href)) {
    return (
      <Link href={href} className={classes} {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classes}
      {...handlers}
    >
      {inner}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="meta mb-4 text-accent">{eyebrow}</p>
      <h2 className="font-display max-w-3xl text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
