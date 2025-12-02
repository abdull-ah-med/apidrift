"use client";

import { useState } from "react";
import Content from "@/components/sections/(Auth)/content-section";
import LoginForm from "@/components/forms/LoginForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login submitted:", formData);
      setIsLoading(false);
      // Add login logic here
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
        <LoginForm 
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </motion.div>
    </section>
  );
}
