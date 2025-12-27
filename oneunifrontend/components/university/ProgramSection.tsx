"use client";

import { motion } from "framer-motion";

interface ProgramSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProgramSection({ title, children }: ProgramSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-text-main">{title}</h3>
      {children}
    </div>
  );
}
