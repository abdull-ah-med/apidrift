import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle, User, GraduationCap, Users, FileText, Send, MapPin, Clock, Building2, AlertCircle, Calendar, Phone, Mail, Briefcase } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import clsx from 'clsx';
import Button from '../ui/button';

interface ReviewSubmitStepProps {
  data: ProfileData;
  onBack: () => void;
  onComplete: () => void;
}

export function ReviewSubmitStep({ data, onBack, onComplete }: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async () => {
    if (!agreed) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onComplete();
  };

  const SectionCard = ({ title, icon: Icon, colorClass, bgClass, accentColor, children, className }: { title: string, icon: any, colorClass: string, bgClass: string, accentColor: string, children: React.ReactNode, className?: string }) => (
    <div className={clsx("bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col", className)}>
      <div className={clsx("h-1 w-full", accentColor)} />
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center", bgClass)}>
          <Icon size={16} className={colorClass} />
        </div>
        <h3 className="font-['Inter:Semi_Bold',sans-serif] text-base text-slate-900">{title}</h3>
      </div>
      <div className="p-6 flex-1">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, icon: Icon, className }: { label: string, value: string | number | undefined, icon?: any, className?: string }) => (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2 text-slate-500">
        {Icon && <Icon size={12} />}
        <span className="text-[11px] font-['Inter:Medium',sans-serif] uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-[14px] font-['Inter:Semi_Bold',sans-serif] text-slate-900 break-words">{value || '-'}</span>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 font-['Inter:Bold',sans-serif]">Review Application</h1>
        <p className="text-slate-500 font-['Inter:Regular',sans-serif]">Please review your information carefully before submitting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Content (9 cols) - Bento Grid Layout */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Info - Full Width */}
          <SectionCard 
            title="Personal Information" 
            icon={User}
            colorClass="text-blue-600"
            bgClass="bg-blue-50"
            accentColor="bg-blue-500"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
              <InfoItem label="Full Name" value={data.fullName} icon={User} />
              <InfoItem label="Father's Name" value={data.fatherName} icon={User} />
              <InfoItem label="CNIC" value={data.cnic} icon={FileText} />
              <InfoItem label="Date of Birth" value={data.dateOfBirth} icon={Calendar} />
              <InfoItem label="Gender" value={data.gender} icon={User} />
              <InfoItem label="Contact" value={data.phone} icon={Phone} />
              <InfoItem label="Email" value={data.email} icon={Mail} className="md:col-span-2" />
            </div>
          </SectionCard>

          {/* Academic Background - Half Width */}
          <SectionCard 
            title="Academic Background" 
            icon={GraduationCap}
            colorClass="text-purple-600"
            bgClass="bg-purple-50"
            accentColor="bg-purple-500"
            className="md:col-span-1"
          >
            <div className="flex flex-col gap-6">
              {data.educations.map((edu, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-purple-100">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-white" />
                  <h4 className="font-['Inter:Semi_Bold',sans-serif] text-sm text-slate-900 mb-3">{edu.type}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <InfoItem label="Institute" value={edu.institute} />
                    <div className="grid grid-cols-2 gap-3">
                      <InfoItem label="Board" value={edu.board} />
                      <InfoItem label="Year" value={edu.year} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InfoItem label="Marks" value={`${edu.marks} / ${edu.totalMarks}`} />
                      <InfoItem label="Percentage" value={((parseFloat(edu.marks) / parseFloat(edu.totalMarks)) * 100).toFixed(2) + "%"} />
                    </div>
                  </div>
                </div>
              ))}
              {data.educations.length === 0 && (
                <p className="text-slate-500 text-sm italic">No education records added.</p>
              )}
            </div>
          </SectionCard>

          {/* Program Preferences - Half Width */}
          <SectionCard 
            title="Program Preferences" 
            icon={Building2}
            colorClass="text-emerald-600"
            bgClass="bg-emerald-50"
            accentColor="bg-emerald-500"
            className="md:col-span-1"
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="City" value={data.interestedCity} icon={MapPin} />
                <InfoItem label="Shift" value={data.shift} icon={Clock} />
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-['Inter:Medium',sans-serif] text-slate-500 uppercase tracking-wider block mb-3">Areas of Interest</span>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-['Inter:Medium',sans-serif] rounded-md border border-emerald-100">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Guardian Info - Full Width */}
          <SectionCard 
            title="Guardian & Financial" 
            icon={Users}
            colorClass="text-amber-600"
            bgClass="bg-amber-50"
            accentColor="bg-amber-500"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
              <InfoItem label="Guardian Name" value={data.guardianName} icon={User} />
              <InfoItem label="Relation" value={data.guardianRelation} icon={Users} />
              <InfoItem label="Contact" value={data.guardianPhone} icon={Phone} />
              <InfoItem label="Annual Income" value={data.annualIncome} icon={Briefcase} />
              <InfoItem label="CNIC" value={data.guardianCNIC} icon={FileText} />
              <InfoItem label="Address" value={data.permanentAddress} icon={MapPin} className="md:col-span-3" />
            </div>
          </SectionCard>

          {/* Documents - Full Width */}
          <SectionCard 
            title="Uploaded Documents" 
            icon={FileText}
            colorClass="text-slate-600"
            bgClass="bg-slate-100"
            accentColor="bg-slate-500"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Identity', file: data.cnicDoc, type: data.cnicDocType },
                { label: 'Matric', file: data.matricDoc },
                { label: 'Intermediate', file: data.interDoc, type: data.interDocType },
                { label: 'Domicile', file: data.domicileDoc },
              ].map((doc, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className={clsx(
                    "w-8 h-8 rounded-md flex items-center justify-center",
                    doc.file ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
                  )}>
                    {doc.file ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{doc.label}</span>
                      {doc.type && (
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">
                          {doc.type}
                        </span>
                      )}
                    </div>
                    <span className={clsx(
                      "text-xs font-semibold truncate",
                      doc.file ? "text-slate-900" : "text-red-500"
                    )}>
                      {doc.file instanceof File ? doc.file.name : 'Missing'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

        </div>

        {/* Sidebar (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6 sticky top-6">
          
          {/* Declaration Card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
            <div className="h-1 w-full bg-slate-900" />
            <div className="p-5 flex flex-col gap-5">
                <h3 className="font-['Inter:Semi_Bold',sans-serif] text-slate-900">Declaration</h3>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed font-['Inter:Medium',sans-serif] text-justify">
                    I hereby declare that the information provided is true and correct to the best of my knowledge. I understand that any false statement may result in cancellation of my admission.
                </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                    <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-slate-900 checked:bg-slate-900 hover:border-slate-400"
                    />
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                    <CheckCircle size={12} />
                    </div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors select-none font-['Inter:Regular',sans-serif]">
                    I agree to the terms and conditions
                </span>
                </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!agreed || isSubmitting}
              className={clsx(
                "w-full py-3.5 rounded-xl shadow-lg",
                (!agreed || isSubmitting) && "opacity-50 cursor-not-allowed shadow-none"
              )}
              iconRight={!isSubmitting && <Send size={18} />}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBack}
              disabled={isSubmitting}
              className="w-full py-3 text-slate-600 hover:bg-slate-50 rounded-xl disabled:opacity-50"
              iconLeft={<ChevronLeft size={18} />}
            >
              Go Back
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
