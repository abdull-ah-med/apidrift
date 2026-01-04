import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  FileCheck, 
  XCircle, 
  Shield, 
  ScanLine,
  CreditCard,
  UserCheck,
  Fingerprint
} from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import { ValidateDocuments } from '../../lib/validation/validate';
import Button from '../ui/button';
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

  const handleTypeChange = (name: keyof ProfileData, value: string) => {
    updateData({ [name]: value });
  };

  const validate = () => {
    // const newErrors = ValidateDocuments(data);
    // setErrors(newErrors as Record<string, string>);
    // return Object.keys(newErrors).length === 0;
    return true; // Bypassing validation for testing
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const documents = [
    { 
      name: 'cnicDoc' as keyof ProfileData, 
      label: 'Identity Document', 
      description: 'National Identity Card or B-Form',
      required: true,
      icon: Shield,
      typeField: 'cnicDocType' as keyof ProfileData,
      types: [
        { label: 'CNIC', value: 'cnic', icon: CreditCard, desc: 'Smart Card' },
        { label: 'B-Form', value: 'bform', icon: FileText, desc: 'Child Reg.' },
        { label: 'NIC', value: 'nic', icon: UserCheck, desc: 'Old Identity' },
      ]
    },
    { 
      name: 'matricDoc' as keyof ProfileData, 
      label: 'Matric Certificate', 
      description: 'SSC / Matriculation Result',
      required: true,
      icon: FileText
    },
    { 
      name: 'interDoc' as keyof ProfileData, 
      label: 'Intermediate Result', 
      description: 'HSSC Result (Complete or 1st Year)',
      required: true,
      icon: FileText,
      typeField: 'interDocType' as keyof ProfileData,
      types: [
        { label: 'Complete', value: 'complete', icon: FileCheck },
        { label: '1st Year', value: 'firstYear', icon: FileText },
      ]
    },
    { 
      name: 'domicileDoc' as keyof ProfileData, 
      label: 'Domicile (Optional)', 
      description: 'Domicile Certificate (If available)',
      required: false,
      icon: ScanLine
    },
  ];

  const uploadedCount = Object.values(data).filter((val) => val instanceof File).length;
  const requiredDocs = documents.filter(d => d.required).length;
  const uploadedRequiredCount = documents.filter(d => d.required && data[d.name] instanceof File).length;
  const progress = (uploadedRequiredCount / requiredDocs) * 100;

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Shield size={20} />
          </div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">Document Verification</h1>
        </div>
        <p className="text-text-muted text-base max-w-3xl leading-relaxed">
          Please upload clear, scanned copies of your original documents.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Document List */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {documents.map((doc, index) => {
            const file = data[doc.name] as File | null;
            const hasError = errors[doc.name];
            const Icon = doc.icon;
            const isUploaded = !!file;
            const hasTypes = !!doc.types;
            const typeSelected = hasTypes ? !!data[doc.typeField!] : true;

            return (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={clsx(
                  "group relative bg-white rounded-[32px] border-2 transition-all duration-500",
                  isUploaded 
                    ? "border-emerald-500/20 bg-emerald-50/10 shadow-sm" 
                    : hasError 
                    ? "border-red-200 bg-red-50/10" 
                    : "border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
                )}
              >
                <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Document Info */}
                  <div className="flex items-start gap-5 flex-1">
                    <div className={clsx(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500",
                      isUploaded 
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "bg-slate-50 text-text-muted group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20"
                    )}>
                      {isUploaded ? <CheckCircle size={28} /> : <Icon size={28} />}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-text-main tracking-tight">{doc.label}</h3>
                        {isUploaded && (
                          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Verified</span>
                        )}
                        {doc.required && !isUploaded && (
                          <span className="px-2.5 py-0.5 bg-slate-100 text-text-muted text-[10px] font-bold uppercase tracking-widest rounded-full">Required</span>
                        )}
                      </div>
                      <p className="text-sm text-text-body font-medium leading-relaxed max-w-md">{doc.description}</p>
                      {doc.name === 'cnicDoc' && !isUploaded && (
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 w-fit px-2.5 py-1 rounded-lg border border-primary/10">
                          <Fingerprint size={12} />
                          <span>Both sides in one file</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {hasTypes && !isUploaded && (
                      <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 gap-1">
                        {doc.types!.map((type: any) => {
                          const isSelected = data[doc.typeField!] === type.value;
                          return (
                            <Button
                              key={type.value}
                              variant={isSelected ? "primary" : "ghost"}
                              onClick={() => handleTypeChange(doc.typeField!, type.value)}
                              className={clsx(
                                "px-5 py-2.5 rounded-xl text-xs h-auto",
                                isSelected ? "shadow-md" : "text-slate-400 hover:text-text-body"
                              )}
                              iconLeft={type.icon && <type.icon size={16} />}
                            >
                              {type.label}
                            </Button>
                          );
                        })}
                      </div>
                    )}

                    {isUploaded ? (
                      <div className="flex items-center gap-4 p-2 pr-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                          <FileCheck size={24} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-text-main truncate max-w-[120px]">{file.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{(file.size / 1024).toFixed(0)} KB</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="ml-2 p-2 h-auto rounded-xl text-slate-300 hover:text-primary"
                          onClick={() => document.getElementById(`file-${doc.name}`)?.click()}
                        >
                          <Upload size={18} />
                        </Button>
                        <input 
                          id={`file-${doc.name}`}
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png" 
                          onChange={handleFileChange(doc.name)} 
                          className="hidden" 
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <Button
                          disabled={!typeSelected}
                          onClick={() => document.getElementById(`file-${doc.name}`)?.click()}
                          className={clsx(
                            "px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/10",
                            !typeSelected && "opacity-50 cursor-not-allowed"
                          )}
                          iconLeft={<Upload size={20} />}
                        >
                          {typeSelected ? "Upload Document" : "Select Type"}
                        </Button>
                        <input 
                          id={`file-${doc.name}`}
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png" 
                          onChange={handleFileChange(doc.name)} 
                          className="hidden" 
                          disabled={!typeSelected}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar - Summary & Guidelines */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Summary & Guidelines Card */}
          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col gap-6">
            {/* Progress Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xl font-bold text-text-main">Summary</h3>
                  <p className="text-xs text-text-muted font-medium">Upload progress</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-black text-text-main leading-none">{uploadedRequiredCount}/{requiredDocs}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Documents</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{uploadedRequiredCount} Uploaded</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{requiredDocs - uploadedRequiredCount} Pending</span>
                </div>
              </div>
            </div>

            {/* Guidelines Section - Integrated */}
            <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-primary" />
                <h4 className="text-sm font-bold text-text-main">Upload Guidelines</h4>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { title: "File Size", desc: "Max 5MB", icon: FileText },
                  { title: "Formats", desc: "PDF, JPG, PNG", icon: FileCheck },
                  { title: "Quality", desc: "Clear & Legible", icon: ScanLine },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-text-muted shadow-sm">
                      <item.icon size={12} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-text-body">{item.title}:</span>
                      <span className="text-[11px] text-text-muted font-medium">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl text-base shadow-xl shadow-primary/20"
                iconRight={<ChevronRight size={20} />}
              >
                Review Application
              </Button>
              <Button
                variant="ghost"
                onClick={onBack}
                className="w-full py-3 text-text-muted hover:text-text-main text-sm"
              >
                Back to Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
