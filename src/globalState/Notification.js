import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Notification = ({ title = "", message, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(state => {
        if (state < 100) return state + 1;
        return state;
      });
    }, 10);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      animate={{ left: -50 }}
      transition={{ duration: 0.5 }}
      className="left-0  mt-2  right-0 z-50 max-w-lg w-full bg-white rounded-lg shadow-lg relative"
    >
      <div className="font-sans rounded-lg shadow-xs overflow-hidden  z-10 right-auto">
        <div>
          <div
            className="border-t-4 border-blue-700"
            style={{ width: `${step}%` }}
          />
        </div>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-green-400"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="font-semibold mx-2 text-gray-800">
                {title || "Successfully saved!"}
              </div>
              <div className="mx-2 text-sm text-gray-600">
                {message || "Anyone with a link can save this file."}
              </div>
            </div>
            <div className="ml-2" onClick={onClose}>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-600"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Notification;
