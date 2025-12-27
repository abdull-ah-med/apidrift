"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardFilters } from "@/components/student/dashboard/DashboardFilters";
import { ProgramCard } from "@/components/student/dashboard/ProgramCard";
import { universityData } from "@/lib/data/mock-university";
import { listAnimations } from "@/lib/config/animation";

// Mocking multiple universities (same as in UniversityTab)
const universities = [
  universityData,
  { ...universityData, name: "COMSATS University", logo: "/Logo/OneUniN.png", location: "Islamabad", fees: { ...universityData.fees, semester: "PKR 120,000" } },
  { ...universityData, name: "LUMS", logo: "/Logo/OneUniL.png", location: "Lahore", fees: { ...universityData.fees, semester: "PKR 450,000" } },
  { ...universityData, name: "FAST NUCES", logo: "/Logo/OneUniN.png", location: "Islamabad", fees: { ...universityData.fees, semester: "PKR 160,000" } },
];

// Flatten programs
const allPrograms = universities.flatMap(uni => 
  uni.departments.flatMap(dept => 
    dept.programs.map(prog => ({
      ...prog,
      universityName: uni.name,
      universityLogo: uni.logo,
      universityId: uni.name.toLowerCase().replace(/\s+/g, "-"),
      location: uni.location,
      fee: uni.fees.semester, // Using semester fee as proxy
      ranking: uni.ranking
    }))
  )
);

export function ProgramTab() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    program: "",
    sortBy: "",
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      city: "",
      program: "",
      sortBy: "",
    });
  };

  const parseFee = (feeString: string) => {
    return parseInt(feeString.replace(/[^0-9]/g, "")) || 0;
  };

  const filteredPrograms = useMemo(() => {
    let result = allPrograms.filter((prog) => {
      // Search (Program Name or University Name)
      if (filters.search && 
          !prog.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !prog.universityName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      // City
      if (filters.city && !prog.location.includes(filters.city)) {
        return false;
      }
      // Program Category (Name match)
      if (filters.program && !prog.name.toLowerCase().includes(filters.program.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === "fee_asc") {
          return parseFee(a.fee) - parseFee(b.fee);
        }
        if (filters.sortBy === "fee_desc") {
          return parseFee(b.fee) - parseFee(a.fee);
        }
        if (filters.sortBy === "rank_asc") {
          return a.ranking - b.ranking;
        }
        return 0;
      });
    }

    return result;
  }, [filters]);

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-4 z-10">
        <DashboardFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      <main className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredPrograms.length}</span> programs
          </p>
        </div>

        {filteredPrograms.length > 0 ? (
          <motion.div 
            {...listAnimations.container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((prog, index) => (
                <motion.div
                  key={`${prog.universityId}-${prog.id}-${index}`}
                  {...listAnimations.card}
                >
                  <ProgramCard
                    id={prog.id}
                    name={prog.name}
                    universityName={prog.universityName}
                    universityLogo={prog.universityLogo}
                    universityId={prog.universityId}
                    location={prog.location}
                    duration={prog.duration}
                    type={prog.type}
                    fee={prog.fee}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            {...listAnimations.emptyState}
            className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed"
          >
            <h3 className="text-lg font-medium text-slate-900">No programs found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search query.</p>
            <button 
              onClick={handleClearFilters}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
