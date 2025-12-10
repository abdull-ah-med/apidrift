import { WelcomeStep } from '../../components/student/WelcomeScreen';
import { PersonalInfoStep } from '../../components/student/PersonalInfoStep';
import { AcademicBackgroundStep } from '../../components/student/AcademicBackgroundStep';
import { AdditionalQualificationsStep } from '../../components/student/AdditionalQualificationStep';
import { FamilyFinancialStep } from '../../components/student/GuardianInformationStep';
import { ProgramPreferenceStep } from '../../components/student/PreferenceStep';
import { DocumentUploadStep } from '../../components/student/DocumentUploadStep';
import { ReviewSubmitStep } from '../../components/student/ReviewSubmitStep';
import { Sparkles, User, GraduationCap, Award, Users, School, FileText, CheckCircle } from 'lucide-react';
import { StepConfig } from '../../components/layout/stepindicator';

export const steps: StepConfig[] = [
  { id: 1, title: 'Welcome', slug: 'welcome', icon: Sparkles, component: WelcomeStep },
  { id: 2, title: 'Personal Info', slug: 'personal-info', icon: User, component: PersonalInfoStep },
  { id: 3, title: 'Academic', slug: 'academic', icon: GraduationCap, component: AcademicBackgroundStep },
  { id: 4, title: 'Qualifications', slug: 'qualifications', icon: Award, component: AdditionalQualificationsStep },
  { id: 5, title: 'Family & Finance', slug: 'family-finance', icon: Users, component: FamilyFinancialStep },
  { id: 6, title: 'Programs', slug: 'programs', icon: School, component: ProgramPreferenceStep },
  { id: 7, title: 'Documents', slug: 'documents', icon: FileText, component: DocumentUploadStep },
  { id: 8, title: 'Review', slug: 'review', icon: CheckCircle, component: ReviewSubmitStep },
];
