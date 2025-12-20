import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, Phone, CreditCard, Home, MapPin, DollarSign, Users } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateGuardianInformation } from '../../lib/validation/validate';
import Input from '../ui/input';
import Select from '../ui/select';
import Button from '../ui/button';
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
            <Select
              label={<>Relation <span className="text-red-500">*</span></>}
              name="guardianRelation"
              value={data.guardianRelation}
              onChange={handleChange as any}
              error={errors.guardianRelation}
              options={[
                { label: "Select relation", value: "" },
                { label: "Father", value: "father" },
                { label: "Mother", value: "mother" },
                { label: "Brother", value: "brother" },
                { label: "Sister", value: "sister" },
                { label: "Uncle", value: "uncle" },
                { label: "Aunt", value: "aunt" },
                { label: "Grandfather", value: "grandfather" },
                { label: "Grandmother", value: "grandmother" },
                { label: "Other", value: "other" },
              ]}
            />

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
            <Select
              label={<>Annual Income <span className="text-red-500">*</span></>}
              name="annualIncome"
              value={data.annualIncome}
              onChange={handleChange as any}
              error={errors.annualIncome}
              leftIcon={<DollarSign size={18} />}
              options={[
                { label: "Select income range", value: "" },
                { label: "Below PKR 300,000", value: "below-300k" },
                { label: "PKR 300,000 - 500,000", value: "300k-500k" },
                { label: "PKR 500,000 - 1,000,000", value: "500k-1m" },
                { label: "PKR 1,000,000 - 2,000,000", value: "1m-2m" },
                { label: "Above PKR 2,000,000", value: "above-2m" },
              ]}
            />
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
            <Button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl shadow-lg shadow-blue-600/10"
              iconRight={<ChevronRight size={18} />}
            >
              Save & Continue
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full py-3 text-slate-500 hover:text-slate-900"
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
