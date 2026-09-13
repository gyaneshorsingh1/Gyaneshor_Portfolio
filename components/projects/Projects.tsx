"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/content";
import { gsap, registerGsap } from "@/lib/gsap";
import { MagneticButton, SectionHeading } from "@/components/ui/primitives";
import { useCursor } from "@/lib/cursor-context";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setHovering, setLabel } = useCursor();

  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const panels = gsap.utils.toArray<HTMLElement>(".project-sticky");

          panels.forEach((panel, i) => {
            const inner = panel.querySelector(".project-inner");
            const media = panel.querySelector(".project-media");
            const copy = panel.querySelector(".project-copy");
            const isLast = i === panels.length - 1;
            const next = panels[i + 1];

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top top",
                end: "+=110%",
                scrub: 0.65,
                pin: true,
                pinSpacing: isLast,
                anticipatePin: 1,
                onRefresh(self) {
                  const pin = self.pin as HTMLElement | undefined;
                  if (!pin) return;
                  pin.style.zIndex = String(i + 1);
                  if (pin.parentElement) {
                    pin.parentElement.style.zIndex = String(i + 1);
                  }
                },
              },
            });

            tl.fromTo(
              media,
              { scale: 1.12, filter: "brightness(0.72)" },
              { scale: 1, filter: "brightness(1)", ease: "none" },
              0,
            ).fromTo(
              copy,
              { y: 48, opacity: 0.35 },
              { y: 0, opacity: 1, ease: "none" },
              0,
            );

            if (next && inner) {
              gsap.fromTo(
                inner,
                { opacity: 1 },
                {
                  opacity: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: next,
                    start: "top bottom",
                    end: "top 18%",
                    scrub: 0.5,
                  },
                },
              );
            }
          });
        }, sectionRef);

        return () => ctx.revert();
      },
    );

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".project-sticky").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".project-media, .project-copy"), {
            y: 36,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">
      <div className="mx-auto max-w-6xl px-6 pt-28 md:px-8 md:pt-36">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work across backend systems and product experiences."
        />
      </div>

      <div className="relative">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-sticky relative flex min-h-[100svh] items-center bg-transparent px-6 py-16 md:px-8"
            style={{ zIndex: index + 1 }}
            onMouseEnter={() => {
              setHovering(true);
              setLabel(project.cursorLabel);
            }}
            onMouseLeave={() => {
              setHovering(false);
              setLabel(null);
            }}
          >
            <div className="project-inner mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
              <a
                href={project.href || "/contact"}
                target={project.href ? "_blank" : undefined}
                rel={project.href ? "noopener noreferrer" : undefined}
                className="project-media group relative block aspect-[16/10] overflow-hidden border border-border bg-surface"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  unoptimized
                  priority={index === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
              </a>

              <div className="project-copy relative bg-gradient-to-l from-background/70 via-background/25 to-transparent md:pl-4">
                <p className="meta mb-4 text-accent">
                  {String(index + 1).padStart(2, "0")}
                  {project.company ? ` · ${project.company}` : ""}
                </p>
                <h3 className="font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {project.href ? (
                    <MagneticButton
                      href={project.href}
                      external
                      variant="ghost"
                      cursorLabel={project.cursorLabel}
                    >
                      View Project <span aria-hidden>↗</span>
                    </MagneticButton>
                  ) : (
                    <MagneticButton href="/contact" variant="ghost">
                      Discuss this work <span aria-hidden>→</span>
                    </MagneticButton>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
