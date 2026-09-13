import { Hero } from "@/components/hero/Hero";
import { Experience } from "@/components/experience/Experience";
import { Projects } from "@/components/projects/Projects";
import { HomeScrollScene } from "@/components/three/HomeScrollScene";

export default function HomePage() {
  return (
    <main className="relative">
      <HomeScrollScene />
      <div className="relative z-10">
        <Hero />
        <div className="border-t border-border">
          <Experience />
        </div>
        <div className="border-t border-border">
          <Projects />
        </div>
      </div>
    </main>
  );
}
