import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, School, BookOpen } from "lucide-react";
import { ProfileData } from "../../lib/schemas/profile";
import Input from "../ui/input";
import {
  ValidateAcademicBackground,
  InfoErrors,
} from "@/lib/validation/validate";

interface AcademicBackgroundStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AcademicBackgroundStep({
  data,
  updateData,
  onNext,
  onBack,
}: AcademicBackgroundStepProps) {
  const [errors, setErrors] = useState<InfoErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    if (errors[name as keyof InfoErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    const newErrors = ValidateAcademicBackground(data);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((msg) => msg && typeof msg === 'string' && msg.length > 0);
    if (!hasErrors) {
      onNext();
    }
  };

  const calculatePercentage = (obtained: string, total: string) => {
    const obtainedNum = parseFloat(obtained);
    const totalNum = parseFloat(total);
    if (obtainedNum && totalNum && totalNum > 0) {
      return ((obtainedNum / totalNum) * 100).toFixed(2) + "%";
    }
    return "-";
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">
          Academic Background
        </h1>
        <p className="text-slate-500">
          Provide details of your previous academic qualifications.
        </p>
      </div>

      {/* Main Content - Side by Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matric Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5 h-fit hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <School size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Matriculation</h3>
                <p className="text-xs text-slate-500">SSC / O-Level</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100 flex flex-col items-end min-w-[80px]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Percentage
              </span>
              <span className="text-sm font-bold text-blue-600">
                {calculatePercentage(data.matricMarks, data.matricTotalMarks)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label={
                  <>
                    Institute / School Name{" "}
                    <span className="text-red-500">*</span>
                  </>
                }
                name="matricInstitute"
                value={data.matricInstitute}
                onChange={handleChange}
                placeholder="Enter your school name"
                error={errors.matricInstitute}
                leftIcon={<School size={18} />}
              />
            </div>
            <Input
              label={
                <>
                  Board <span className="text-red-500">*</span>
                </>
              }
              name="matricBoard"
              value={data.matricBoard}
              onChange={handleChange}
              placeholder="e.g., BISE Lahore"
              error={errors.matricBoard}
            />
            <Input
              label={
                <>
                  Passing Year <span className="text-red-500">*</span>
                </>
              }
              name="matricYear"
              value={data.matricYear}
              onChange={handleChange}
              placeholder="2020"
              error={errors.matricYear}
            />
            <Input
              label={
                <>
                  Marks Obtained <span className="text-red-500">*</span>
                </>
              }
              name="matricMarks"
              type="number"
              value={data.matricMarks}
              onChange={handleChange}
              placeholder="850"
              error={errors.matricMarks}
            />
            <Input
              label={
                <>
                  Total Marks <span className="text-red-500">*</span>
                </>
              }
              name="matricTotalMarks"
              type="number"
              value={data.matricTotalMarks}
              onChange={handleChange}
              placeholder="1100"
              error={errors.matricTotalMarks}
            />
          </div>
        </div>

        {/* Intermediate Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5 h-fit hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Intermediate</h3>
                <p className="text-xs text-slate-500">HSSC / A-Level</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100 flex flex-col items-end min-w-[80px]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Percentage
              </span>
              <span className="text-sm font-bold text-amber-600">
                {calculatePercentage(data.interMarks, data.interTotalMarks)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label={
                  <>
                    Institute / College Name{" "}
                    <span className="text-red-500">*</span>
                  </>
                }
                name="interInstitute"
                value={data.interInstitute}
                onChange={handleChange}
                placeholder="Enter your college name"
                error={errors.interInstitute}
                leftIcon={<BookOpen size={18} />}
              />
            </div>
            <Input
              label={
                <>
                  Board <span className="text-red-500">*</span>
                </>
              }
              name="interBoard"
              value={data.interBoard}
              onChange={handleChange}
              placeholder="e.g., BISE Lahore"
              error={errors.interBoard}
            />
            <Input
              label={
                <>
                  Passing Year <span className="text-red-500">*</span>
                </>
              }
              name="interYear"
              value={data.interYear}
              onChange={handleChange}
              placeholder="2022"
              error={errors.interYear}
            />
            <Input
              label={
                <>
                  Marks Obtained <span className="text-red-500">*</span>
                </>
              }
              name="interMarks"
              type="number"
              value={data.interMarks}
              onChange={handleChange}
              placeholder="900"
              error={errors.interMarks}
            />
            <Input
              label={
                <>
                  Total Marks <span className="text-red-500">*</span>
                </>
              }
              name="interTotalMarks"
              type="number"
              value={data.interTotalMarks}
              onChange={handleChange}
              placeholder="1100"
              error={errors.interTotalMarks}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center gap-2 hover:bg-slate-50 rounded-lg"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          Save & Continue
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
