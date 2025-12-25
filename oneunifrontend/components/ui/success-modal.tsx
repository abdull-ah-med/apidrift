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
          className="w-[100px] h-[100px] rounded-full bg-primary flex items-center justify-center shadow-lg"
        >
          <Check size={50} className="text-white" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-[12px]"
        >
          <h2 className="font-semibold text-[32px] text-text-main">
            {firstName ? `Welcome aboard, ${firstName}!` : title}
          </h2>
          <p className="text-[17px] text-text-muted max-w-[400px]">
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
          className="px-[32px] py-[14px] bg-primary hover:bg-primary/90 rounded-[12px] font-medium text-[16px] text-white transition-all shadow-md"
        >
          {actionLabel}
        </motion.button>
      </div>
    </Modal>
  );
}
