"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { DollarSign, Calendar, GraduationCap } from "lucide-react";

interface FeeData {
  semester: string;
  year: string;
  degree: string;
}

interface FeeStructureProps {
  fees: FeeData;
}

export function FeeStructure({ fees }: FeeStructureProps) {
  const [activeTab, setActiveTab] = useState<keyof FeeData>("semester");

  const tabs = [
    { id: "semester", label: "Per Semester", icon: Calendar },
    { id: "year", label: "Per Year", icon: DollarSign },
    { id: "degree", label: "Full Degree", icon: GraduationCap },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-text-main mb-4">Fee Structure (Average)</h3>
        <div className="flex p-1 bg-slate-100 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof FeeData)}
                className={clsx(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-text-muted hover:text-text-body"
                )}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="p-8 flex items-center justify-center bg-slate-50/50 min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <p className="text-sm text-text-muted mb-1 uppercase tracking-wider font-medium">
              Estimated Cost
            </p>
            <h4 className="text-4xl font-bold text-text-main">
              {fees[activeTab]}
            </h4>
            <p className="text-xs text-text-muted mt-2">
              *Excluding taxes and additional charges
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
