import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Plus, AlertCircle, ChevronDown } from "lucide-react";
import { ProfileData } from "../../lib/schemas/profile";
import { InfoErrors } from "@/lib/validation/validate";
import Button from "../ui/button";
import clsx from "clsx";

// Reusable Components
import { EmptyState } from "./academic/EmptyState";
import { EducationCard } from "./academic/EducationCard";
import { EducationForm } from "./academic/EducationForm";

interface AcademicBackgroundStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type EducationEntry = {
  type: string;
  institute: string;
  board: string;
  year: string;
  marks: string;
  totalMarks: string;
};

export function AcademicBackgroundStep({
  data,
  updateData,
  onNext,
  onBack,
}: AcademicBackgroundStepProps) {
  const [errors, setErrors] = useState<InfoErrors>({});
  const [isAdding, setIsAdding] = useState(data.educations.length === 0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [currentEdu, setCurrentEdu] = useState<EducationEntry>({
    type: "Matriculation",
    institute: "",
    board: "",
    year: "",
    marks: "",
    totalMarks: "",
  });

  const handleEduChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentEdu(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = () => {
    const newLocalErrors: any = {};
    if (!currentEdu.institute) newLocalErrors.institute = "Required";
    if (!currentEdu.board) newLocalErrors.board = "Required";
    if (!currentEdu.year) newLocalErrors.year = "Required";
    if (!currentEdu.marks) newLocalErrors.marks = "Required";
    if (!currentEdu.totalMarks) newLocalErrors.totalMarks = "Required";

    if (Object.keys(newLocalErrors).length > 0) {
      setErrors(newLocalErrors);
      return;
    }

    let newEducations = [...data.educations];
    if (editingIndex !== null) {
      newEducations[editingIndex] = currentEdu;
    } else {
      newEducations.push(currentEdu);
    }

    updateData({ educations: newEducations });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setCurrentEdu(data.educations[index]);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleRemove = (index: number) => {
    const newEducations = data.educations.filter((_, i) => i !== index);
    updateData({ educations: newEducations });
  };

  const handleNext = () => {
    if (data.educations.length === 0) {
      setErrors({ educations: "Please add at least one education record." });
      return;
    }
    onNext();
  };

  const calculatePercentage = (obtained: string, total: string) => {
    const obtainedNum = parseFloat(obtained);
    const totalNum = parseFloat(total);
    if (obtainedNum && totalNum && totalNum > 0) {
      return ((obtainedNum / totalNum) * 100).toFixed(2) + "%";
    }
    return "-";
  };

  const getDropdownOptions = () => {
    const allOptions = [
      { label: "Matriculation / O-Level", value: "Matriculation" },
      { label: "HSSC Part-I", value: "HSSC Part-I" },
      { label: "HSSC Part-II", value: "HSSC Part-II" },
      { label: "Diploma", value: "Diploma" },
      { label: "Other Certificate", value: "Other" },
    ];

    return allOptions.filter(opt => {
      if (opt.value === "Other") return true;
      const alreadyExists = data.educations.some((edu, idx) => edu.type === opt.value && idx !== editingIndex);
      return !alreadyExists;
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text-main">
          Academic Background
        </h1>
        <p className="text-text-muted">
          Add your educational qualifications one by one.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isAdding ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {data.educations.length === 0 ? (
                <EmptyState 
                  title="No qualifications added" 
                  description="Click the button below to add your first one" 
                />
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {data.educations.map((edu, index) => (
                    <EducationCard
                      key={index}
                      type={edu.type}
                      institute={edu.institute}
                      percentage={calculatePercentage(edu.marks, edu.totalMarks)}
                      onEdit={() => handleEdit(index)}
                      onRemove={() => handleRemove(index)}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  const types = ["Matriculation", "HSSC Part-II", "HSSC Part-I", "Diploma", "Other"];
                  const nextType = types.find(t => t === "Other" || !data.educations.some(e => e.type === t)) || "Other";
                  
                  setCurrentEdu({
                    type: nextType as any,
                    institute: "",
                    board: "",
                    year: "",
                    marks: "",
                    totalMarks: "",
                  });
                  setEditingIndex(null);
                  setIsAdding(true);
                }}
                className="w-full py-4 border-2 border-dashed border-primary/20 rounded-xl text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all"
              >
                <Plus size={20} />
                Add Qualification
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <EducationForm
              currentEdu={currentEdu}
              editingIndex={editingIndex}
              errors={errors}
              options={getDropdownOptions()}
              onEduChange={handleEduChange}
              onSave={handleSave}
              onCancel={() => setIsAdding(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Summary */}
      {errors.educations && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
          <AlertCircle size={20} />
          <span>{errors.educations as string}</span>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="px-6 py-2.5 text-text-body hover:bg-slate-50 rounded-xl"
          iconLeft={<ChevronLeft size={20} />}
        >
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={isAdding}
          className={clsx(
            "px-10 py-2.5 rounded-xl shadow-md",
            isAdding && "opacity-50 cursor-not-allowed shadow-none"
          )}
          iconRight={<ChevronRight size={20} />}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
}




