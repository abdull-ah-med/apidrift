import { motion } from 'framer-motion';
import { ChevronRight, GraduationCap, FileText, Award, Users, Clock, Shield, Save } from 'lucide-react';
import Button from '../ui/button';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text-main">Admission Application</h1>
        <p className="text-text-muted">Complete your profile setup to proceed with your admission.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Requirements Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-semibold text-text-main mb-4 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              Required Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "CNIC / B-Form Copy",
                "Matriculation Certificate",
                "Intermediate Result Card",
                "Guardian's CNIC Copy",
                "Recent Passport Photo",
                "Domicile Certificate"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-text-body font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, title: "Academic Info", desc: "Educational history & grades" },
              { icon: Users, title: "Family Details", desc: "Guardian & contact info" },
              { icon: Award, title: "Special Quotas", desc: "Sports, Hafiz-e-Quran, etc." },
              { icon: FileText, title: "Document Upload", desc: "Scan & upload records" }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-2 bg-primary/5 text-primary rounded-lg">
                  <step.icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-main">{step.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / Action Area */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between h-full min-h-[280px] relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Ready to Start?</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Your journey begins here. The process is simple, secure, and auto-saved.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2.5 text-white/90">
                  <Clock size={16} />
                  <span className="text-xs font-medium">~15 Minutes estimated</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/90">
                  <Shield size={16} />
                  <span className="text-xs font-medium">Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/90">
                  <Save size={16} />
                  <span className="text-xs font-medium">Auto-save enabled</span>
                </div>
              </div>
            </div>

            <Button
              onClick={onNext}
              className="relative z-10 w-full bg-white text-primary hover:bg-white/90 border-white shadow-sm"
              iconRight={<ChevronRight size={18} />}
            >
              Start Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
