"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CursorState = {
  label: string | null;
  hovering: boolean;
  setLabel: (label: string | null) => void;
  setHovering: (hovering: boolean) => void;
};

const CursorContext = createContext<CursorState | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  const value = useMemo(
    () => ({ label, hovering, setLabel, setHovering }),
    [label, hovering],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return ctx;
}
