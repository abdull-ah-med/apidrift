"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UniversityTab } from "@/components/student/dashboard/UniversityTab";
import { ProgramTab } from "@/components/student/dashboard/ProgramTab";
import { cn } from "@/lib/utils";

import { Sparkles, GraduationCap } from "lucide-react";

type TabType = "universities" | "programs";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("universities");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-12 md:px-12 md:py-16 mb-10 shadow-xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 shadow-sm">
                <Sparkles size={14} className="text-yellow-300" />
                <span>Admissions Open for Fall 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                Shape Your Future <br/> with <span className="text-blue-200">OneUni</span>
              </h1>
              
              <p className="text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed">
                Discover top-ranked universities and diverse programs tailored to your career goals.
              </p>
            </div>

            {/* Right Side Decoration (Optional) */}
            <div className="hidden lg:block relative">
               <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl rotate-12 flex items-center justify-center border border-white/20 shadow-2xl">
                  <GraduationCap size={48} className="text-white" />
               </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mb-8">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab("universities")}
              className={cn(
                "px-6 py-2.5 text-sm font-medium rounded-lg transition-all relative z-10",
                activeTab === "universities" 
                  ? "text-primary bg-blue-50 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              Universities
              {activeTab === "universities" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-lg bg-blue-50 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("programs")}
              className={cn(
                "px-6 py-2.5 text-sm font-medium rounded-lg transition-all relative z-10",
                activeTab === "programs" 
                  ? "text-primary bg-blue-50 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              Programs
              {activeTab === "programs" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-lg bg-blue-50 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "universities" ? <UniversityTab /> : <ProgramTab />}
        </div>
      </div>
    </div>
  );
}
