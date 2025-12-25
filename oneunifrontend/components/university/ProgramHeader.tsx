"use client";

import { Clock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

interface ProgramHeaderProps {
  name: string;
  type: string;
  department: string;
  description: string;
  duration: string;
  creditHours: number;
}

export function ProgramHeader({
  name,
  type,
  department,
  description,
  duration,
  creditHours,
}: ProgramHeaderProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border",
              type === 'BS' ? 'bg-primary/5 text-primary border-primary/10' :
              type === 'MS' ? 'bg-secondary/10 text-secondary border-secondary/20' :
              'bg-slate-100 text-text-body border-slate-200'
            )}>
              {type} Program
            </span>
            <span className="text-text-muted">•</span>
            <span className="text-sm font-medium text-text-muted">{department}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-text-main">
            {name}
          </h1>
          <p className="text-lg text-text-body max-w-3xl">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-text-body">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase">Duration</p>
                <p className="font-bold">{duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-text-body">
              <div className="p-2 bg-slate-100 rounded-lg">
                <GraduationCap size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase">Credit Hours</p>
                <p className="font-bold">{creditHours} Cr. Hrs</p>
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
  );
}
