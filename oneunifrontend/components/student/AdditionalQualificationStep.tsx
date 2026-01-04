import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookMarked, Trophy, AlertCircle, Heart, Home } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateAdditionalQualifications } from '../../lib/validation/validate';
import Input from '../ui/input';
import Button from '../ui/button';
import { OptionCard } from './OptionCard';

interface AdditionalQualificationsStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AdditionalQualificationsStep({ data, updateData, onNext, onBack }: AdditionalQualificationsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    
    // Clear dependent fields
    if (name === 'hasDisability' && value === 'no') {
      updateData({ disabilityType: '' });
    }
    if (name === 'sportsQuota' && value === 'no') {
      updateData({ sportType: '' });
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = ValidateAdditionalQualifications(data);
    setErrors(newErrors as Record<string, string>);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text-main">Additional Qualifications</h1>
        <p className="text-text-muted">Select any special qualifications or quotas that apply to you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OptionCard
          title="Hafiz-e-Quran"
          description="20 marks added to merit"
          icon={BookMarked}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
          name="isHafiz"
          value={data.isHafiz}
          onChange={handleChange as any}
        >
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-700">
            You will need to pass the Hifz test conducted by the university.
          </div>
        </OptionCard>

        <OptionCard
          title="Sports Quota"
          description="Apply for sports seat"
          icon={Trophy}
          colorClass="text-primary"
          bgClass="bg-primary/5"
          name="sportsQuota"
          value={data.sportsQuota}
          onChange={handleChange as any}
        >
          <Input
            label="Sport Type"
            name="sportType"
            value={data.sportType}
            onChange={handleChange as any}
            placeholder="e.g., Cricket"
            error={errors.sportType}
          />
        </OptionCard>

        <OptionCard
          title="Disability"
          description="Special needs quota"
          icon={AlertCircle}
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
          name="hasDisability"
          value={data.hasDisability}
          onChange={handleChange as any}
        >
          <Input
            label="Disability Type"
            name="disabilityType"
            value={data.disabilityType}
            onChange={handleChange as any}
            placeholder="Specify disability"
            error={errors.disabilityType}
          />
        </OptionCard>

        <OptionCard
          title="Orphan"
          description="Special financial support"
          icon={Heart}
          colorClass="text-rose-600"
          bgClass="bg-rose-50"
          name="isOrphan"
          value={data.isOrphan}
          onChange={handleChange as any}
        >
          <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 text-xs text-rose-700">
            You may be eligible for special scholarships or fee waivers.
          </div>
        </OptionCard>

        <OptionCard
          title="Hostel Facility"
          description="University affiliated hostel"
          icon={Home}
          colorClass="text-indigo-600"
          bgClass="bg-indigo-50"
          name="needsHostel"
          value={data.needsHostel}
          onChange={handleChange as any}
        >
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-xs text-indigo-700">
            Hostel allotment is subject to availability and merit.
          </div>
        </OptionCard>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="px-6 py-2.5 text-text-body hover:bg-slate-50 rounded-xl"
          iconLeft={<ChevronLeft size={20} />}
        >
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          className="px-10 py-2.5 rounded-xl shadow-md"
          iconRight={<ChevronRight size={20} />}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
