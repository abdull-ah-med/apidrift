"use client";

import { UniversityHeader } from "@/components/university/UniversityHeader";
import { UniversityNav } from "@/components/university/UniversityNav";
import { universityData } from "@/lib/data/mock-university";

export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UniversityHeader data={universityData} />
      </div>
      
      <UniversityNav />

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
