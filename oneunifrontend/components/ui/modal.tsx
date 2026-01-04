"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdropClick?: boolean;
};

const sizeClasses = {
  sm: "max-w-[300px]",
  md: "max-w-[480px]",
  lg: "max-w-[640px]",
  xl: "max-w-[896px]",
};

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnBackdropClick = true,
}: ModalProps) {
  const handleBackdropClick = () => {
    if (closeOnBackdropClick && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className={`${sizeClasses[size]} bg-white rounded-[16px] shadow-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
