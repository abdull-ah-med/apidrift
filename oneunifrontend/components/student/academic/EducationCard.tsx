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
    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group hover:border-blue-300 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
          {type.includes("Matric") ? <School size={20} /> : <BookOpen size={20} />}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{type}</h4>
          <p className="text-xs text-slate-500 truncate max-w-[200px]">{institute}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Percentage</p>
          <p className="text-sm font-bold text-blue-600">{percentage}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onRemove}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
