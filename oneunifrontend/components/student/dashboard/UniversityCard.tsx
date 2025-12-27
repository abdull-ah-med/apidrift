"use client";

import { Building2, MapPin, Trophy, BookOpen, School, ArrowRight, Banknote, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

interface UniversityCardProps {
  id: string;
  name: string;
  logo?: string;
  image?: string;
  location: string;
  ranking: number;
  established: string;
  programCount: number;
  minFee: string;
  campuses: number;
}

export function UniversityCard({
  id,
  name,
  logo,
  image,
  location,
  ranking,
  established,
  programCount,
  minFee,
  campuses,
}: UniversityCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/student/university/${id}`)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer overflow-hidden relative"
    >
      {/* Cover Image with Gradient */}
      <div className="h-36 w-full relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
            <Building2 size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Colorful Rank Badge */}
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
           <Trophy size={12} className="fill-white" /> 
           <span>Rank #{ranking}</span>
        </div>

        {/* White Curve/Shape at bottom of image for style */}
        <div className="absolute -bottom-1 left-0 right-0 h-6 bg-white rounded-t-[20px]" />
      </div>

      {/* Logo - Overlapping */}
      <div className="absolute top-24 left-6 z-10">
         <div className="w-16 h-16 rounded-2xl border-4 border-white bg-white shadow-lg flex items-center justify-center overflow-hidden">
            {logo ? (
               <img src={logo} alt="logo" className="w-full h-full object-contain p-1" />
            ) : (
               <Building2 className="text-slate-400" size={24} />
            )}
         </div>
      </div>

      {/* Content Body */}
      <div className="pt-8 px-6 pb-6 flex flex-col flex-grow">
         {/* Header Info */}
         <div className="mb-5">
            <h3 className="font-bold text-slate-900 text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">
               {name}
            </h3>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
               <MapPin size={14} className="text-primary shrink-0" /> 
               <span className="line-clamp-1">{location}</span>
            </p>
         </div>

         {/* Colorful Stats Grid */}
         <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 flex flex-col justify-center">
               <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <BookOpen size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Programs</span>
               </div>
               <p className="text-lg font-bold text-slate-800">{programCount}+</p>
            </div>
            
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex flex-col justify-center">
               <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Banknote size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Avg. Fee</span>
               </div>
               <p className="text-lg font-bold text-slate-800">{minFee}</p>
            </div>
         </div>

         {/* Footer Info & Action */}
         <div className="mt-auto pt-4 border-t border-slate-100">
             <div className="flex gap-4 text-xs font-medium text-slate-500 mb-4">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                   <School size={12} className="text-purple-500" />
                   <span>{campuses} Campus</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                   <Calendar size={12} className="text-orange-500" />
                   <span>Est. {established}</span>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-3">
                <Button 
                    variant="outline"
                    className="h-10 px-0 rounded-xl text-xs font-bold bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-white hover:border-primary hover:text-primary hover:shadow-md flex items-center justify-center gap-2 transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/student/university/${id}/programs`);
                    }}
                >
                    <BookOpen size={15} /> Programs
                </Button>

                <Button 
                    className="h-10 px-0 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                    Details <ArrowRight size={15} />
                </Button>
             </div>
         </div>
      </div>
    </div>
  );
}
