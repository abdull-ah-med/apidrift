import clsx from "clsx";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  error?: string | null;
  classname?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  placeholder,
  value,
  name,
  error,
  classname,
  leftIcon,
  rightIcon,
  onRightIconClick,
  type = "text",
  disabled,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className={clsx("flex flex-col gap-[8px]", classname)}>
      {label && (
        <label
          htmlFor={name}
          className="font-['Inter:Medium',sans-serif] text-[14px] text-[#334155]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94a3b8]">
            {leftIcon}
          </div>
        )}

        <input
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(
            "w-full",
            leftIcon ? "pl-[46px]" : "pl-[16px]",
            rightIcon ? "pr-[46px]" : "pr-[16px]",
            "py-[14px]",
            "bg-white border-2 border-[#e2e8f0] rounded-[10px]",
            "font-['Inter:Regular',sans-serif] text-[16px] text-[#1e293b]",
            "placeholder:text-[#cbd5e1]",
            "focus:border-[#2563eb] focus:outline-none",
            "transition-colors",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#1e293b] transition-colors p-0"
            tabIndex={-1}
            aria-label="Toggle input action"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && value && value.trim() !== "" && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-['Inter:Regular',sans-serif] text-[13px] text-[#ef4444]"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
