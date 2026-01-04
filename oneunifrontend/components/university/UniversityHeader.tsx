import Image from "next/image";
import { MapPin, Globe, Phone, Mail, Calendar, Award, User, DollarSign, ExternalLink } from "lucide-react";
import Button from "@/components/ui/button";

interface UniversityHeaderProps {
  data: {
    name: string;
    logo: string;
    location: string;
    website: string;
    ranking: number;
    established: string;
    vcName: string;
    contact: {
      phone: string;
      email: string;
    };
    fees?: {
      semester: string;
    };
  };
}

export function UniversityHeader({ data }: UniversityHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      <div className="flex flex-col md:flex-row">
        
        {/* Left: Identity & Actions */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0 shadow-sm">
              {data.name.substring(0, 1)}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-main leading-tight mb-2">{data.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {data.location}
                </div>
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                  <Globe size={15} />
                  {data.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 shadow-md shadow-primary/10">
              Apply for Admission
            </Button>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.location.href = `tel:${data.contact.phone}`} title="Call">
                    <Phone size={18} className="text-text-body" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = `mailto:${data.contact.email}`} title="Email">
                    <Mail size={18} className="text-text-body" />
                </Button>
            </div>
          </div>
        </div>

        {/* Right: Key Stats Panel */}
        <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-6 md:p-8 md:w-80 flex flex-col justify-center gap-6">
            
            {/* Fee Highlight */}
            {data.fees && (
                <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Avg. Semester Fee</p>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-secondary/10 text-secondary rounded-md">
                            <DollarSign size={18} />
                        </div>
                        <span className="text-2xl font-bold text-text-main">{data.fees.semester}</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/60">
                <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Ranking</p>
                    <div className="flex items-center gap-2 text-text-body font-medium">
                        <Award size={16} className="text-secondary" />
                        #{data.ranking}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Established</p>
                    <div className="flex items-center gap-2 text-text-body font-medium">
                        <Calendar size={16} className="text-primary" />
                        {data.established}
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
