"use client";

import Content from "@/components/sections/(Auth)/content-section";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <Content />
      
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <LoginForm />
      </div>
    </section>
  );
}
