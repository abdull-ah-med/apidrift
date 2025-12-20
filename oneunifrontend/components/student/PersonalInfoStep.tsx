import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, CreditCard, Calendar, Phone, Mail, Camera } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import Input from '../ui/input';
import Select from '../ui/select';
import Button from '../ui/button';
import { ValidatePersonalInfo, InfoErrors } from '@/lib/validation/validate';

interface PersonalInfoStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({ data, updateData, onNext, onBack }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<InfoErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    if (errors[name as keyof InfoErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ photo: file });
  };

  const handleNext = () => {
    const newErrors=ValidatePersonalInfo(data);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((msg) => msg && msg.length);
    if (!hasErrors) {
      onNext();
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Personal Information</h1>
        <p className="text-slate-500">Provide your basic details as they appear on official documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content - Form */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <Input
                label={<>Full Name <span className="text-red-500">*</span></>}
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                leftIcon={<User size={18} />}
                error={(errors.fullName)}
              />

              {/* Father Name */}
              <Input
                label={<>Father's Name <span className="text-red-500">*</span></>}
                name="fatherName"
                value={data.fatherName}
                onChange={handleChange}
                placeholder="Father's name"
                leftIcon={<User size={18} />}
                error={errors.fatherName}
              />

              {/* CNIC */}
              <Input
                label={<>CNIC <span className="text-red-500">*</span></>}
                name="cnic"
                value={data.cnic}
                onChange={handleChange}
                placeholder="12345-1234567-1"
                leftIcon={<CreditCard size={18} />}
                error={errors.cnic}
              />

              {/* Date of Birth */}
              <Input
                label={<>Date of Birth <span className="text-red-500">*</span></>}
                name="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={handleChange}
                leftIcon={<Calendar size={18} />}
                error={errors.dateOfBirth}
              />

              {/* Gender */}
              <Select
                label={<>Gender <span className="text-red-500">*</span></>}
                name="gender"
                value={data.gender}
                onChange={handleChange as any}
                error={errors.gender}
                options={[
                  { label: "Select Gender", value: "" },
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />

              {/* Phone */}
              <Input
                label={<>Phone <span className="text-red-500">*</span></>}
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                leftIcon={<Phone size={18} />}
                error={errors.phone}
              />

              {/* Email - Full Width */}
              <div className="md:col-span-2">
                <Input
                  label={<>Email Address <span className="text-red-500">*</span></>}
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  leftIcon={<Mail size={18} />}
                  error={errors.email}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Photo Upload Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="relative group">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                {data.photo ? (
                  <img src={URL.createObjectURL(data.photo)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-300" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-all shadow-lg hover:scale-110 active:scale-95">
                <Camera size={18} />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Profile Photo</h3>
              <p className="text-xs text-slate-500 mt-1">Upload a clear passport-size photo</p>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
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