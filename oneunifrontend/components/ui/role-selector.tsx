"use client";
import { motion } from "framer-motion";

type Role = "student" | "mentor" | "";

type RoleSelectorProps = {
  roleId: string;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  isSelected: boolean;
  onRoleSelect: (role: Role) => void;
};

export default function RoleSelector({
  roleId,
  label,
  icon: Icon,
  isSelected,
  onRoleSelect,
}: RoleSelectorProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onRoleSelect(roleId as Role)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex flex-col items-center gap-[16px] p-[24px] rounded-[10px] border-2 transition-all ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <motion.div
        initial={false}
        animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
        className={`w-[56px] h-[56px] rounded-[10px] flex items-center justify-center ${
          isSelected ? "bg-primary" : "bg-slate-100"
        } transition-colors`}
      >
        <Icon
          size={28}
          className={isSelected ? "text-white" : "text-text-muted"}
        />
      </motion.div>
      <div className="flex flex-col gap-[4px] text-center">
        <p className={`font-medium text-[16px] ${
          isSelected ? "text-primary" : "text-text-main"
        } transition-colors`}>
          {label}
        </p>
        {/* <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#64748b]">
          {description}
        </p> */}
      </div>
    </motion.button>
  );
}
