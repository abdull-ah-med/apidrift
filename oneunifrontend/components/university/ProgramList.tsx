"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, ChevronRight, GraduationCap, BookOpen, Clock, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Select from "../ui/select";

interface Program {
  id: string;
  name: string;
  duration: string;
  type: string;
}

interface Department {
  name: string;
  programs: Program[];
}

interface ProgramListProps {
  departments: Department[];
}

export function ProgramList({ departments }: ProgramListProps) {
  const params = useParams();
  const universityId = params.id as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [activeDept, setActiveDept] = useState<string>(departments[0]?.name || "");

  // Filter logic
  const filteredDepartments = departments.map(dept => ({
    ...dept,
    programs: dept.programs.filter(prog => 
      (selectedType === "All" || prog.type === selectedType) &&
      (prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(dept => dept.programs.length > 0);

  // Auto-select first available department if current active one is filtered out
  useEffect(() => {
    if (filteredDepartments.length > 0) {
      const currentExists = filteredDepartments.find(d => d.name === activeDept);
      if (!currentExists) {
        setActiveDept(filteredDepartments[0].name);
      }
    }
  }, [searchQuery, selectedType, filteredDepartments, activeDept]);

  const currentDeptData = filteredDepartments.find(d => d.name === activeDept);
  const programTypes = ["All", "BS", "MS", "PhD"];

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-text-main mb-2">Academic Programs</h2>
          <p className="text-text-body">Browse our comprehensive catalog of degrees and courses.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Type Filter */}
          <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
            {programTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all",
                  selectedType === type 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-text-body hover:text-text-main"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      {filteredDepartments.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar (Departments List) - Hidden on Mobile, Visible on Desktop */}
          <div className="hidden lg:block w-full lg:w-1/4 lg:sticky lg:top-24 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-3">Departments</h3>
            {filteredDepartments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => setActiveDept(dept.name)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group",
                  activeDept === dept.name
                    ? "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/20"
                    : "text-text-body hover:bg-slate-50 hover:text-text-main"
                )}
              >
                <span className="line-clamp-1">{dept.name}</span>
                {activeDept === dept.name && (
                  <motion.div layoutId="activeIndicator" className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Department Selector (Dropdown style) */}
          <div className="lg:hidden w-full">
            <Select
              label="Select Department"
              value={activeDept}
              onChange={(e) => setActiveDept(e.target.value)}
              options={filteredDepartments.map((dept) => ({
                label: dept.name,
                value: dept.name,
              }))}
            />
          </div>

          {/* Right Panel (Programs Grid) */}
          <div className="w-full lg:w-3/4 min-h-[500px]">
            {currentDeptData && (
              <motion.div
                key={currentDeptData.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main">{currentDeptData.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDeptData.programs.map((prog, idx) => (
                    <Link 
                      key={prog.id} 
                      href={`/student/university/${universityId}/programs/${prog.id}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={cn(
                            "text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border",
                            prog.type === 'BS' ? 'bg-primary/5 text-primary border-primary/10' :
                            prog.type === 'MS' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                            'bg-slate-100 text-text-body border-slate-200'
                          )}>
                            {prog.type}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted bg-slate-50 px-2 py-1 rounded-md">
                            <Clock size={14} />
                            {prog.duration}
                          </div>
                        </div>
                        
                        <h4 className="font-bold text-text-main text-lg mb-2 group-hover:text-primary transition-colors">
                          {prog.name}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-sm text-text-muted group-hover:text-primary transition-colors mt-4">
                          <span>View Details</span>
                          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <div className="inline-flex p-4 bg-white rounded-full text-text-muted mb-4 shadow-sm">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-medium text-text-main">No programs found</h3>
          <p className="text-text-muted mt-1">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => {setSearchQuery(""); setSelectedType("All");}}
            className="mt-6 text-primary font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
