"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import Content from "@/components/sections/(Auth)/content-section";

type Status = "loading" | "success" | "error";

export default function LoginCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    // Backend has already set auth cookies via the OAuth callback
    // Transition to success and redirect to dashboard
    const timer = setTimeout(() => {
      setStatus("success");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "success") {
      const redirectTimer = setTimeout(() => {
        router.push("/student/dashboard");
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [status, router]);

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <Content />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 size={48} className="text-primary animate-spin" />
              <p className="text-lg text-text-body">Signing you in...</p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <p className="text-lg font-medium text-text-main">
                Welcome back!
              </p>
              <p className="text-sm text-text-muted">
                Redirecting to your dashboard...
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
