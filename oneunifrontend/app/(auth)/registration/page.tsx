"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RegistrationFormSection from "@/components/sections/(Auth)/registrationform-section";
import CreatePasswordForm from "@/components/forms/CreatePasswordForm";
import SuccessModal from "@/components/ui/success-modal";
import StepIndicator from "@/components/ui/stepIndicator";
import Content from "@/components/sections/(Auth)/content-section";

type Role = "student" | "mentor" | "";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "" as Role,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleSelect = (role: Role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.role) {
        newErrors.role = "Please select your role";
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setIsComplete(true);
        setTimeout(() => {
          console.log("Form submitted:", formData);
        }, 2000);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseModal = () => {
    setIsComplete(false);
  };

  return (
    <>
      <SuccessModal
        isOpen={isComplete}
        title="Welcome aboard!"
        description="Your account has been created successfully. You can now access all the resources and features."
        firstName={formData.fullName.split(" ")[0]}
        onClose={handleCloseModal}
        actionLabel="Get Started"
        onAction={handleCloseModal}
      />
      <section className="min-h-screen flex flex-col lg:flex-row">
        <Content />
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex"
            >
              <RegistrationFormSection
                formData={{
                  fullName: formData.fullName,
                  email: formData.email,
                  role: formData.role,
                }}
                errors={errors}
                onChange={handleChange}
                onRoleSelect={handleRoleSelect}
                onNext={handleNext}
                currentStep={currentStep}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white w-full min-h-screen"
            >
              <div className="flex flex-col gap-[32px] w-full max-w-[480px]">
                {/* Step Indicator */}
                <StepIndicator totalSteps={2} currentStep={currentStep} />

                {/* Form Content */}
                <div className="w-full">
                  <CreatePasswordForm
                    formData={{
                      password: formData.password,
                      confirmPassword: formData.confirmPassword,
                    }}
                    errors={errors}
                    onChange={handleChange}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-[12px] w-full">
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-[8px] px-[24px] py-[14px] bg-white border-2 border-slate-200 hover:border-slate-300 rounded-[10px] font-medium text-[16px] text-text-muted transition-all"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-[8px] px-[32px] py-[14px] bg-primary hover:bg-primary/90 rounded-[10px] font-semibold text-[16px] text-white transition-all shadow-md"
                  >
                    Create Account
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
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
