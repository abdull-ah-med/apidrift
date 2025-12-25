"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ProgramTabsProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (id: any) => void;
}

export function ProgramTabs({ tabs, activeTab, onTabChange }: ProgramTabsProps) {
  return (
    <div className="w-full lg:w-1/4 space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-bold transition-all",
            activeTab === tab.id
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
              : "bg-white text-text-body hover:bg-slate-50 border border-slate-200"
          )}
        >
          <tab.icon size={20} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
