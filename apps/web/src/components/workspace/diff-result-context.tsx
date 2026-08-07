"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DiffResult } from "@/lib/apidrift/types";

type DiffContextValue = {
  result: DiffResult | null;
  setResult: (result: DiffResult | null) => void;
};

const DiffContext = createContext<DiffContextValue | null>(null);

export function DiffResultProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<DiffResult | null>(null);
  const value = useMemo(() => ({ result, setResult }), [result]);
  return <DiffContext.Provider value={value}>{children}</DiffContext.Provider>;
}

export function useDiffResult() {
  const ctx = useContext(DiffContext);
  if (!ctx) {
    throw new Error("useDiffResult must be used within DiffResultProvider");
  }
  return ctx;
}
