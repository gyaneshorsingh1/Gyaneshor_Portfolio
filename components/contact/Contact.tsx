"use client";

import { FormEvent, useState } from "react";
import { site, socials } from "@/lib/content";
import {
  AnimatedLink,
  MagneticButton,
  SectionHeading,
} from "@/components/ui/primitives";

export function Contact() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setStatus("");

    try {
      const data = new FormData(form);
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
      });
      const text = await res.text();
      setStatus(text || "Message sent.");
      form.reset();
      window.setTimeout(() => setStatus(""), 5000);
    } catch {
      setStatus("Something went wrong. Please email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something reliable together."
          />
          <div className="space-y-3 text-sm text-muted">
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${site.phone}`}
                className="transition-colors hover:text-foreground"
              >
                {site.phone}
              </a>
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {socials.map((s) => (
                <AnimatedLink key={s.href} href={s.href} external>
                  {s.label}
                </AnimatedLink>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {status ? (
            <p className="text-sm text-accent" role="status">
              {status}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="fname"
              placeholder="First Name"
              className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-2 focus:border-accent"
            />
            <input
              required
              name="lname"
              placeholder="Last Name"
              className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-2 focus:border-accent"
            />
          </div>
          <input
            required
            name="number"
            type="tel"
            placeholder="Mobile number"
            className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-2 focus:border-accent"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-2 focus:border-accent"
          />
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Message"
            className="w-full resize-y border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-2 focus:border-accent"
          />
          <MagneticButton type="submit" className="!rounded-full">
            {submitting ? "Submitting..." : "Submit"}
          </MagneticButton>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Backend Developer.
        </p>
        <p className="meta">{site.domains.join(" · ")}</p>
      </div>
    </footer>
  );
}
