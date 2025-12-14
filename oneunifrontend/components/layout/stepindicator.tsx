import { motion } from "framer-motion";
import { LucideIcon, Check } from "lucide-react";
import clsx from "clsx";

export interface StepConfig {
  id: number;
  title: string;
  slug: string;
  icon: LucideIcon;
  component?: React.ComponentType<any>;
}

interface StepIndicatorProps {
  steps: StepConfig[];
  currentStep: number;
  onStepChange: (stepId: number) => void;
  maxCompletedStep?: number;
}

export default function StepIndicator({ steps, currentStep, onStepChange, maxCompletedStep }: StepIndicatorProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        
        {/* Desktop View: Modern Stepper */}
        <div className="hidden md:block relative">
            <div className="relative flex items-center justify-between">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full -z-10" />
            
            {/* Progress Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} 
            />

            {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const isNavigable = step.id < currentStep || (maxCompletedStep !== undefined && step.id <= maxCompletedStep);
                const StepIcon = step.icon;

                return (
                <div key={step.id} className="relative flex flex-col items-center group">
                    <motion.button
                    onClick={() => {
                      if (isNavigable) {
                        onStepChange(step.id);
                      }
                    }}
                    initial={false}
                    animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isActive ? "#ffffff" : isCompleted ? "#ffffff" : "#f1f5f9",
                        borderColor: isActive ? "#2563eb" : isCompleted ? "#10b981" : "#e2e8f0",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300 z-10 relative",
                        isActive ? "ring-4 ring-blue-100 shadow-blue-200 cursor-default" : 
                        isCompleted ? "text-emerald-600 cursor-pointer hover:bg-slate-50" : 
                        isNavigable ? "text-slate-500 cursor-pointer hover:bg-slate-50 hover:text-blue-600" : "text-slate-400 cursor-not-allowed"
                    )}
                    >
                    {isCompleted ? (
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                        <Check size={18} strokeWidth={3} />
                        </motion.div>
                    ) : (
                        <StepIcon 
                        size={18} 
                        className={clsx(
                            "transition-colors duration-300",
                            isActive ? "text-blue-600" : "text-slate-400"
                        )} 
                        />
                    )}
                    
                    {/* Ripple Effect for Active */}
                    {isActive && (
                        <span className="absolute inset-0 rounded-full  opacity-20" />
                    )}
                    </motion.button>

                    {/* Floating Label */}
                    <div className="absolute top-12 flex flex-col items-center">
                    <motion.span
                        initial={false}
                        animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : -10,
                        scale: isActive ? 1 : 0.8,
                        }}
                        className="whitespace-nowrap text-sm font-['Inter:Bold',sans-serif] text-slate-900 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100"
                    >
                        {step.title}
                    </motion.span>
                    </div>
                    
                    {/* Hover Tooltip for non-active */}
                    {!isActive && (
                    <div className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span className="whitespace-nowrap text-xs font-['Inter:Medium',sans-serif] text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {step.title}
                        </span>
                    </div>
                    )}
                </div>
                );
            })}
            </div>
        </div>

        {/* Mobile View: Compact Linear Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Step {currentStep} of {steps.length}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {steps[currentStep - 1]?.title}
              </p>
            </div>
            <p className="text-sm font-medium text-blue-600">
              {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
            </p>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

           {/* Step Indicators - Inline on Mobile */}
           <div className="flex items-center gap-1.5">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={clsx(
                    "flex-1 h-1 rounded-full transition-all duration-300",
                    index + 1 < currentStep ? "bg-emerald-500" :
                    index + 1 === currentStep ? "bg-blue-600" : "bg-slate-200"
                )}
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
