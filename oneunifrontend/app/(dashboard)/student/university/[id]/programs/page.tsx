"use client";

import { ProgramList } from "@/components/university/ProgramList";
import { universityData } from "@/lib/data/mock-university";

export default function UniversityProgramsPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProgramList departments={universityData.departments} />
    </div>
  );
}
