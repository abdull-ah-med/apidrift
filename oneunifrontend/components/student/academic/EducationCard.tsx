import { School, BookOpen, Edit2, Trash2 } from "lucide-react";

interface EducationCardProps {
  type: string;
  institute: string;
  percentage: string;
  onEdit: () => void;
  onRemove: () => void;
}

export function EducationCard({
  type,
  institute,
  percentage,
  onEdit,
  onRemove,
}: EducationCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group hover:border-primary/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
          {type.includes("Matric") ? <School size={20} /> : <BookOpen size={20} />}
        </div>
        <div>
          <h4 className="font-bold text-text-main text-sm">{type}</h4>
          <p className="text-xs text-text-muted truncate max-w-[200px]">{institute}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-text-muted uppercase font-bold">Percentage</p>
          <p className="text-sm font-bold text-primary">{percentage}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-2 text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onRemove}
            className="p-2 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
