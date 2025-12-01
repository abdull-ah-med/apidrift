// components/PasswordInput.tsx
"use client";
import React, { useMemo, useState } from "react";
import Input from "./input";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Check } from "lucide-react";

type Strength = { strength: number; label: string; color: string };

const getPasswordStrength = (password = ""): Strength => {
  if (!password) return { strength: 0, label: "", color: "" };
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;

  if (strength < 40) return { strength, label: "Weak", color: "#ef4444" };
  if (strength < 70) return { strength, label: "Good", color: "#f59e0b" };
  return { strength, label: "Strong", color: "#10b981" };
};

/**
 * Toggle password visibility state
 * @param currentState - Current visibility state
 * @returns Toggled visibility state
 */
const togglePasswordVisibility = (currentState: boolean): boolean => {
  return !currentState;
};

type PasswordInputProps = {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // optional confirm value to show match-check (parent manages confirm field)
  confirmValue?: string;
  className?: string;
  disabled?: boolean;
  showRequirements?: boolean;
};

export default function PasswordInput({
  label = "Password",
  name,
  value,
  placeholder = "Enter a strong password",
  error,
  onChange,
  onBlur,
  confirmValue,
  className,
  disabled,
  showRequirements = true,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  const passwordStrength = useMemo(() => getPasswordStrength(value), [value]);

  const meets8 = value.length >= 8;
  const meetsCase = /[A-Z]/.test(value) && /[a-z]/.test(value);
  const meetsNumber = /[0-9]/.test(value);

  return (
    <div className={className}>
      <Input
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        type={visible ? "text" : "password"}
        leftIcon={<Lock size={18} />}
        rightIcon={visible ? <EyeOff size={18} /> : <Eye size={18} />}
        onRightIconClick={() => setVisible(togglePasswordVisibility(visible))}
        error={error}
        onChange={(e) => {
          setTouched(true);
          onChange(e);
        }}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        disabled={disabled}
      />

     {/* Password Stregth Meter */}
      {value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-[8px] pt-[8px]"
        >
          <div className="w-full h-[8px] bg-[#f1f5f9] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: passwordStrength.color }}
              initial={{ width: 0 }}
              animate={{ width: `${passwordStrength.strength}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <p
            className="font-['Inter:Medium',sans-serif] text-[13px]"
            style={{ color: passwordStrength.color }}
          >
            Password strength: {passwordStrength.label}
          </p>
        </motion.div>
      )}

      {/* confirm-check */}
      {typeof confirmValue === "string" && confirmValue.length > 0 && (
        <div className="pt-[8px]">
          {confirmValue === value ? (
            <div className="flex items-center gap-2 text-[#10b981]">
              <Check size={16} strokeWidth={3} />
              <span className="font-['Inter:Regular',sans-serif] text-[13px]">Passwords match</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#ef4444]">
              <span className="font-['Inter:Regular',sans-serif] text-[13px]">Passwords do not match</span>
            </div>
          )}
        </div>
      )}

      {showRequirements && touched && (
        <div className="p-[12px] bg-[#fef3c7] border border-[#fbbf24] rounded-[10px] mt-[12px]">
          <p className="font-['Inter:Medium',sans-serif] text-[13px] text-[#92400e] mb-[8px]">
            Password requirements:
          </p>
          <ul className="space-y-[6px]">
            <li className="flex items-center gap-[8px]">
              <div
                className={`w-[16px] h-[16px] rounded-full flex items-center justify-center ${
                  meets8 ? "bg-[#10b981]" : "bg-[#e5e7eb]"
                }`}
              >
                {meets8 && <Check size={10} className="text-white" strokeWidth={3} />}
              </div>
              <span className="font-['Inter:Regular',sans-serif] text-[13px] text-[#92400e]">
                At least 8 characters
              </span>
            </li>

            <li className="flex items-center gap-[8px]">
              <div
                className={`w-[16px] h-[16px] rounded-full flex items-center justify-center ${
                  meetsCase ? "bg-[#10b981]" : "bg-[#e5e7eb]"
                }`}
              >
                {meetsCase && <Check size={10} className="text-white" strokeWidth={3} />}
              </div>
              <span className="font-['Inter:Regular',sans-serif] text-[13px] text-[#92400e]">
                Mix of uppercase & lowercase
              </span>
            </li>

            <li className="flex items-center gap-[8px]">
              <div
                className={`w-[16px] h-[16px] rounded-full flex items-center justify-center ${
                  meetsNumber ? "bg-[#10b981]" : "bg-[#e5e7eb]"
                }`}
              >
                {meetsNumber && <Check size={10} className="text-white" strokeWidth={3} />}
              </div>
              <span className="font-['Inter:Regular',sans-serif] text-[13px] text-[#92400e]">
                At least one number
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
