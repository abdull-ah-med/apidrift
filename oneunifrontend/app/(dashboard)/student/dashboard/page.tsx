"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UniversityTab } from "@/components/student/dashboard/UniversityTab";
import { ProgramTab } from "@/components/student/dashboard/ProgramTab";
import { cn } from "@/lib/utils";

type TabType = "universities" | "programs";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("universities");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Find Your Dream University</h1>
          <p className="text-slate-600 mt-2">Explore top universities tailored to your future.</p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6 flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("universities")}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors relative",
              activeTab === "universities" 
                ? "text-primary" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Universities
            {activeTab === "universities" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("programs")}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors relative",
              activeTab === "programs" 
                ? "text-primary" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Programs
            {activeTab === "programs" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "universities" ? <UniversityTab /> : <ProgramTab />}
        </div>
      </div>
    </div>
  );
}
