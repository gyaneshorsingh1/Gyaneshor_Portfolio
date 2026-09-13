import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { PageFrame } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "About | Gyaneshor Singh",
  description:
    "Backend Developer and Software Engineer focused on building useful, reliable systems.",
};

export default function AboutPage() {
  return (
    <main>
      <PageFrame>
        <About />
        <Skills />
      </PageFrame>
    </main>
  );
}
