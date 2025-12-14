import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Upload, FileText, CheckCircle, AlertCircle, FileCheck, XCircle, Shield, ScanLine } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateDocuments } from '../../lib/validation/validate';
import clsx from 'clsx';

interface DocumentUploadStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DocumentUploadStep({ data, updateData, onNext, onBack }: DocumentUploadStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (name: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ [name]: file });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = ValidateDocuments(data);
    setErrors(newErrors as Record<string, string>);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const documents = [
    { 
      name: 'cnicDoc' as keyof ProfileData, 
      label: 'CNIC / B-Form', 
      description: 'National Identity Card',
      required: true,
      icon: Shield
    },
    { 
      name: 'matricDoc' as keyof ProfileData, 
      label: 'Matric Certificate', 
      description: 'SSC / Matriculation',
      required: true,
      icon: FileText
    },
    { 
      name: 'interDoc' as keyof ProfileData, 
      label: 'Intermediate', 
      description: 'HSSC / Intermediate',
      required: true,
      icon: FileText
    },
    { 
      name: 'domicileDoc' as keyof ProfileData, 
      label: 'Domicile', 
      description: 'Domicile Certificate',
      required: true,
      icon: ScanLine
    },
  ];

  const uploadedCount = Object.values(data).filter((val) => val instanceof File).length;
  const totalDocs = documents.length;
  const progress = (uploadedCount / totalDocs) * 100;

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 font-['Inter:Bold',sans-serif]">Document Upload</h1>
        <p className="text-slate-500 font-['Inter:Regular',sans-serif]">Please upload clear copies of the following documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Content - Grid of Documents (9 cols) */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, index) => {
            const file = data[doc.name] as File | null;
            const hasError = errors[doc.name];
            const Icon = doc.icon;

            return (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={clsx(
                  "relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-5 group overflow-hidden",
                  file 
                    ? "bg-white border-emerald-500/30 shadow-lg shadow-emerald-500/5" 
                    : hasError 
                    ? "bg-white border-red-200 shadow-sm" 
                    : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5"
                )}
              >
                {/* Decorative Background Blob */}
                {file && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-bl-[100px] -mr-8 -mt-8 transition-all pointer-events-none" />
                )}

                <div className="relative z-10 flex items-start justify-between">
                  <div className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm",
                    file 
                      ? "bg-emerald-100 text-emerald-600 rotate-0" 
                      : hasError
                      ? "bg-red-50 text-red-500"
                      : "bg-blue-50 text-blue-600 group-hover:scale-105 group-hover:rotate-3"
                  )}>
                    {file ? <CheckCircle size={28} /> : hasError ? <AlertCircle size={28} /> : <Icon size={28} />}
                  </div>
                  
                  {hasError && (
                    <span className="font-['Inter:Semi_Bold',sans-serif] text-[11px] text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
                      Required
                    </span>
                  )}
                  {file && (
                    <span className="font-['Inter:Semi_Bold',sans-serif] text-[11px] text-emerald-700 bg-emerald-100/80 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <CheckCircle size={12} className="fill-emerald-700 text-white" />
                      Uploaded
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex flex-col gap-1.5">
                  <h3 className="font-['Inter:Bold',sans-serif] text-lg text-slate-900 tracking-tight">{doc.label}</h3>
                  <p className="font-['Inter:Medium',sans-serif] text-sm text-slate-500">{doc.description}</p>
                </div>

                {file ? (
                   <div className="relative z-10 mt-auto">
                     <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                          <FileCheck size={20} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-['Inter:Semi_Bold',sans-serif] text-slate-900 truncate">{file.name}</span>
                          <span className="text-xs font-['Inter:Medium',sans-serif] text-slate-500">{(file.size / 1024).toFixed(0)} KB</span>
                        </div>
                     </div>
                     <label className="w-full py-2.5 rounded-xl font-['Inter:Semi_Bold',sans-serif] text-[13px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                        <Upload size={16} />
                        Replace File
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange(doc.name)}
                          className="hidden"
                        />
                     </label>
                   </div>
                ) : (
                  <label className={clsx(
                    "relative z-10 mt-auto w-full py-3.5 rounded-xl font-['Inter:Semi_Bold',sans-serif] text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200",
                    "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
                  )}>
                    <Upload size={18} />
                    Upload Document
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange(doc.name)}
                      className="hidden"
                    />
                  </label>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6 sticky top-6">
          
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="font-['Inter:Semi_Bold',sans-serif] text-slate-900">Progress</h3>
              <span className="font-['Inter:Bold',sans-serif] text-sm text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{uploadedCount}/{totalDocs}</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="font-['Inter:Medium',sans-serif] text-[13px] text-slate-500 leading-relaxed">
              {uploadedCount === totalDocs 
                ? "All documents uploaded successfully! You can now proceed." 
                : "Please upload all required documents to complete your application."}
            </p>
          </div>

          {/* Guidelines Card */}
          <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-100 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-amber-900 font-['Inter:Bold',sans-serif]">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <AlertCircle size={16} className="text-amber-700" />
              </div>
              <h3>Guidelines</h3>
            </div>
            <ul className="space-y-3">
              <li className="font-['Inter:Medium',sans-serif] text-[13px] text-amber-800 flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 shadow-sm"></span>
                Max file size: 5MB per file
              </li>
              <li className="font-['Inter:Medium',sans-serif] text-[13px] text-amber-800 flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 shadow-sm"></span>
                Supported formats: PDF, JPG, PNG
              </li>
              <li className="font-['Inter:Medium',sans-serif] text-[13px] text-amber-800 flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 shadow-sm"></span>
                Ensure text is readable and clear
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-['Inter:Semi_Bold',sans-serif] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Submit Application
              <ChevronRight size={18} />
            </motion.button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3.5 text-slate-600 font-['Inter:Semi_Bold',sans-serif] hover:text-slate-900 transition-colors flex items-center justify-center gap-2 hover:bg-slate-50 rounded-xl"
            >
              <ChevronLeft size={18} />
              Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
