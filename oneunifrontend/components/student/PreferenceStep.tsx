import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, GraduationCap, Building2, Clock, Plus, X, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../../lib/content/profile-setup';
import clsx from 'clsx';
import Input from '../ui/input';

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

const degrees = [
  'BS Computer Science',
  'BS Software Engineering',
  'BS Information Technology',
  'BS Artificial Intelligence',
  'BS Data Science',
  'BS Electrical Engineering',
  'BS Civil Engineering',
  'BS Mechanical Engineering',
  'BBA (Business Administration)',
  'BS Economics',
  'BS Physics',
  'BS Mathematics',
  'BS Chemistry',
  'BS English',
  'BS Psychology',
  'BS Political Science',
];

const universities = [
  'NUST - National University of Sciences and Technology',
  'LUMS - Lahore University of Management Sciences',
  'FAST - National University of Computer and Emerging Sciences',
  'PIEAS - Pakistan Institute of Engineering and Applied Sciences',
  'GIKI - Ghulam Ishaq Khan Institute',
  'UET Lahore - University of Engineering and Technology',
  'UET Taxila - University of Engineering and Technology',
  'COMSATS University Islamabad',
  'Punjab University',
  'Karachi University',
  'Quaid-e-Azam University',
  'Air University',
  'Bahria University',
  'NED University of Engineering and Technology',
  'IBA - Institute of Business Administration',
];

export function ProgramPreferenceStep({ data, updateData, onNext, onBack }: ProgramPreferenceStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [degreeInput, setDegreeInput] = useState('');
  const [universityInput, setUniversityInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const target = e.target as HTMLSelectElement | HTMLInputElement;
    const { name, value } = target;
    updateData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addDegree = () => {
    if (!degreeInput) return;
    if (data.preferredDegrees.length >= 8) {
      setErrors(prev => ({ ...prev, degrees: 'Maximum 8 degrees allowed' }));
      return;
    }
    if (data.preferredDegrees.includes(degreeInput)) {
      setErrors(prev => ({ ...prev, degrees: 'Degree already added' }));
      return;
    }
    updateData({ preferredDegrees: [...data.preferredDegrees, degreeInput] });
    setDegreeInput('');
    if (errors.degrees) {
      setErrors(prev => ({ ...prev, degrees: '' }));
    }
  };

  const removeDegree = (index: number) => {
    const newDegrees = data.preferredDegrees.filter((_, i) => i !== index);
    updateData({ preferredDegrees: newDegrees });
  };

  const addUniversity = () => {
    if (!universityInput) return;
    if (data.preferredUniversities.length >= 5) {
      setErrors(prev => ({ ...prev, universities: 'Maximum 5 universities allowed' }));
      return;
    }
    if (data.preferredUniversities.includes(universityInput)) {
      setErrors(prev => ({ ...prev, universities: 'University already added' }));
      return;
    }
    updateData({ preferredUniversities: [...data.preferredUniversities, universityInput] });
    setUniversityInput('');
    if (errors.universities) {
      setErrors(prev => ({ ...prev, universities: '' }));
    }
  };

  const removeUniversity = (index: number) => {
    const newUniversities = data.preferredUniversities.filter((_, i) => i !== index);
    updateData({ preferredUniversities: newUniversities });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.interestedCity) newErrors.interestedCity = 'City preference is required';
    if (data.preferredDegrees.length === 0) newErrors.degrees = 'Add at least one degree';
    if (data.preferredUniversities.length === 0) newErrors.universities = 'Add at least one university';
    if (!data.shift) newErrors.shift = 'Shift preference is required';

    setErrors(newErrors);
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
        <p className="text-slate-500">Select your preferred location, degrees, and universities.</p>
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

              <div className="flex flex-col gap-[6px]">
                <label htmlFor="interestedCity" className="font-['Inter:Medium',sans-serif] text-[14px] text-slate-700 ml-1">
                  Preferred City <span className="text-red-500">*</span>
                </label>
                <select
                  id="interestedCity"
                  name="interestedCity"
                  value={data.interestedCity}
                  onChange={handleChange}
                  className={clsx(
                    "w-full px-[20px] py-[14px] bg-white border rounded-xl font-['Inter:Regular',sans-serif] text-[15px] text-slate-900 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-4",
                    errors.interestedCity 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-500/10"
                  )}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.interestedCity && (
                  <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.interestedCity}</p>
                )}
              </div>
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

          {/* Bottom Row: Degrees & Universities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Degrees Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <GraduationCap size={16} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Degrees</h3>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  {data.preferredDegrees.length}/8
                </span>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-2">
                  <select
                    value={degreeInput}
                    onChange={(e) => setDegreeInput(e.target.value)}
                    className="flex-1 px-[16px] py-[12px] bg-white border border-slate-200 rounded-xl font-['Inter:Regular',sans-serif] text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select degree</option>
                    {degrees.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addDegree}
                    disabled={data.preferredDegrees.length >= 8}
                    className="px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {errors.degrees && (
                  <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.degrees}</p>
                )}

                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {data.preferredDegrees.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl"
                      >
                        No degrees added yet
                      </motion.div>
                    )}
                    {data.preferredDegrees.map((degree, index) => (
                      <motion.div
                        key={degree}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl group"
                      >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-medium text-slate-500 border border-slate-200 shadow-sm">
                          {index + 1}
                        </div>
                        <p className="flex-1 text-sm font-medium text-slate-700 line-clamp-1" title={degree}>
                          {degree}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeDegree(index)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Universities Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Building2 size={16} className="text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Universities</h3>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  {data.preferredUniversities.length}/5
                </span>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-2">
                  <select
                    value={universityInput}
                    onChange={(e) => setUniversityInput(e.target.value)}
                    className="flex-1 px-[16px] py-[12px] bg-white border border-slate-200 rounded-xl font-['Inter:Regular',sans-serif] text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select university</option>
                    {universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addUniversity}
                    disabled={data.preferredUniversities.length >= 5}
                    className="px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {errors.universities && (
                  <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.universities}</p>
                )}

                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {data.preferredUniversities.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl"
                      >
                        No universities added yet
                      </motion.div>
                    )}
                    {data.preferredUniversities.map((uni, index) => (
                      <motion.div
                        key={uni}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl group"
                      >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-medium text-slate-500 border border-slate-200 shadow-sm">
                          {index + 1}
                        </div>
                        <p className="flex-1 text-sm font-medium text-slate-700 line-clamp-1" title={uni}>
                          {uni}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeUniversity(index)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
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
                  <span className="text-xs text-slate-600">Degrees</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{data.preferredDegrees.length}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-600">Universities</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{data.preferredUniversities.length}</span>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
            >
              Save & Continue
              <ChevronRight size={18} />
            </motion.button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center justify-center gap-2 hover:bg-slate-50 rounded-lg"
            >
              <ChevronLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
