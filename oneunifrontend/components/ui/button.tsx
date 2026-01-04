"use client";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "subtle"
    | "destructive"
    | "outline";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function Button({
  variant = "primary",
  className,
  children,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  const baseStyle =
    "px-4 py-2 rounded-2xl font-medium transition-all duration-200 inline-flex items-center justify-center gap-2";
  const variantStyles = {
    primary:
      "cursor-pointer px-8 border border-primary py-3 font-semibold transition hover:shadow-minimal-hover text-white bg-primary hover:bg-primary/90",
    secondary:
      "cursor-pointer px-8 border border-slate-200 py-3 font-semibold transition hover:shadow-minimal-hover text-primary bg-transparent dark:text-gray-200 dark:hover:text-primary hover:bg-primary/5 hover:text-primary hover:border-primary",
    ghost:
      "cursor-pointer px-8 border-0 bg-transparent text-primary py-3 font-semibold transition hover:bg-primary/10",
    destructive:
      "cursor-pointer px-8 border border-red-600 bg-red-700 text-white py-3 font-semibold transition hover:shadow-minimal-hover",
    subtle:
      "cursor-pointer px-8 border border-transparent bg-slate-100 text-text-main py-3 font-medium transition hover:bg-slate-200",
    link: "cursor-pointer px-0 py-0 border-0 bg-transparent text-primary underline-offset-4 hover:underline",
    outline:
      "cursor-pointer px-8 border border-slate-200 bg-transparent hover:bg-slate-50 text-text-main py-3 font-semibold transition hover:border-primary hover:text-primary",
  };

  return (
    <button
      className={cn(baseStyle, variantStyles[variant], className)}
      {...props}
    >
      {iconLeft && <span className="inline-flex items-center">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
    </button>
  );
}
