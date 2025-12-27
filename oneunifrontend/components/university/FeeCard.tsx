"use client";

import { cn } from "@/lib/utils";

interface FeeCardProps {
  label: string;
  amount: string;
  subtext: string;
  highlight?: boolean;
}

export function FeeCard({ label, amount, subtext, highlight = false }: FeeCardProps) {
  return (
    <div className={cn(
      "p-6 border rounded-2xl shadow-sm transition-all",
      highlight 
        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
        : "bg-white border-slate-200 text-text-main"
    )}>
      <p className={cn(
        "text-sm font-bold uppercase mb-2",
        highlight ? "text-white/70" : "text-text-muted"
      )}>{label}</p>
      <p className="text-3xl font-black">{amount}</p>
      <p className={cn(
        "text-xs mt-2",
        highlight ? "text-white/70" : "text-text-muted"
      )}>{subtext}</p>
    </div>
  );
}
