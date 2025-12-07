import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, CreditCard, Calendar, Phone, Mail, Camera } from 'lucide-react';
import { ProfileData } from '../../lib/content/profile-setup';
import Input from '../ui/input';

interface PersonalInfoStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({ data, updateData, onNext, onBack }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ photo: file });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) newErrors.fullName = 'Required';
    if (!data.fatherName.trim()) newErrors.fatherName = 'Required';
    if (!data.cnic.trim()) newErrors.cnic = 'Required';
    else if (!/^\d{5}-\d{7}-\d{1}$/.test(data.cnic)) newErrors.cnic = 'Format: 12345-1234567-1';
    if (!data.dateOfBirth) newErrors.dateOfBirth = 'Required';
    if (!data.gender) newErrors.gender = 'Required';
    if (!data.phone.trim()) newErrors.phone = 'Required';
    if (!data.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Invalid email';

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
                error={errors.fullName}
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
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="gender" className="font-['Inter:Medium',sans-serif] text-[14px] text-slate-700 ml-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  className={`w-full px-[20px] py-[14px] bg-white border rounded-xl font-['Inter:Regular',sans-serif] text-[15px] text-slate-900 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-4 ${
                    errors.gender 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-500/10"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="font-['Inter:Medium',sans-serif] text-[12px] text-red-500 ml-1">{errors.gender}</p>}
              </div>

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