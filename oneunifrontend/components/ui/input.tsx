import clsx from "clsx";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

type InputProps = {
  label?: React.ReactNode;
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
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
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
  inputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasBeenTouched(true);
    onBlur?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Show error if:
  // 1. There is an error AND
  // 2. The field has been touched OR the error is present (implying submit)
  // 3. AND the field is NOT currently focused (optional, keeps UI clean while typing)
  const showError = error && (hasBeenTouched || error) && !isFocused;

  return (
    <div className={clsx("flex flex-col gap-[6px]", classname)}>
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-[14px] text-text-body ml-1"
        >
          {label}
        </label>
      )}

      <div className="relative group">
        {leftIcon && (
          <div className={clsx(
            "absolute left-[16px] top-1/2 -translate-y-1/2 transition-colors duration-200",
            error ? "text-red-400" : "text-text-muted group-focus-within:text-primary"
          )}>
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            "w-full",
            leftIcon ? "pl-[48px]" : "pl-[20px]",
            rightIcon ? "pr-[48px]" : "pr-[20px]",
            "py-[14px]",
            "bg-white border rounded-xl",
            "text-[15px] text-text-main",
            "placeholder:text-text-muted",
            "transition-all duration-200 ease-in-out",
            "shadow-sm hover:shadow-md",
            disabled && "opacity-60 cursor-not-allowed bg-slate-50",
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
          )}
          {...inputProps}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={clsx(
              "absolute right-[16px] top-1/2 -translate-y-1/2 transition-colors duration-200 p-0",
              error ? "text-red-400" : "text-slate-400 hover:text-text-body"
            )}
            tabIndex={-1}
            aria-label="Toggle input action"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-medium text-[12px] text-red-500 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
