"use client";

import Image from "next/image";
import { Building2, MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { universityData } from "@/lib/data/mock-university";
import Button from "@/components/ui/button";

export default function UniversityOverviewPage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      
      {/* Hero / Overview Section */}
      <section className="w-full bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
                <Building2 size={16} />
                <span>About the University</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main leading-tight">
                Excellence in <span className="text-primary">Science & Technology</span>
              </h1>
              <p className="text-lg text-text-body leading-relaxed">
                {universityData.overview}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Main Campus</p>
                    <p className="font-medium text-text-main">{universityData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Global Ranking</p>
                    <p className="font-medium text-text-main">#{universityData.ranking} (QS)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop" 
                alt="University Campus" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-medium text-lg">Main Campus</p>
                <p className="text-white/80 text-sm">Islamabad, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub Campuses Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-text-main">Our Campuses</h2>
            <p className="text-text-body mt-2 max-w-2xl">
              Spread across the country, our campuses offer specialized programs and state-of-the-art facilities.
            </p>
          </div>
          <Button variant="secondary" className="gap-2">
            View All Locations <ArrowRight size={16} />
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {universityData.subCampuses.map((campus: any, idx: number) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-[350px] lg:min-w-[400px] snap-center group relative h-[300px] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0">
              <Image 
                src={campus.image} 
                alt={campus.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2 uppercase tracking-wider">
                  <MapPin size={12} />
                  {campus.location}
                </div>
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-secondary transition-colors">
                  {campus.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to start your journey?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-lg">
                Get in touch with our admissions office or visit our campus to learn more about the opportunities waiting for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-blue-900 hover:bg-blue-50 border-none">
                  Apply Now
                </Button>
                <Button variant="secondary" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white bg-transparent">
                  Download Prospectus
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/50">
                <Phone className="text-amber-400 mb-4" size={28} />
                <p className="text-blue-200 text-sm mb-1">Call Us</p>
                <p className="text-white font-semibold text-lg">{universityData.contact.phone}</p>
              </div>
              <div className="bg-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/50">
                <Mail className="text-amber-400 mb-4" size={28} />
                <p className="text-blue-200 text-sm mb-1">Email Us</p>
                <p className="text-white font-semibold text-lg break-all">{universityData.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
