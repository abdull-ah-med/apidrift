"use client";

import { FileText, Wallet, Trophy, CheckCircle2, Calendar, ArrowRight, Download, GraduationCap, BookOpen, PenTool, AlertCircle, FileCheck, ClipboardCheck, FileSignature } from "lucide-react";
import { FeeStructure } from "@/components/university/FeeStructure";
import { universityData } from "@/lib/data/mock-university";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UniversityAdmissionsPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Admissions & Aid</h2>
          <p className="text-slate-600 mt-1">Everything you need to know about applying to NUST.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Prospectus
          </Button>
          <Button className="gap-2">
            Apply Now
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Calendar size={20} />
            </div>
            <h3 className="font-semibold text-primary">Fall 2025</h3>
          </div>
          <p className="text-sm text-primary/80 mb-4">Admissions are currently open. Deadline to apply is August 15th.</p>
          <div className="w-full bg-primary/20 rounded-full h-1.5 mb-2">
            <div className="bg-primary h-1.5 rounded-full w-3/4" />
          </div>
          <p className="text-xs text-primary font-medium text-right">15 Days Left</p>
        </div>

        <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <Trophy size={20} />
            </div>
            <h3 className="font-semibold text-secondary">Scholarships</h3>
          </div>
          <p className="text-sm text-secondary mb-4">Over 40% of our students receive some form of financial aid.</p>
          <a href="#scholarships" className="text-sm font-medium text-secondary hover:text-secondary/80 underline">Check Eligibility</a>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-slate-200 text-slate-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-semibold text-slate-900">Requirements</h3>
          </div>
          <p className="text-sm text-slate-700 mb-4">Review the eligibility criteria and required documents before applying.</p>
          <a href="#requirements" className="text-sm font-medium text-slate-700 hover:text-slate-900 underline">View Checklist</a>
        </div>
      </div>

      {/* Main Content Stack */}
      <div className="space-y-12">
        
        {/* Eligibility Section - Full Width */}
        <section id="requirements" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Eligibility & Requirements</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Academic Qualifications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-primary rounded-lg">
                  <BookOpen size={24} />
                </div>
                Academic Qualifications
              </h4>
              <div className="space-y-4">
                {universityData.admissionRequirements.criteria.map((crit, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                       <FileCheck size={22} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Requirement {idx + 1}</p>
                       <p className="text-slate-700 font-medium leading-relaxed">
                        {crit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Entry Tests */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col">
              <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-secondary rounded-lg">
                  <ClipboardCheck size={24} />
                </div>
                Required Entry Tests
              </h4>
              
              <div className="grid sm:grid-cols-2 gap-4 flex-1 content-start">
                {universityData.admissionRequirements.tests.map((test, idx) => (
                  <div key={idx} className="relative group bg-white rounded-xl p-5 border-2 border-slate-100 hover:border-secondary transition-all hover:shadow-md text-center flex flex-col items-center justify-center gap-3 min-h-[140px]">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-1 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <FileSignature size={28} />
                    </div>
                    <span className="font-bold text-slate-800 text-lg">{test}</span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">Accepted Test</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-secondary/5 border border-secondary/20 rounded-xl flex gap-4 items-start">
                <AlertCircle className="text-secondary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Validity Period</p>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Test scores are valid for one academic year only. Please ensure your result is recent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarships Section - Full Width */}
        <section id="scholarships" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Scholarships & Financial Aid</h3>
                <p className="text-slate-500 mt-1">We believe quality education should be accessible to everyone.</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              View All Scholarships <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universityData.scholarships.map((item: any, idx: number) => (
              <div key={idx} className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-secondary hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Trophy size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 h-12">
                    {item.name}
                  </h4>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Benefits</p>
                    <p className="text-sm font-medium text-secondary">
                      {item.concession}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Structure & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fee Structure */}
          <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                <Wallet size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Fee Structure</h3>
            </div>
            <FeeStructure fees={universityData.fees} />
          </section>

          {/* Contact Box */}
          <section className="bg-primary rounded-xl p-8 text-white flex flex-col justify-center h-full relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-secondary">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Need Admission Help?</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Our admissions office is here to guide you through the process. Reach out to us for any queries.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-white/10 rounded-md text-secondary">
                    <Download size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">Email Us</p>
                    <p className="font-medium text-sm">admissions@nust.edu.pk</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-white/10 rounded-md text-secondary">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">Call Us</p>
                    <p className="font-medium text-sm">+92-51-9085-0000</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
