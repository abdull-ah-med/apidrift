"use client";

import { Building2, MapPin, Clock, ArrowRight, Banknote } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProgramCardProps {
  id: string;
  name: string;
  universityName: string;
  universityLogo?: string;
  universityId: string;
  location: string;
  duration: string;
  type: string;
  fee: string;
}

export function ProgramCard({
  id,
  name,
  universityName,
  universityLogo,
  universityId,
  location,
  duration,
  type,
  fee,
}: ProgramCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/student/university/${universityId}/programs`)}
      className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden"
    >
      
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center p-1 shrink-0">
              {universityLogo ? (
                <img src={universityLogo} alt={universityName} className="w-full h-full object-contain" />
              ) : (
                <Building2 className="text-slate-400" size={20} />
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-500 line-clamp-1">{universityName}</h4>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <MapPin size={10} />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100 shrink-0">
            {type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
          <div className="flex items-center gap-2 text-slate-700 text-sm bg-blue-50/50 border border-blue-100 p-2 rounded-lg">
            <Clock size={14} className="text-blue-500" />
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm bg-emerald-50/50 border border-emerald-100 p-2 rounded-lg">
            <Banknote size={14} className="text-emerald-500" />
            <span className="truncate font-medium">{fee}</span>
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors">View Details</span>
          <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
