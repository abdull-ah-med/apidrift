import clsx from "clsx";
import { ReactNode, useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: React.ReactNode;
  value?: string;
  name?: string;
  error?: string | null;
  className?: string;
  leftIcon?: React.ReactNode;
  options: Option[];
  disabled?: boolean;
  onChange?: (e: { target: { name: string; value: string } }) => void;
  onBlur?: () => void;
  placeholder?: string;
};

export default function Select({
  label,
  value,
  name = "",
  error,
  className,
  leftIcon,
  options,
  disabled,
  onChange,
  onBlur,
  placeholder = "Select an option",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (isOpen) onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onBlur]);

  const handleSelect = (optionValue: string) => {
    if (disabled) return;
    onChange?.({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={clsx("flex flex-col gap-2 w-full relative", className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-bold text-slate-700 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={clsx(
            "w-full py-3 bg-slate-50 border rounded-xl transition-all duration-200 flex items-center text-left outline-none",
            leftIcon ? "pl-11" : "pl-4",
            "pr-10",
            error 
              ? "border-red-500 ring-4 ring-red-500/10" 
              : isOpen 
                ? "border-blue-500 ring-4 ring-blue-500/10 bg-white" 
                : "border-slate-200 hover:border-slate-300",
            disabled && "opacity-50 cursor-not-allowed bg-slate-100"
          )}
        >
          {leftIcon && (
            <div className={clsx(
              "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
              isOpen ? "text-blue-600" : "text-slate-400"
            )}>
              {leftIcon}
            </div>
          )}

          <span className={clsx(
            "font-semibold truncate",
            selectedOption ? "text-slate-700" : "text-slate-400"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <div className={clsx(
            "absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200",
            isOpen ? "text-blue-600 rotate-180" : "text-slate-400"
          )}>
            <ChevronDown size={20} />
          </div>
        </button>

        {/* Custom Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-[100] w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-[250px] overflow-y-auto custom-scrollbar"
            >
              <div className="p-1">
                {options.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-slate-400 text-center italic">
                    No options available
                  </div>
                ) : (
                  options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={clsx(
                        "w-full px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors",
                        value === option.value
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {value === option.value && (
                        <Check size={16} className="text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-xs font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}

