import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, GraduationCap, Building2, Clock, Plus, X, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateProgramPreferences } from '../../lib/validation/validate';
import clsx from 'clsx';
import Input from '../ui/input';
import Select from '../ui/select';
import Button from '../ui/button';

interface ProgramPreferenceStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const cities = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
];

const interestsList = [
  'Computer Science',
  'Software Engineering',
  'Artificial Intelligence',
  'Data Science',
  'Cyber Security',
  'Business Administration',
  'Marketing',
  'Finance',
  'Accounting',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Architecture',
  'Graphic Design',
  'Digital Media',
  'Psychology',
  'Economics',
  'International Relations',
  'Law',
  'Medicine',
  'Pharmacy',
  'Biotechnology',
  'Environmental Sciences',
  'English Literature',
];

export function ProgramPreferenceStep({ data, updateData, onNext, onBack }: ProgramPreferenceStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interestInput, setInterestInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const target = e.target as HTMLSelectElement | HTMLInputElement;
    const { name, value } = target;
    updateData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addInterest = () => {
    if (!interestInput) return;
    if (data.interests.length >= 10) {
      setErrors(prev => ({ ...prev, interests: 'Maximum 10 interests allowed' }));
      return;
    }
    if (data.interests.includes(interestInput)) {
      setErrors(prev => ({ ...prev, interests: 'Interest already added' }));
      return;
    }
    updateData({ interests: [...data.interests, interestInput] });
    setInterestInput('');
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }));
    }
  };

  const removeInterest = (index: number) => {
    const newInterests = data.interests.filter((_, i) => i !== index);
    updateData({ interests: newInterests });
  };

  const validate = () => {
    const newErrors = ValidateProgramPreferences(data);
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
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Program Preferences</h1>
        <p className="text-slate-500">Select your preferred location, shift, and areas of interest.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Content (9 cols) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Top Row: Location & Shift */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Location</h3>
              </div>

              <Select
                label={<>Preferred City <span className="text-red-500">*</span></>}
                name="interestedCity"
                value={data.interestedCity}
                onChange={handleChange as any}
                error={errors.interestedCity}
                options={[
                  { label: "Select city", value: "" },
                  ...cities.map(city => ({ label: city, value: city }))
                ]}
              />
            </div>

            {/* Shift Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Clock size={16} className="text-amber-500" />
                </div>
                <h3 className="font-semibold text-slate-900">Class Shift</h3>
              </div>

              <div className="flex flex-col gap-3">
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="shift"
                    value="morning"
                    checked={data.shift === 'morning'}
                    onChange={handleChange}
                    className="peer hidden"
                  />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50/50 peer-checked:shadow-sm transition-all group-hover:border-slate-300">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-slate-900 text-sm">Morning</p>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">8AM - 2PM</span>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="shift"
                    value="evening"
                    checked={data.shift === 'evening'}
                    onChange={handleChange}
                    className="peer hidden"
                  />
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50/50 peer-checked:shadow-sm transition-all group-hover:border-slate-300">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-slate-900 text-sm">Evening</p>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">2PM - 8PM</span>
                    </div>
                  </div>
                </label>
                {errors.shift && (
                  <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.shift}</p>
                )}
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Areas of Interest</h3>
                  <p className="text-xs text-slate-500">Select up to 10 fields you are interested in</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                {data.interests.length}/10
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <Select
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    options={[
                      { label: "Select an interest", value: "" },
                      ...interestsList.map(interest => ({ label: interest, value: interest }))
                    ]}
                  />
                </div>
                <Button
                  onClick={addInterest}
                  disabled={data.interests.length >= 10 || !interestInput}
                  className="h-[50px] px-6 rounded-xl shadow-sm"
                  iconLeft={<Plus size={20} />}
                >
                  Add
                </Button>
              </div>
              
              {errors.interests && (
                <p className="text-sm text-red-500 font-medium -mt-4 ml-1">{errors.interests}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                  {data.interests.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50"
                    >
                      No interests added yet. Select from the list above.
                    </motion.div>
                  )}
                  {data.interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl group hover:border-blue-200 hover:shadow-sm transition-all"
                    >
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-100">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-sm font-semibold text-slate-700">
                        {interest}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeInterest(index)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Summary Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-semibold text-slate-900">Selection Summary</h3>
            
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-600">City</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{data.interestedCity || '-'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-600">Shift</span>
                </div>
                <span className="text-sm font-medium text-slate-900 capitalize">{data.shift || '-'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-600">Interests</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{data.interests.length}</span>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <Button
              onClick={handleNext}
              className="w-full py-3.5 rounded-lg shadow-sm"
              iconRight={<ChevronRight size={18} />}
            >
              Save & Continue
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full py-3 text-slate-600 hover:bg-slate-50 rounded-lg"
              iconLeft={<ChevronLeft size={18} />}
            >
              Go Back
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
