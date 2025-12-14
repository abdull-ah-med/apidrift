import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, Phone, CreditCard, Home, MapPin, DollarSign, Users } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateGuardianInformation } from '../../lib/validation/validate';
import Input from '../ui/input';
import clsx from 'clsx';

interface FamilyFinancialStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FamilyFinancialStep({ data, updateData, onNext, onBack }: FamilyFinancialStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = ValidateGuardianInformation(data);
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
        <h1 className="text-2xl font-bold text-slate-900">Family & Financial</h1>
        <p className="text-slate-500">Provide guardian details and household financial information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Column 1: Guardian Information */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Guardian Details</h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* Guardian Relation */}
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="guardianRelation" className="font-['Inter:Medium',sans-serif] text-[14px] text-slate-700 ml-1">
                Relation <span className="text-red-500">*</span>
              </label>
              <select
                id="guardianRelation"
                name="guardianRelation"
                value={data.guardianRelation}
                onChange={handleChange}
                className={clsx(
                  "w-full px-[20px] py-[14px] bg-white border rounded-xl font-['Inter:Regular',sans-serif] text-[15px] text-slate-900 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-4",
                  errors.guardianRelation 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                    : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-500/10"
                )}
              >
                <option value="">Select relation</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
                <option value="uncle">Uncle</option>
                <option value="aunt">Aunt</option>
                <option value="grandfather">Grandfather</option>
                <option value="grandmother">Grandmother</option>
                <option value="other">Other</option>
              </select>
              {errors.guardianRelation && (
                <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.guardianRelation}</p>
              )}
            </div>

            {/* Guardian Name */}
            <Input
              label={<>Guardian Name <span className="text-red-500">*</span></>}
              name="guardianName"
              value={data.guardianName}
              onChange={handleChange}
              placeholder="Enter name"
              leftIcon={<User size={18} />}
              error={errors.guardianName}
            />

            {/* Guardian Phone */}
            <Input
              label={<>Guardian Phone <span className="text-red-500">*</span></>}
              name="guardianPhone"
              type="tel"
              value={data.guardianPhone}
              onChange={handleChange}
              placeholder="03XX-XXXXXXX"
              leftIcon={<Phone size={18} />}
              error={errors.guardianPhone}
            />

            {/* Guardian CNIC */}
            <Input
              label={<>Guardian CNIC <span className="text-red-500">*</span></>}
              name="guardianCNIC"
              value={data.guardianCNIC}
              onChange={handleChange}
              placeholder="12345-1234567-1"
              leftIcon={<CreditCard size={18} />}
              error={errors.guardianCNIC}
            />
          </div>
        </div>

        {/* Column 2: Residential & Financial */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Home size={16} className="text-amber-500" />
            </div>
            <h3 className="font-semibold text-slate-900">Residential Info</h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* Permanent Address */}
            <Input
              label={<>Permanent Address <span className="text-red-500">*</span></>}
              name="permanentAddress"
              value={data.permanentAddress}
              onChange={handleChange}
              placeholder="House/Street/Area"
              leftIcon={<MapPin size={18} />}
              error={errors.permanentAddress}
            />

            {/* City */}
            <Input
              label={<>City <span className="text-red-500">*</span></>}
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Enter your city"
              error={errors.city}
            />

            {/* Annual Income */}
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="annualIncome" className="font-['Inter:Medium',sans-serif] text-[14px] text-slate-700 ml-1">
                Annual Income <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <DollarSign size={18} />
                </div>
                <select
                  id="annualIncome"
                  name="annualIncome"
                  value={data.annualIncome}
                  onChange={handleChange}
                  className={clsx(
                    "w-full pl-[48px] pr-[20px] py-[14px] bg-white border rounded-xl font-['Inter:Regular',sans-serif] text-[15px] text-slate-900 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-4",
                    errors.annualIncome 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-500/10"
                  )}
                >
                  <option value="">Select income range</option>
                  <option value="below-300k">Below PKR 300,000</option>
                  <option value="300k-500k">PKR 300,000 - 500,000</option>
                  <option value="500k-1m">PKR 500,000 - 1,000,000</option>
                  <option value="1m-2m">PKR 1,000,000 - 2,000,000</option>
                  <option value="above-2m">Above PKR 2,000,000</option>
                </select>
              </div>
              {errors.annualIncome && (
                <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.annualIncome}</p>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Summary & Actions */}
        <div className="flex flex-col gap-6">
          {/* Summary Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-semibold text-slate-900">Quick Summary</h3>
            
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                  <User size={14} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Guardian</p>
                  <p className="text-sm font-medium text-slate-900">{data.guardianName || 'Not set'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                  <Phone size={14} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Contact</p>
                  <p className="text-sm font-medium text-slate-900">{data.guardianPhone || 'Not set'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                  <MapPin size={14} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">City</p>
                  <p className="text-sm font-medium text-slate-900">{data.city || 'Not set'}</p>
                </div>
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
