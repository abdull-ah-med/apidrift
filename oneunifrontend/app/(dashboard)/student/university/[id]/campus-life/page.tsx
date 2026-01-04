"use client";

import { 
  Coffee, Users, ArrowRight, Music, Book, Heart, Camera, MapPin, 
  Home, Dumbbell, Stethoscope, Bus, Utensils, Mic2, FlaskConical, Library,
  Wifi, ShieldCheck
} from "lucide-react";
import { universityData } from "@/lib/data/mock-university";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UniversityCampusLifePage() {
  
  const getFacilityIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("hostel")) return Home;
    if (lowerName.includes("library")) return Library;
    if (lowerName.includes("sport") || lowerName.includes("gym")) return Dumbbell;
    if (lowerName.includes("medical")) return Stethoscope;
    if (lowerName.includes("transport")) return Bus;
    if (lowerName.includes("cafeteria") || lowerName.includes("food")) return Utensils;
    if (lowerName.includes("auditorium")) return Mic2;
    if (lowerName.includes("lab")) return FlaskConical;
    if (lowerName.includes("security")) return ShieldCheck;
    if (lowerName.includes("internet") || lowerName.includes("wifi")) return Wifi;
    return Book; // Default
  };

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-text-main">Campus Life</h2>
          <p className="text-text-body mt-1">Discover the vibrant community and world-class facilities at NUST.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <MapPin size={16} />
          View Campus Map
        </Button>
      </div>

      {/* Facilities Grid (Icon Based) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {universityData.facilities.map((facility, idx) => {
          const Icon = getFacilityIcon(facility.name);
          // Alternate colors for visual interest
          const colors = [
            "bg-primary/5 text-primary border-primary/10 hover:border-primary/30",
            "bg-secondary/5 text-secondary border-secondary/10 hover:border-secondary/30",
            "bg-slate-50 text-text-body border-slate-200 hover:border-slate-300",
            "bg-primary/5 text-primary border-primary/10 hover:border-primary/30",
            "bg-secondary/5 text-secondary border-secondary/10 hover:border-secondary/30",
            "bg-slate-50 text-text-body border-slate-200 hover:border-slate-300",
          ];
          const colorClass = colors[idx % colors.length];

          return (
            <div 
              key={idx} 
              className={cn(
                "flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer group text-center h-full min-h-[200px]",
                colorClass
              )}
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon size={32} />
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">{facility.name}</h3>
              <p className="text-sm text-text-muted px-2">
                {/* @ts-ignore */}
                {facility.description || "State-of-the-art amenities designed for student success and comfort."}
              </p>
            </div>
          );
        })}
      </div>

      {/* Societies Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-main">Student Societies</h3>
          <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
            View All <ArrowRight size={14} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {universityData.societies.map((society, idx) => {
            const icons = [Music, Book, Heart, Camera, Users, Coffee];
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-text-muted flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">{society}</h4>
                  <p className="text-xs text-text-muted">500+ Members</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
