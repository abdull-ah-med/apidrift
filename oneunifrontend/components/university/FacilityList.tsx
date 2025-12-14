import { LucideIcon, CheckCircle2 } from "lucide-react";
import { InfoCard } from "./InfoCard";

interface FacilityListProps {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export function FacilityList({ title, icon, items }: FacilityListProps) {
  return (
    <InfoCard title={title} icon={icon}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}
