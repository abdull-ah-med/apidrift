"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, GraduationCap, Users, FileText, MapPin, Clock, 
  Building2, Calendar, Phone, Mail, Briefcase, Edit3, 
  CheckCircle2, ShieldCheck, Download, ExternalLink,
  Award, Heart, Accessibility, Trophy, Home, Settings,
  Share2, MoreVertical
} from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/ui/button';

// Mock Data for the Profile
const mockProfileData = {
  fullName: "Muhammad Ahmed",
  fatherName: "Muhammad Irfan",
  cnic: "42101-1234567-1",
  dateOfBirth: "2002-05-15",
  gender: "Male",
  phone: "0300-1234567",
  email: "ahmed.irfan@example.com",
  
  educations: [
    {
      type: "Intermediate (HSSC)",
      institute: "Govt. Degree College for Men",
      board: "BIEK Karachi",
      year: "2021",
      marks: "945",
      totalMarks: "1100"
    },
    {
      type: "Matriculation (SSC)",
      institute: "Happy Home High School",
      board: "BSEK Karachi",
      year: "2019",
      marks: "780",
      totalMarks: "850"
    }
  ],

  hasDisability: "no",
  isHafiz: "yes",
  sportsQuota: "yes",
  sportType: "Cricket",
  isOrphan: "no",
  needsHostel: "yes",

  guardianRelation: "Father",
  guardianName: "Muhammad Irfan",
  guardianPhone: "0333-7654321",
  guardianCNIC: "42101-7654321-1",
  permanentAddress: "House #123, Block 4, Gulshan-e-Iqbal",
  city: "Karachi",
  annualIncome: "500k-1m",

  interestedCity: "Karachi",
  interests: ["Computer Science", "Software Engineering", "Artificial Intelligence"],
  shift: "Morning",
  
  applicationStatus: "Profile Completed",
  completionPercentage: 100,
  studentId: "STU-2025-0892"
};

export default function StudentProfilePage() {
  const data = mockProfileData;

  const InfoItem = ({ label, value, icon: Icon, className }: { label: string, value: string | number | undefined, icon?: any, className?: string }) => (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2 text-text-muted">
        {Icon && <Icon size={12} className="shrink-0" />}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-bold text-text-main break-words leading-tight">{value || '-'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
        
        {/* Top Action Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-main">Student Profile</h1>
              <p className="text-xs text-text-muted font-medium">Manage your academic identity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl text-text-muted">
              <Share2 size={18} />
            </Button>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-text-body px-4" iconLeft={<Download size={16} />}>
              Export
            </Button>
            <Button className="h-10 rounded-xl bg-primary hover:bg-primary/90 px-6 shadow-lg shadow-primary/20" iconLeft={<Edit3 size={16} />}>
              Edit Profile
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Identity & Status (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Identity Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="h-24 bg-primary relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
              </div>
              <div className="px-6 pb-8 flex flex-col items-center -mt-12 relative z-10">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-[#1e2266] flex items-center justify-center text-white text-3xl font-bold">
                      {data.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary border-4 border-white rounded-full flex items-center justify-center text-white shadow-lg">
                    <CheckCircle2 size={14} />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-black text-text-main text-center">{data.fullName}</h2>
                <p className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full mt-2 border border-primary/10">
                  {data.studentId}
                </p>
                
                <div className="w-full mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-text-body">
                    <Mail size={16} className="text-text-muted" />
                    <span className="text-sm font-medium truncate">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-body">
                    <Phone size={16} className="text-text-muted" />
                    <span className="text-sm font-medium">{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-body">
                    <MapPin size={16} className="text-text-muted" />
                    <span className="text-sm font-medium">{data.city}</span>
                  </div>
                </div>

                {/* Compact Status Bar - Replaces the big dark box */}
                <div className="w-full mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Profile Strength</span>
                    <span className="text-[10px] font-bold text-primary">{data.completionPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.completionPercentage}%` }}
                      className="h-full bg-secondary" 
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    {['Personal', 'Academic', 'Docs'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[9px] font-bold text-text-muted uppercase">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Special Categories */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6"
            >
              <h3 className="text-sm font-bold text-text-main mb-6 flex items-center gap-2">
                <Award size={16} className="text-secondary" />
                Special Quotas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Hafiz', val: data.isHafiz, icon: Award },
                  { label: 'Sports', val: data.sportsQuota, icon: Trophy },
                  { label: 'Hostel', val: data.needsHostel, icon: Home },
                  { label: 'Disability', val: data.hasDisability, icon: Accessibility },
                ].map((item, i) => (
                  <div key={i} className={clsx(
                    "p-3 rounded-2xl border flex flex-col gap-2 transition-all",
                    item.val === 'yes' ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-100 opacity-60"
                  )}>
                    <item.icon size={14} className={item.val === 'yes' ? "text-primary" : "text-text-muted"} />
                    <span className="text-[10px] font-bold text-text-main">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center Column: Main Feed (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Personal Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <h3 className="text-lg font-bold text-text-main">Personal Details</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <InfoItem label="Father's Name" value={data.fatherName} icon={User} />
                <InfoItem label="CNIC Number" value={data.cnic} icon={FileText} />
                <InfoItem label="Date of Birth" value={data.dateOfBirth} icon={Calendar} />
                <InfoItem label="Gender" value={data.gender} icon={User} />
                <InfoItem label="Nationality" value="Pakistani" icon={ShieldCheck} />
              </div>
            </motion.div>

            {/* Academic Timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-bold text-text-main">Academic History</h3>
              </div>
              <div className="space-y-8">
                {data.educations.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-slate-100 last:border-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-secondary shadow-sm" />
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-text-main">{edu.type}</h4>
                        <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-1 rounded-md uppercase tracking-widest">
                          {edu.year}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <InfoItem label="Institute" value={edu.institute} />
                        <InfoItem label="Marks" value={`${edu.marks}/${edu.totalMarks}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Side Info (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Guardian Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6"
            >
              <h3 className="text-sm font-bold text-text-main mb-6 flex items-center gap-2">
                <Users size={16} className="text-primary" />
                Guardian Info
              </h3>
              <div className="flex flex-col gap-5">
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Guardian Name</p>
                  <p className="text-sm font-bold text-text-main">{data.guardianName}</p>
                </div>
                <InfoItem label="Relation" value={data.guardianRelation} icon={Heart} />
                <InfoItem label="Contact" value={data.guardianPhone} icon={Phone} />
              </div>
            </motion.div>

            {/* Preferences Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6"
            >
              <h3 className="text-sm font-bold text-text-main mb-6 flex items-center gap-2">
                <Building2 size={16} className="text-secondary" />
                Preferences
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="City" value={data.interestedCity} />
                  <InfoItem label="Shift" value={data.shift} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-text-body text-[10px] font-bold rounded-lg border border-slate-200">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

