"use client";

import { type ReactNode } from "react";
import { CursorProvider } from "@/lib/cursor-context";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/contact/Contact";
import { SiteShell } from "@/components/ui/PageTransition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CursorProvider>
      <CustomCursor />
      <SiteShell>
        <Navigation />
        {children}
        <Footer />
      </SiteShell>
    </CursorProvider>
  );
}
