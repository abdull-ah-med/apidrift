"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Content from "@/components/sections/(Auth)/content-section";
import Button from "@/components/ui/button";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "You denied access to your Google account.",
  invalid_request: "The authentication request was invalid.",
  server_error: "Something went wrong on our end. Please try again.",
  temporarily_unavailable: "The service is temporarily unavailable.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error") || "unknown";
  const errorMessage =
    ERROR_MESSAGES[errorCode] ||
    "An unexpected error occurred during authentication.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-6 text-center max-w-md"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center"
      >
        <AlertCircle size={40} className="text-red-600" />
      </motion.div>

      {/* Error Message */}
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl text-text-main">
          Authentication Failed
        </h2>
        <p className="text-[15px] text-text-body">{errorMessage}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full mt-4">
        <Link href="/login" className="w-full">
          <Button
            variant="primary"
            className="w-full h-[48px]"
            iconLeft={<ArrowLeft size={18} />}
          >
            Back to Login
          </Button>
        </Link>
        <Link
          href="/"
          className="text-[14px] text-text-muted hover:text-primary transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </motion.div>
  );
}

export default function AuthErrorPage() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <Content />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white w-full min-h-screen">
        <Suspense
          fallback={
            <div className="text-text-muted">Loading error details...</div>
          }
        >
          <ErrorContent />
        </Suspense>
      </div>
    </section>
  );
}
