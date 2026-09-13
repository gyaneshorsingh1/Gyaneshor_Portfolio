"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollSculpture = dynamic(
  () =>
    import("@/components/three/ScrollSculpture").then((m) => m.ScrollSculpture),
  { ssr: false },
);

export function HomeScrollScene() {
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mobile.matches || motion.matches);
    sync();
    mobile.addEventListener("change", sync);
    motion.addEventListener("change", sync);

    try {
      const canvas = document.createElement("canvas");
      setWebgl(
        !!(
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        ),
      );
    } catch {
      setWebgl(false);
    }

    return () => {
      mobile.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  if (!webgl) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] bg-[radial-gradient(ellipse_at_70%_40%,rgba(126,200,216,0.08),transparent_55%)]"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      <div
        className={
          reduced
            ? "absolute inset-y-[18%] right-[-12%] w-[78%] opacity-35 md:inset-y-0 md:right-0 md:w-[52%] md:opacity-55"
            : "absolute inset-y-0 right-0 w-full opacity-70 md:w-[56%] md:opacity-85"
        }
        style={{
          maskImage:
            "linear-gradient(to left, black 38%, rgba(0,0,0,0.45) 68%, transparent 96%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 38%, rgba(0,0,0,0.45) 68%, transparent 96%)",
        }}
      >
        <ScrollSculpture reduced={reduced} />
      </div>
    </div>
  );
}
