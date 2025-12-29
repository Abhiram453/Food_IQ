"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    warning: (message, duration) => addToast(message, "warning", duration),
    info: (message, duration) => addToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onRemove={() => onRemove(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ message, type, onRemove }) {
  const config = {
    success: {
      icon: CheckCircle,
      bg: "bg-gradient-to-r from-green-500 to-emerald-600",
      border: "border-green-400/30",
    },
    error: {
      icon: XCircle,
      bg: "bg-gradient-to-r from-red-500 to-rose-600",
      border: "border-red-400/30",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-gradient-to-r from-amber-500 to-orange-600",
      border: "border-amber-400/30",
    },
    info: {
      icon: Info,
      bg: "bg-gradient-to-r from-green-400 to-teal-500",
      border: "border-green-400/30",
    },
  };

  const { icon: Icon, bg, border } = config[type] || config.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`${bg} ${border} border backdrop-blur-xl rounded-xl p-4 shadow-2xl shadow-black/20 flex items-center gap-3`}
    >
      <Icon className="w-5 h-5 text-white flex-shrink-0" />
      <p className="text-white text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onRemove}
        className="text-white/70 hover:text-white transition-colors p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default Toast;
