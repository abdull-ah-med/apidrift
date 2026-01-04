"use client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import StepIndicator from "@/components/ui/stepIndicator";
import RegistrationForm from "@/components/forms/RegistrationForm";

type Role = "student" | "mentor" | "";

type RegistrationFormSectionProps = {
  formData: {
    fullName: string;
    email: string;
    role: Role;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleSelect: (role: Role) => void;
  onNext: () => void;
  currentStep: number;
};

export default function RegistrationFormSection({
  formData,
  errors,
  onChange,
  onRoleSelect,
  onNext,
  currentStep,
}: RegistrationFormSectionProps) {
  return (
    <>
      {/* Right Side - Form Area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <div className="flex flex-col gap-[32px] w-full max-w-[480px]">
          {/* Step Indicator */}
          <StepIndicator totalSteps={2} currentStep={currentStep} />

          {/* Form Content */}
          <div className="w-full">
            <RegistrationForm
              formData={formData}
              errors={errors}
              onChange={onChange}
              onRoleSelect={onRoleSelect}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-[12px] w-full">
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-[8px] px-[32px] py-[14px] bg-primary hover:bg-primary/90 rounded-[10px] font-semibold text-[16px] text-white transition-all shadow-md"
            >
              Continue
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-[8px] w-full pt-[8px]">
            <p className="text-[14px] text-text-muted">
              Already have an account?
            </p>
            <button
              type="button"
              className="font-medium text-[14px] text-primary hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
