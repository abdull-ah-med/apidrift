"use client";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "subtle"
    | "destructive";
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
      "cursor-pointer px-8 border border-[#0e1268] py-3 font-semibold transition hover:shadow-minimal-hover text-white bg-[var(--brand-blue)]",
    secondary:
      "cursor-pointer px-8 border border-gray-300 py-3 font-semibold transition hover:shadow-minimal-hover text-[#0e1268] bg-transparent dark:text-gray-200 dark:hover:text-[var(--brand-blue)] hover:bg-[var(--brand-blue)]/15 hover:text-[var(--brand-blue)] hover:border-[var(--brand-blue)]",
    ghost:
      "cursor-pointer px-8 border-0 bg-transparent text-[#0e1268] py-3 font-semibold transition hover:bg-[var(--brand-blue)]/10",
    destructive:
      "cursor-pointer px-8 border border-red-600 bg-red-700 text-white py-3 font-semibold transition hover:shadow-minimal-hover",
    subtle:
      "cursor-pointer px-8 border border-transparent bg-gray-100 text-gray-800 py-3 font-medium transition hover:bg-gray-200",
    link: "cursor-pointer px-0 py-0 border-0 bg-transparent text-[var(--brand-blue)] underline-offset-4 hover:underline",
  };

  return (
    <button
      className={clsx(baseStyle, variantStyles[variant], className)}
      {...props}
    >
      {iconLeft && <span className="inline-flex items-center">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
    </button>
  );
}
