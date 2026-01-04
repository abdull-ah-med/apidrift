import { GraduationCap } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-text-muted bg-slate-50/50">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
        <GraduationCap size={32} className="text-slate-200" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-text-body">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
