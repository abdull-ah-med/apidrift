"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Modal from "./modal";

type SuccessModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  firstName?: string;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SuccessModal({
  isOpen,
  title,
  description,
  firstName,
  onClose,
  actionLabel = "Get Started",
  onAction,
}: SuccessModalProps) {
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnBackdropClick={false}>
      <div className="flex flex-col items-center justify-center gap-[32px] p-[40px] text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className="w-[100px] h-[100px] rounded-full bg-[#2563eb] flex items-center justify-center shadow-lg"
        >
          <Check size={50} className="text-white" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-[12px]"
        >
          <h2 className="font-['Inter:Semi_Bold',sans-serif] text-[32px] text-[#1e293b]">
            {firstName ? `Welcome aboard, ${firstName}!` : title}
          </h2>
          <p className="font-['Inter:Regular',sans-serif] text-[17px] text-[#64748b] max-w-[400px]">
            {description}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAction}
          className="px-[32px] py-[14px] bg-[#2563eb] hover:bg-[#1d4ed8] rounded-[12px] font-['Inter:Medium',sans-serif] text-[16px] text-white transition-all shadow-md"
        >
          {actionLabel}
        </motion.button>
      </div>
    </Modal>
  );
}
