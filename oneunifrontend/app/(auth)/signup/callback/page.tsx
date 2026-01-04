"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, ChevronRight, Loader2 } from "lucide-react";
import Content from "@/components/sections/(Auth)/content-section";
import RoleSelector from "@/components/ui/role-selector";
import Button from "@/components/ui/button";
import { completeGoogleSignup, type Role } from "@/lib/api/auth";

export default function SignupCallbackPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | "">("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (selectedRole: Role | "") => {
    setRole(selectedRole as Role);
    setError("");
  };

  const handleCompleteRegistration = async () => {
    if (!role) {
      setError("Please select your role to continue");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const user = await completeGoogleSignup({ role });
      
      // Redirect based on role
      if (user.role === "mentor") {
        router.push("/mentor/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete registration. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <Content />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white w-full min-h-screen"
      >
        <div className="flex flex-col gap-8 w-full max-w-[480px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <h2 className="font-bold text-3xl text-text-main tracking-tight">
              Almost there!
            </h2>
            <p className="text-[15px] text-text-body leading-relaxed">
              Select how you want to use OneUni to complete your registration.
            </p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <label className="font-medium text-[14px] text-text-body">
              I want to join as
            </label>
            <div className="flex gap-4">
              <RoleSelector
                roleId="student"
                label="Student"
                icon={GraduationCap}
                isSelected={role === "student"}
                onRoleSelect={handleRoleSelect}
              />
              <RoleSelector
                roleId="mentor"
                label="Mentor"
                icon={Briefcase}
                isSelected={role === "mentor"}
                onRoleSelect={handleRoleSelect}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] text-red-500"
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="primary"
              onClick={handleCompleteRegistration}
              disabled={isLoading}
              className="w-full h-[52px] text-[16px]"
              iconRight={isLoading ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} />}
            >
              {isLoading ? "Creating account..." : "Complete Registration"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
