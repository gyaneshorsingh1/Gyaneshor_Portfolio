"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/lib/content";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/primitives";

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(".exp-item", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
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
        <SectionHeading
          eyebrow="Experience"
          title="Currently building production backend systems."
        />

        <div className="relative border-l border-border pl-8 md:pl-12">
          {experience.map((item) => (
            <article key={item.role} className="exp-item relative pb-4">
              <span className="absolute top-1.5 -left-[2.05rem] h-3 w-3 rounded-full border border-accent bg-background md:-left-[3.05rem]" />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="font-display text-2xl md:text-3xl">{item.role}</h3>
                <span className="meta text-accent">{item.duration}</span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {item.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
