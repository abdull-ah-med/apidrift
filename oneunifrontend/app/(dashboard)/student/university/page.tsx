"use client";

import { Building2, MapPin, GraduationCap, Users, Wallet, FileText, School, Coffee, Library, Trophy } from "lucide-react";
import { UniversityHeader } from "@/components/university/UniversityHeader";
import { InfoCard } from "@/components/university/InfoCard";
import { FeeStructure } from "@/components/university/FeeStructure";
// import { ProgramList } from "@/components/university/ProgramList";
import { FacilityList } from "@/components/university/FacilityList";

// Mock Data - In a real app, this would come from an API based on a slug/ID
const universityData = {
  name: "National University of Sciences and Technology (NUST)",
  logo: "/nust-logo.png", // Placeholder
  location: "H-12, Islamabad, Pakistan",
  website: "https://nust.edu.pk",
  ranking: 334, // QS World Ranking
  established: "1991",
  vcName: "Engr. Javed Mahmood Bukhari",
  contact: {
    phone: "+92-51-90850000",
    email: "info@nust.edu.pk"
  },
  overview: "NUST is a premier public research university in Pakistan, known for its emphasis on science and technology. It offers a wide range of undergraduate and graduate programs and is consistently ranked among the top universities in the country and globally.",
  subCampuses: [
    "College of Electrical & Mechanical Engineering (CEME), Rawalpindi",
    "Military College of Signals (MCS), Rawalpindi",
    "Pakistan Navy Engineering College (PNEC), Karachi",
    "College of Aeronautical Engineering (CAE), Risalpur"
  ],
  fees: {
    semester: "PKR 180,000",
    year: "PKR 360,000",
    degree: "PKR 1,440,000" // 4 years
  },
  departments: [
    {
      name: "School of Electrical Engineering and Computer Science (SEECS)",
      programs: [
        { name: "BS Computer Science", duration: "4 Years", type: "BS" },
        { name: "BS Software Engineering", duration: "4 Years", type: "BS" },
        { name: "BS Electrical Engineering", duration: "4 Years", type: "BS" }
      ]
    },
    {
      name: "NUST Business School (NBS)",
      programs: [
        { name: "BBA (Hons)", duration: "4 Years", type: "BS" },
        { name: "BS Accounting & Finance", duration: "4 Years", type: "BS" },
        { name: "MBA", duration: "2 Years", type: "MS" }
      ]
    }
  ],
  facilities: [
    "State-of-the-art Hostels",
    "Central Library",
    "Sports Complex & Gym",
    "Medical Center",
    "Transport Service",
    "Cafeterias & Food Courts",
    "Auditoriums",
    "Research Labs"
  ],
  societies: [
    "NUST Science Society",
    "NUST Debating Society",
    "NUST Community Service Club",
    "NUST Adventure Club",
    "NUST Literary Circle",
    "NUST Media Club"
  ],
  admissionRequirements: {
    tests: ["NET (NUST Entry Test)", "SAT (Scholastic Assessment Test)", "ACT"],
    criteria: [
      "Minimum 60% marks in Matriculation/O-Levels",
      "Minimum 60% marks in HSSC/A-Levels (Pre-Engineering/ICS)",
      "Valid Entry Test Score"
    ]
  },
  scholarships: [
    "Need-based Scholarship",
    "Merit-based Scholarship",
    "PEEF Scholarship",
    "EHSAAS Undergraduate Scholarship"
  ]
};

export default function UniversityProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <UniversityHeader data={universityData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Overview */}
            <InfoCard title="Overview" icon={Building2}>
              <p>{universityData.overview}</p>
            </InfoCard>

            {/* Programs */}
            {/* <ProgramList departments={universityData.departments} /> */}

            {/* Admission Requirements */}
            <InfoCard title="Admission Requirements" icon={FileText}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2 text-sm">Accepted Tests</h4>
                  <div className="flex flex-wrap gap-2">
                    {universityData.admissionRequirements.tests.map((test, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2 text-sm">Eligibility Criteria</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 marker:text-blue-500">
                    {universityData.admissionRequirements.criteria.map((crit, idx) => (
                      <li key={idx}>{crit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoCard>

            {/* Fee Structure */}
            <FeeStructure fees={universityData.fees} />

          </div>

          {/* Right Column (Sidebar) */}
          <div className="flex flex-col gap-8">
            
            {/* Facilities */}
            <FacilityList 
              title="Campus Facilities" 
              icon={Coffee} 
              items={universityData.facilities} 
            />

            {/* Societies */}
            <FacilityList 
              title="Societies & Clubs" 
              icon={Users} 
              items={universityData.societies} 
            />

            {/* Sub Campuses */}
            <InfoCard title="Sub Campuses" icon={MapPin}>
              <ul className="space-y-3">
                {universityData.subCampuses.map((campus, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                    {campus}
                  </li>
                ))}
              </ul>
            </InfoCard>

            {/* Scholarships */}
            <InfoCard title="Scholarships & Funding" icon={Wallet}>
              <div className="space-y-3">
                {universityData.scholarships.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <Trophy size={16} className="text-amber-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-amber-900">{item}</span>
                  </div>
                ))}
              </div>
            </InfoCard>

          </div>
        </div>
      </div>
    </div>
  );
}
