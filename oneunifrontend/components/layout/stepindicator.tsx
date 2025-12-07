import { motion } from "framer-motion";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

export interface StepConfig {
  id: number;
  title: string;
  icon: LucideIcon;
  component: React.ComponentType<any>;
}

interface StepIndicatorProps {
  steps: StepConfig[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepChange }: StepIndicatorProps) {
  return (
    <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
      <div className="w-full mx-auto px-[16px] md:px-[24px] py-[24px] md:pb-[20px] pb-[24px] md:pt-[25px] ">
        {/* Desktop: Horizontal Step Indicator */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative mb-6">
            {/* Connecting Progress Bar */}
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[#e2e8f0] -translate-y-1/2 -z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6]"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>

            {/* Step Circles */}
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center gap-2.5 relative z-10"
                >
                  {/* Circle */}
                  <motion.div
                    className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      index + 1 < currentStep
                        ? "bg-[#22c55e]"
                        : index + 1 === currentStep
                        ? "bg-[#2563eb] ring-4 ring-blue-500/20"
                        : "bg-white border-2 border-[#e2e8f0]"
                    }`}
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1 < currentStep ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <StepIcon
                        className={`${
                          index + 1 === currentStep
                            ? "text-white"
                            : "text-[#94a3b8]"
                        }`}
                        size={22}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <p
                    className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                      index + 1 <= currentStep
                        ? "text-[#1e293b]"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    {step.title}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Text */}
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-[#64748b]">
              <span className="font-semibold text-[#1e293b]">
                Step {currentStep}
              </span>{" "}
              of {steps.length}
            </p>
            <p className="text-sm font-medium text-[#2563eb]">
              {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
              Complete
            </p>
          </div>
        </div>

        {/* Mobile: Compact Progress Bar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-[#1e293b]">
                Step {currentStep} of {steps.length}
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">
                {steps[currentStep - 1].title}
              </p>
            </div>
            <p className="text-sm font-medium text-[#2563eb]">
              {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
            </p>
          </div>

          {/* Linear Progress Bar with Animated Fill */}
          <div className="w-full h-[6px] bg-[#e2e8f0] rounded-full overflow-hidden shadow-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa]"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Step Indicators - Inline on Mobile */}
          <div className="flex items-center gap-1.5 mt-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`flex-1 h-[4px] rounded-full transition-all ${
                  index + 1 < currentStep
                    ? "bg-[#22c55e]"
                    : index + 1 === currentStep
                    ? "bg-[#2563eb] ring-1 ring-[#2563eb]/30"
                    : "bg-[#e2e8f0]"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
