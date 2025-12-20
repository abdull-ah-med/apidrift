import { Plus, XCircle, School } from "lucide-react";
import Input from "../../ui/input";
import Select from "../../ui/select";

interface EducationEntry {
  type: string;
  institute: string;
  board: string;
  year: string;
  marks: string;
  totalMarks: string;
}

interface EducationFormProps {
  currentEdu: EducationEntry;
  editingIndex: number | null;
  errors: any;
  options: { label: string; value: string }[];
  onEduChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EducationForm({
  currentEdu,
  editingIndex,
  errors,
  options,
  onEduChange,
  onSave,
  onCancel,
}: EducationFormProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
            <Plus size={18} />
          </div>
          {editingIndex !== null ? "Edit Qualification" : "Add Qualification"}
        </h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <XCircle size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Select
            label="Education Level"
            name="type"
            value={currentEdu.type}
            options={options}
            onChange={onEduChange as any}
            error={errors.type}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Institute / School Name"
            name="institute"
            value={currentEdu.institute}
            onChange={onEduChange as any}
            placeholder="Enter your institute name"
            error={errors.institute}
            leftIcon={<School size={18} />}
          />
        </div>

        <Input
          label="Board / University"
          name="board"
          value={currentEdu.board}
          onChange={onEduChange as any}
          placeholder="e.g., BISE Lahore"
          error={errors.board}
        />

        <Input
          label="Passing Year"
          name="year"
          value={currentEdu.year}
          onChange={onEduChange as any}
          placeholder="2022"
          error={errors.year}
        />

        <Input
          label="Marks Obtained"
          name="marks"
          type="number"
          value={currentEdu.marks}
          onChange={onEduChange as any}
          placeholder="900"
          error={errors.marks}
        />

        <Input
          label="Total Marks"
          name="totalMarks"
          type="number"
          value={currentEdu.totalMarks}
          onChange={onEduChange as any}
          placeholder="1100"
          error={errors.totalMarks}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
        >
          {editingIndex !== null ? "Update" : "Add to List"}
        </button>
      </div>
    </div>
  );
}
