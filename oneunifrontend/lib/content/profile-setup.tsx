import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStep } from '../../components/student/WelcomeScreen';
import { PersonalInfoStep } from '../../components/student/PersonalInfoStep';
import { AcademicBackgroundStep } from '../../components/student/AcademicBackgroundStep';
import { AdditionalQualificationsStep } from '../../components/student/AdditionalQualificationStep';
import { FamilyFinancialStep } from '../../components/student/GuardianInformationStep';
import { ProgramPreferenceStep } from '../../components/student/PreferenceStep';
import { DocumentUploadStep } from '../../components/student/DocumentUploadStep';
import { ReviewSubmitStep } from '../../components/student/ReviewSubmitStep';

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

const steps = [
  { id: 1, title: 'Welcome', component: WelcomeStep },
  { id: 2, title: 'Personal Info', component: PersonalInfoStep },
  { id: 3, title: 'Academic', component: AcademicBackgroundStep },
  { id: 4, title: 'Qualifications', component: AdditionalQualificationsStep },
  { id: 5, title: 'Family & Finance', component: FamilyFinancialStep },
  { id: 6, title: 'Programs', component: ProgramPreferenceStep },
  { id: 7, title: 'Documents', component: DocumentUploadStep },
  { id: 8, title: 'Review', component: ReviewSubmitStep },
];

export function ProfileSetup() {
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
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Header with Progress */}
      {currentStep > 1 && (
        <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
          <div className="max-w-[1200px] mx-auto px-[24px] py-[16px]">
            <div className="flex items-center justify-between mb-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] bg-[#2563eb] rounded-[10px] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-[16px] text-[#1e293b]">
                    Admission Profile Setup
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#64748b]">
                    Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
                  </p>
                </div>
              </div>
              <p className="font-['Inter:Medium',sans-serif] text-[14px] text-[#2563eb]">
                {Math.round(progress)}% Complete
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-[6px] bg-[#e2e8f0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-[24px] py-[40px]">
        <div className="w-full max-w-[800px]">
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