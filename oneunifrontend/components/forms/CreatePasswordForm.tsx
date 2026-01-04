"use client";
import { motion } from "framer-motion";
import PasswordInput from "@/components/ui/passwordInput";

type CreatePasswordFormProps = {
  formData: {
    password: string;
    confirmPassword: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CreatePasswordForm({
  formData,
  errors,
  onChange,
}: CreatePasswordFormProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-[32px]"
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-bold text-[28px] text-text-main">
          Secure your account
        </h2>
        <p className="text-[16px] text-text-body">
          Create a strong password to protect your account
        </p>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Password */}
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          placeholder="Enter a strong password"
          onChange={onChange}
          error={errors.password}
          showRequirements={true}
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Re-enter your password"
          onChange={onChange}
          confirmValue={formData.password}
          error={errors.confirmPassword}
          showRequirements={false}
        />
      </div>
    </motion.div>
  );
}
