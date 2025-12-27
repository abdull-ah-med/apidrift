"use client";

import { Building2, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProgramCardProps {
  id: string;
  name: string;
  university: string;
  logo?: string;
  location: string;
  duration: string;
  type: string;
  fee: string;
  isAdmissionOpen: boolean;
  deadline?: string;
}

export function ProgramCard({
  id,
  name,
  university,
  logo,
  location,
  duration,
  type,
  fee,
  isAdmissionOpen,
  deadline,
}: ProgramCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/student/university/${id}`)}
      className="group relative bg-white rounded-xl border border-slate-200 p-5 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center"
    >
      {/* Logo Section */}
      <div className="shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
           <Building2 className="text-slate-400" size={32} />
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-grow min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
             <span className="text-[10px] font-bold tracking-wider text-primary bg-primary/5 px-2 py-1 rounded uppercase">
                {type}
            </span>
            {isAdmissionOpen && (
                <span className="text-[10px] font-bold tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Admissions Open
                </span>
            )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
              {name}
          </h3>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
             <Building2 size={14} /> {university}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 pt-1">
            <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-slate-400" /> {location}
            </span>
            <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-slate-400" /> {duration}
            </span>
             {isAdmissionOpen && deadline && (
                <span className="flex items-center gap-1.5 text-red-500">
                    <Calendar size={15} /> Deadline: {deadline}
                </span>
            )}
        </div>
      </div>

      {/* Action Section */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-2 md:mt-0 md:pl-8 md:border-l border-slate-100 gap-4 min-w-[140px]">
          <div className="text-left md:text-right">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Semester Fee</p>
              <p className="text-xl font-bold text-slate-900">{fee}</p>
          </div>
          
          <div className="hidden md:flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight size={16} className="ml-1" />
          </div>
          {/* Mobile only button */}
          <Button className="md:hidden h-9 text-xs">View Details</Button>
      </div>
    </div>
  );
}
