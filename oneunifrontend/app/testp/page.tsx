"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator, { StepConfig } from '../../components/layout/stepindicator';
import { WelcomeStep } from '../../components/student/WelcomeScreen';
import { PersonalInfoStep } from '../../components/student/PersonalInfoStep';
import { AcademicBackgroundStep } from '../../components/student/AcademicBackgroundStep';
import { AdditionalQualificationsStep } from '../../components/student/AdditionalQualificationStep';
import { FamilyFinancialStep } from '../../components/student/GuardianInformationStep';
import { ProgramPreferenceStep } from '../../components/student/PreferenceStep';
import { DocumentUploadStep } from '../../components/student/DocumentUploadStep';
import { ReviewSubmitStep } from '../../components/student/ReviewSubmitStep';
import { Sparkles, User, GraduationCap, Award, Users, School, FileText, CheckCircle } from 'lucide-react';

export interface ProfileData {
  // Personal Info
  fullName: string;
  fatherName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  photo: File | null;
  
  // Academic Background
  matricInstitute: string;
  matricBoard: string;
  matricYear: string;
  matricMarks: string;
  matricTotalMarks: string;
  
  interInstitute: string;
  interBoard: string;
  interYear: string;
  interMarks: string;
  interTotalMarks: string;
  
  // Additional Qualifications
  hasDisability: string;
  disabilityType: string;
  isHafiz: string;
  sportsQuota: string;
  sportType: string;
  
  // Family & Financial
  guardianRelation: string;
  guardianName: string;
  guardianPhone: string;
  guardianCNIC: string;
  permanentAddress: string;
  city: string;
  annualIncome: string;
  
  // Program Preferences
  interestedCity: string;
  preferredDegrees: string[];
  preferredUniversities: string[];
  shift: string;
  
  // Documents
  cnicDoc: File | null;
  matricDoc: File | null;
  interDoc: File | null;
  domicileDoc: File | null;
}

const steps: StepConfig[] = [
  { id: 1, title: 'Welcome', icon: Sparkles, component: WelcomeStep },
  { id: 2, title: 'Personal Info', icon: User, component: PersonalInfoStep },
  { id: 3, title: 'Academic', icon: GraduationCap, component: AcademicBackgroundStep },
  { id: 4, title: 'Qualifications', icon: Award, component: AdditionalQualificationsStep },
  { id: 5, title: 'Family & Finance', icon: Users, component: FamilyFinancialStep },
  { id: 6, title: 'Programs', icon: School, component: ProgramPreferenceStep },
  { id: 7, title: 'Documents', icon: FileText, component: DocumentUploadStep },
  { id: 8, title: 'Review', icon: CheckCircle, component: ReviewSubmitStep },
];

export default function testp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    fatherName: '',
    cnic: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    photo: null,
    
    matricInstitute: '',
    matricBoard: '',
    matricYear: '',
    matricMarks: '',
    matricTotalMarks: '',
    
    interInstitute: '',
    interBoard: '',
    interYear: '',
    interMarks: '',
    interTotalMarks: '',
    
    hasDisability: 'no',
    disabilityType: '',
    isHafiz: 'no',
    sportsQuota: 'no',
    sportType: '',
    
    guardianRelation: '',
    guardianName: '',
    guardianPhone: '',
    guardianCNIC: '',
    permanentAddress: '',
    city: '',
    annualIncome: '',
    
    interestedCity: '',
    preferredDegrees: [],
    preferredUniversities: [],
    shift: '',
    
    cnicDoc: null,
    matricDoc: null,
    interDoc: null,
    domicileDoc: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log('Profile completed:', profileData);
    // Handle final submission
  };

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Step Indicator Component */}
      <StepIndicator steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-[16px] md:p-[24px] py-[32px] md:py-[40px]">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                data={profileData}
                updateData={updateProfileData}
                onNext={handleNext}
                onBack={handleBack}
                onComplete={handleComplete}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}