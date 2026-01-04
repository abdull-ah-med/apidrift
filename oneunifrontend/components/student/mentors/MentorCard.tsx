"use client";

import { Star, Briefcase, Building2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface MentorCardProps {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  expertise: string[];
  rating: number;
  reviews: number;
  hourlyRate: string;
}

export function MentorCard({
  id,
  name,
  role,
  organization,
  image,
  expertise,
  rating,
  reviews,
  hourlyRate,
}: MentorCardProps) {
  const router = useRouter();

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => router.push(`/student/mentors/${id}`)}
      className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_2px_12px_0_rgba(16,30,54,0.06)] hover:shadow-[0_4px_24px_0_rgba(16,30,54,0.10)] transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      {/* Header Profile */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-100 shadow-sm group-hover:ring-2 group-hover:ring-blue-500/10 transition-all">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
             <div className="bg-white text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-slate-100">
                <Star size={8} className="fill-yellow-400 text-yellow-400" /> {rating}
             </div>
          </div>
        </div>
        
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-slate-600 font-medium truncate">
            {role}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <Building2 size={12} className="text-slate-400" /> 
            <span className="truncate">{organization}</span>
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {expertise.slice(0, 3).map((skill, index) => (
          <span 
            key={index}
            className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100 group-hover:border-blue-500/10 group-hover:bg-blue-50 transition-colors"
          >
            {skill}
          </span>
        ))}
        {expertise.length > 3 && (
           <span className="px-2 py-1 rounded-md bg-slate-50 text-slate-400 text-xs font-medium border border-slate-100">
             +{expertise.length - 3}
           </span>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
        <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Starting at</p>
            <div className="flex items-baseline gap-1">
                <p className="text-base font-bold text-slate-900">{hourlyRate}</p>
                <p className="text-xs text-slate-500 font-medium">/ session</p>
            </div>
        </div>
        <button
          className="px-4 py-2 rounded-lg border border-blue-600 text-blue-700 text-xs font-semibold bg-transparent group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-sm flex items-center gap-2"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
