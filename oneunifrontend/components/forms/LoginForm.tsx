"use client";

import Link from "next/link";
import { Mail, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import Button from "@/components/ui/button";

type LoginFormProps = {
  formData: {
    email: string;
    password: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export default function LoginForm({
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading,
}: LoginFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-[440px] flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-bold text-3xl text-text-main tracking-tight">
            Welcome back
          </h2>
          <p className="text-[15px] text-text-body mt-2 leading-relaxed">
            Enter your credentials to access your account and continue your
            learning journey.
          </p>
        </motion.div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              name="email"
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              value={formData.email}
              onChange={onChange}
              leftIcon={<Mail size={18} className="text-text-muted" />}
              error={errors.email}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={onChange}
              error={errors.password}
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full h-[52px] text-[16px]"
            iconRight={isLoading ? null : <LogIn size={20} />}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </motion.div>
      </form>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full cursor-pointer flex items-center justify-center gap-[12px] px-[24px] py-[12px] bg-white border-2 border-slate-200 hover:border-slate-300 rounded-[10px] font-medium text-[15px] text-text-body transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign In with Google
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100"
      >
        <p className="text-[14px] text-text-muted">Don't have an account?</p>
        <Link
          href="/registration"
          className="text-[14px] font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
        >
          Create account
        </Link>
      </motion.div>
    </motion.div>
  );
}
