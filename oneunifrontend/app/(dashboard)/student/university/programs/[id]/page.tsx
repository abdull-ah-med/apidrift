"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  DollarSign,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getProgramDetails } from "@/lib/data/program-details";
import Button from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProgramHeader } from "@/components/university/ProgramHeader";
import { ProgramTabs } from "@/components/university/ProgramTabs";
import { ProgramSection } from "@/components/university/ProgramSection";
import { CurriculumList } from "@/components/university/CurriculumList";
import { FeeCard } from "@/components/university/FeeCard";

export default function ProgramDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;
  const program = getProgramDetails(programId);
  
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "eligibility" | "fees">("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "eligibility", label: "Eligibility", icon: CheckCircle2 },
    { id: "fees", label: "Fee Structure", icon: DollarSign },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Programs</span>
      </button>

      {/* Header Section */}
      <ProgramHeader 
        name={program.name}
        type={program.type}
        department={program.department}
        description={program.description}
        duration={program.duration}
        creditHours={program.creditHours}
      />

      {/* Content Tabs */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <ProgramTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 min-h-[500px] shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <ProgramSection title="Program Overview">
                      <p className="text-text-body leading-relaxed text-lg">
                        {program.overview}
                      </p>
                    </ProgramSection>

                    <ProgramSection title="Career Prospects">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.careerProspects.map((career, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                              <Briefcase size={18} />
                            </div>
                            <span className="font-bold text-text-body">{career}</span>
                          </div>
                        ))}
                      </div>
                    </ProgramSection>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <ProgramSection title="Course Curriculum">
                    <CurriculumList curriculum={program.curriculum} />
                  </ProgramSection>
                )}

                {activeTab === "eligibility" && (
                  <div className="space-y-8">
                    <ProgramSection title="Admission Eligibility">
                      <div className="space-y-4">
                        {program.eligibility.map((criteria, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                            <div className="mt-1 text-primary">
                              <CheckCircle2 size={24} />
                            </div>
                            <p className="text-lg font-medium text-text-body">{criteria}</p>
                          </div>
                        ))}
                      </div>
                    </ProgramSection>
                    
                    <div className="p-6 bg-secondary/10 rounded-2xl border border-secondary/20">
                      <p className="text-secondary-foreground font-bold flex items-center gap-2">
                        <FileText size={20} />
                        Note:
                      </p>
                      <p className="text-text-body mt-2">
                        Final admission is subject to the merit list generated based on NET scores and academic weightage.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "fees" && (
                  <div className="space-y-8">
                    <ProgramSection title="Fee Structure">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeeCard 
                          label="Admission Fee" 
                          amount={program.feeStructure.admissionFee} 
                          subtext="One-time payment" 
                        />
                        <FeeCard 
                          label="Tuition Fee" 
                          amount={program.feeStructure.tuitionFeePerSemester} 
                          subtext="Per Semester" 
                          highlight
                        />
                        <FeeCard 
                          label="Other Charges" 
                          amount={program.feeStructure.otherCharges} 
                          subtext="Annual charges" 
                        />
                      </div>
                    </ProgramSection>
                    
                    <div className="mt-8 p-6 border border-dashed border-slate-300 rounded-2xl">
                      <h4 className="font-bold text-text-main mb-4">Financial Aid & Scholarships</h4>
                      <p className="text-text-body mb-4">
                        NUST offers various need-based and merit-based scholarships to deserving students. 
                        Over 25% of our students receive some form of financial assistance.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary font-bold flex items-center gap-2">
                        View Scholarship Details <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
