import type { Metadata } from "next";
import { Projects } from "@/components/projects/Projects";
import { PageFrame } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Projects | Gyaneshor Singh",
  description:
    "Selected work including Sajilo Scale, MaaSparsh, and Rare Robo.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageFrame>
        <Projects />
      </PageFrame>
    </main>
  );
}
