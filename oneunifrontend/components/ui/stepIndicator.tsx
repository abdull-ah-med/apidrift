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
                currentStep >= step ? "bg-primary" : "bg-slate-200"
              }`}
            >
              <span
                className={`font-semibold text-[16px] ${
                  currentStep >= step ? "text-white" : "text-slate-400"
                }`}
              >
                {step}
              </span>
            </div>
            {step < totalSteps && (
              <div className="flex-1 h-[3px] bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
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
