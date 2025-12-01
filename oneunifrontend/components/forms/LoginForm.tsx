"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, LogIn } from "lucide-react";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import Button from "@/components/ui/button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login submitted:", formData);
      // Add login logic here
    }
  };

  return (
    <div className="w-full max-w-[480px] flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-['Inter:Semi_Bold',sans-serif] text-[28px] text-[#1e293b]">
          Welcome back
        </h2>
        <p className="font-['Inter:Regular',sans-serif] text-[16px] text-[#64748b]">
          Please enter your details to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <Input
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          leftIcon={<Mail size={18} />}
          error={errors.email}
        />

        <div className="flex flex-col gap-[12px]">
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="font-['Inter:Medium',sans-serif] text-[14px] text-[#2563eb] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full rounded-[10px]"
          iconRight={<LogIn size={20} />}
        >
          Sign in
        </Button>
      </form>

      <div className="flex items-center justify-center gap-[8px]">
        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#64748b]">
          Don't have an account?
        </p>
        <Link
          href="/registration"
          className="font-['Inter:Medium',sans-serif] text-[14px] text-[#2563eb] hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
