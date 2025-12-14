import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface InfoCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, icon: Icon, children, className }: InfoCardProps) {
  return (
    <div className={clsx("bg-white rounded-xl border border-slate-200 shadow-sm p-6", className)}>
      <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Icon size={18} />
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="text-slate-600 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
