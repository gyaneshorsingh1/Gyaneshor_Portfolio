"use client";

import { useEffect, useRef } from "react";
import { about } from "@/lib/content";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/primitives";

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(".about-line", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
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
      className="relative px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title={about.statement} />
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <p className="about-line meta max-w-xs text-accent">
            Backend Developer · Software Engineer
          </p>
          <div className="space-y-8">
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="about-line max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
