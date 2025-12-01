"use client";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Briefcase, BookOpen } from "lucide-react";
import Input from "@/components/ui/input";
import RoleSelector from "@/components/ui/role-selector";

type Role = "student" | "mentor" | "";

type RegistrationFormProps = {
  formData: {
    fullName: string;
    email: string;
    role: Role;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleSelect: (role: Role) => void;
};

export default function RegistrationForm({
  formData,
  errors,
  onChange,
  onRoleSelect,
}: RegistrationFormProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-[32px]"
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-['Inter:Semi_Bold',sans-serif] text-[28px] text-[#1e293b]">
          Create your account
        </h2>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Full Name */}
        <Input
          name="fullName"
          placeholder="John Doe"
          label="Full Name"
          value={formData.fullName}
          onChange={onChange}
          leftIcon={<User size={18} />}
          error={errors.fullName}
        />

        {/* Email */}
        <Input
          name="email"
          placeholder="example@email.com"
          label="Email"
          type="email"
          value={formData.email}
          onChange={onChange}
          leftIcon={<Mail size={18} />}
          error={errors.email}
        />

        {/* Role Selection */}
        <div className="flex flex-col gap-[12px]">
          <label className="font-['Inter:Medium',sans-serif] text-[14px] text-[#334155]">
            I am a
          </label>
          <div className="flex gap-[12px]">
            <RoleSelector
              roleId="student"
              label="Student"
              icon={GraduationCap}
              isSelected={formData.role === "student"}
              onRoleSelect={onRoleSelect}
            />
            <RoleSelector
              roleId="mentor"
              label="Mentor"
              icon={Briefcase}
              isSelected={formData.role === "mentor"}
              onRoleSelect={onRoleSelect}
            />
          </div>
          {errors.role && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-['Inter:Regular',sans-serif] text-[13px] text-[#ef4444]"
            >
              {errors.role}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
