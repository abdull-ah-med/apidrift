"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator, { StepConfig } from '../../../../../components/layout/stepindicator';
import { WelcomeStep } from '../../../../../components/student/WelcomeScreen';
import { PersonalInfoStep } from '../../../../../components/student/PersonalInfoStep';
import { AcademicBackgroundStep } from '../../../../../components/student/AcademicBackgroundStep';
import { AdditionalQualificationsStep } from '../../../../../components/student/AdditionalQualificationStep';
import { FamilyFinancialStep } from '../../../../../components/student/GuardianInformationStep';
import { ProgramPreferenceStep } from '../../../../../components/student/PreferenceStep';
import { DocumentUploadStep } from '../../../../../components/student/DocumentUploadStep';
import { ReviewSubmitStep } from '../../../../../components/student/ReviewSubmitStep';
import { Sparkles, User, GraduationCap, Award, Users, School, FileText, CheckCircle } from 'lucide-react';

import { ProfileData } from '../../../../../lib/schemas/profile';

const steps: StepConfig[] = [
  { id: 1, title: 'Welcome',slug:"welcome", icon: Sparkles, component: WelcomeStep },
  { id: 2, title: 'Personal Info',slug:"personal", icon: User, component: PersonalInfoStep },
  { id: 3, title: 'Academic',slug:"academic", icon: GraduationCap, component: AcademicBackgroundStep },
  { id: 4, title: 'Qualifications',slug:"welcome", icon: Award, component: AdditionalQualificationsStep },
  { id: 5, title: 'Family & Finance',slug:"welcome", icon: Users, component: FamilyFinancialStep },
  { id: 6, title: 'Programs',slug:"welcome", icon: School, component: ProgramPreferenceStep },
  { id: 7, title: 'Documents',slug:"welcome", icon: FileText, component: DocumentUploadStep },
  { id: 8, title: 'Review',slug:"welcome", icon: CheckCircle, component: ReviewSubmitStep },
];



export default function testp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(8); // Set to 8 to allow free navigation for now
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    fatherName: '',
    cnic: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    photo: null,
    
    educations: [],
    
    hasDisability: 'no',
    disabilityType: '',
    isHafiz: 'no',
    sportsQuota: 'no',
    sportType: '',
    isOrphan: 'no',
    needsHostel: 'no',
    
    guardianRelation: '',
    guardianName: '',
    guardianPhone: '',
    guardianCNIC: '',
    permanentAddress: '',
    city: '',
    annualIncome: '',
    
    interestedCity: '',
    interests: [],
    shift: '',
    
    cnicDoc: null,
    cnicDocType: 'cnic',
    matricDoc: null,
    interDoc: null,
    interDocType: 'complete',
    domicileDoc: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep > maxStepReached) {
        setMaxStepReached(nextStep);
      }
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

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Step Indicator Component */}
      <StepIndicator 
        steps={steps} 
        currentStep={currentStep} 
        onStepChange={setCurrentStep} 
        maxCompletedStep={maxStepReached}
      />

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
              {CurrentStepComponent && (
              <CurrentStepComponent
                data={profileData}
                updateData={updateProfileData}
                onNext={handleNext}
                onBack={handleBack}
                onComplete={handleComplete}
              />)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}