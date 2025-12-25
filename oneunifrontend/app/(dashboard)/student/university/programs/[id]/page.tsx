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
        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Programs</span>
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border",
                program.type === 'BS' ? 'bg-primary/5 text-primary border-primary/10' :
                program.type === 'MS' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                'bg-slate-100 text-slate-700 border-slate-200'
              )}>
                {program.type} Program
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-sm font-medium text-slate-500">{program.department}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {program.name}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              {program.description}
            </p>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Duration</p>
                  <p className="font-bold">{program.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Credit Hours</p>
                  <p className="font-bold">{program.creditHours} Cr. Hrs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[240px]">
            <Button className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20">
              Apply Now
            </Button>
            <Button variant="outline" className="w-full py-6 text-lg font-bold">
              Download Brochure
            </Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-1/4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-bold transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              )}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

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
                    <section>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Program Overview</h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {program.overview}
                      </p>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Career Prospects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.careerProspects.map((career, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                              <Briefcase size={18} />
                            </div>
                            <span className="font-bold text-slate-700">{career}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Course Curriculum</h3>
                    <div className="space-y-6">
                      {program.curriculum.map((sem, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                            <h4 className="font-bold text-primary">{sem.semester}</h4>
                          </div>
                          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sem.courses.map((course, cIdx) => (
                              <div key={cIdx} className="flex items-center gap-3 text-slate-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                <span className="font-medium">{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "eligibility" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Admission Eligibility</h3>
                    <div className="space-y-4">
                      {program.eligibility.map((criteria, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                          <div className="mt-1 text-primary">
                            <CheckCircle2 size={24} />
                          </div>
                          <p className="text-lg font-medium text-slate-700">{criteria}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 bg-secondary/10 rounded-2xl border border-secondary/20">
                      <p className="text-secondary-foreground font-bold flex items-center gap-2">
                        <FileText size={20} />
                        Note:
                      </p>
                      <p className="text-slate-600 mt-2">
                        Final admission is subject to the merit list generated based on NET scores and academic weightage.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "fees" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Fee Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <p className="text-sm font-bold text-slate-400 uppercase mb-2">Admission Fee</p>
                        <p className="text-3xl font-black text-slate-900">{program.feeStructure.admissionFee}</p>
                        <p className="text-xs text-slate-500 mt-2">One-time payment</p>
                      </div>
                      <div className="p-6 bg-primary text-white border border-primary rounded-2xl shadow-lg shadow-primary/20">
                        <p className="text-sm font-bold text-white/70 uppercase mb-2">Tuition Fee</p>
                        <p className="text-3xl font-black">{program.feeStructure.tuitionFeePerSemester}</p>
                        <p className="text-xs text-white/70 mt-2">Per Semester</p>
                      </div>
                      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <p className="text-sm font-bold text-slate-400 uppercase mb-2">Other Charges</p>
                        <p className="text-3xl font-black text-slate-900">{program.feeStructure.otherCharges}</p>
                        <p className="text-xs text-slate-500 mt-2">Annual charges</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-6 border border-dashed border-slate-300 rounded-2xl">
                      <h4 className="font-bold text-slate-900 mb-4">Financial Aid & Scholarships</h4>
                      <p className="text-slate-600 mb-4">
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
