import Image from "next/image";
import { MapPin, Globe, Phone, Mail, Calendar, Award, User } from "lucide-react";
import Button from "@/components/ui/button";

interface UniversityHeaderProps {
  data: {
    name: string;
    logo: string;
    coverImage?: string;
    location: string;
    website: string;
    ranking: number;
    established: string;
    vcName: string;
    contact: {
      phone: string;
      email: string;
    };
  };
}

export function UniversityHeader({ data }: UniversityHeaderProps) {
  return (
    <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Cover Image Area */}
      <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 relative">
        {data.coverImage && (
            <div className="absolute inset-0 bg-black/20" />
            // <Image src={data.coverImage} alt="Cover" fill className="object-cover opacity-50" />
        )}
        <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium text-slate-900 shadow-sm">
                <Award size={16} className="text-amber-500" />
                <span>Intl. Rank: #{data.ranking}</span>
            </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start -mt-12 relative z-10">
          {/* Logo */}
          <div className="w-32 h-32 bg-white rounded-xl shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
             {/* Placeholder for Logo */}
             <div className="text-4xl font-bold text-blue-900">{data.name.substring(0, 1)}</div>
             {/* <Image src={data.logo} alt={data.name} width={128} height={128} className="object-contain" /> */}
          </div>

          {/* Info */}
          <div className="flex-1 pt-14 md:pt-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{data.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-600 text-sm">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-slate-400" />
                            {data.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} className="text-slate-400" />
                            Est. {data.established}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User size={16} className="text-slate-400" />
                            VC: {data.vcName}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="gap-2" onClick={() => window.open(data.website, '_blank')}>
                        <Globe size={16} />
                        Website
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Apply Now
                    </Button>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-6 text-sm">
                <a href={`tel:${data.contact.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                    <Phone size={16} />
                    {data.contact.phone}
                </a>
                <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                    <Mail size={16} />
                    {data.contact.email}
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
