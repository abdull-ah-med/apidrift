import { motion, AnimatePresence } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";
import clsx from "clsx";

interface OptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export function OptionCard({
  title,
  description,
  icon: Icon,
  colorClass,
  bgClass,
  name,
  value,
  onChange,
  children,
}: OptionCardProps) {
  const isYes = value === "yes";

  return (
    <div
      className={clsx(
        "p-6 rounded-xl border transition-all duration-200 flex flex-col gap-4 h-full",
        isYes
          ? "bg-white shadow-md ring-1 ring-slate-200 border-slate-200"
          : "bg-white border-slate-200 shadow-sm hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              bgClass
            )}
          >
            <Icon size={20} className={colorClass} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        {isYes && (
          <div
            className={clsx(
              "w-6 h-6 rounded-full flex items-center justify-center",
              bgClass
            )}
          >
            <Check size={14} className={colorClass} />
          </div>
        )}
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
        <label
          className={clsx(
            "flex-1 py-2 text-sm font-medium rounded-md text-center cursor-pointer transition-all",
            value === "no"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={onChange}
            className="hidden"
          />
          No
        </label>
        <label
          className={clsx(
            "flex-1 py-2 text-sm font-medium rounded-md text-center cursor-pointer transition-all",
            value === "yes"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={onChange}
            className="hidden"
          />
          Yes
        </label>
      </div>

      <AnimatePresence>
        {isYes && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
