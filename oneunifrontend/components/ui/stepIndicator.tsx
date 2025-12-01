import { motion } from "framer-motion";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const StepIndicator = ({ totalSteps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-[12px] w-full">
      {[...Array(totalSteps)].map((_, i) => {
        const step = i + 1;
        return (
          <div key={step} className="flex items-center gap-[12px] flex-1">
            <div
              className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors ${
                currentStep >= step ? "bg-[#2563eb]" : "bg-[#e2e8f0]"
              }`}
            >
              <span
                className={`font-['Inter:Semi_Bold',sans-serif] text-[16px] ${
                  currentStep >= step ? "text-white" : "text-[#94a3b8]"
                }`}
              >
                {step}
              </span>
            </div>
            {step < totalSteps && (
              <div className="flex-1 h-[3px] bg-[#e2e8f0] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#2563eb]"
                  initial={{ width: "0%" }}
                  animate={{ width: currentStep > step ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
