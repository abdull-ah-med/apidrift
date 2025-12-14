import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookMarked, Trophy, AlertCircle, Check } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateAdditionalQualifications } from '../../lib/validation/validate';
import Input from '../ui/input';
import clsx from 'clsx';

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

  const OptionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    colorClass, 
    bgClass,
    name, 
    value, 
    children 
  }: any) => {
    const isYes = value === 'yes';
    
    return (
      <div className={clsx(
        "p-6 rounded-xl border transition-all duration-200 flex flex-col gap-4 h-full",
        isYes ? "bg-white shadow-md ring-1 ring-slate-200 border-slate-200" : "bg-white border-slate-200 shadow-sm hover:shadow-md"
      )}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", bgClass)}>
              <Icon size={20} className={colorClass} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
          
          {isYes && (
            <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center", bgClass)}>
              <Check size={14} className={colorClass} />
            </div>
          )}
        </div>

        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <label className={clsx(
            "flex-1 py-2 text-sm font-medium rounded-md text-center cursor-pointer transition-all",
            value === 'no' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}>
            <input type="radio" name={name} value="no" checked={value === 'no'} onChange={handleChange} className="hidden" />
            No
          </label>
          <label className={clsx(
            "flex-1 py-2 text-sm font-medium rounded-md text-center cursor-pointer transition-all",
            value === 'yes' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}>
            <input type="radio" name={name} value="yes" checked={value === 'yes'} onChange={handleChange} className="hidden" />
            Yes
          </label>
        </div>

        <AnimatePresence>
          {isYes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Additional Qualifications</h1>
        <p className="text-slate-500">Select any special qualifications or quotas that apply to you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OptionCard
          title="Hafiz-e-Quran"
          description="20 marks added to merit"
          icon={BookMarked}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
          name="isHafiz"
          value={data.isHafiz}
        >
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-700">
            You will need to pass the Hifz test conducted by the university.
          </div>
        </OptionCard>

        <OptionCard
          title="Sports Quota"
          description="Apply for sports seat"
          icon={Trophy}
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
          name="sportsQuota"
          value={data.sportsQuota}
        >
          <Input
            label="Sport Type"
            name="sportType"
            value={data.sportType}
            onChange={handleChange}
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
        >
          <Input
            label="Disability Type"
            name="disabilityType"
            value={data.disabilityType}
            onChange={handleChange}
            placeholder="Specify disability"
            error={errors.disabilityType}
          />
        </OptionCard>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center gap-2 hover:bg-slate-50 rounded-lg"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        
        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          Continue
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
