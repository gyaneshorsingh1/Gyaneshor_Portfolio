import type { Metadata } from "next";
import { Experience } from "@/components/experience/Experience";
import { PageFrame } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Experience | Gyaneshor Singh",
  description:
    "Currently working as a Backend Developer, building production APIs and backend systems.",
};

export default function ExperiencePage() {
  return (
    <main>
      <PageFrame>
        <Experience />
      </PageFrame>
    </main>
  );
}
