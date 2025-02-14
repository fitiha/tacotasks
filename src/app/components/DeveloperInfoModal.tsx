"use client"

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion"
import type React from "react" 

const DeveloperInfoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">Developer Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                This task manager was developed by Natnael Fisseha. For more information, please contact me at <a href="mailto:natnaelfisseha.16@gmail.com" className="text-blue-500">natnaelfisseha.16@gmail.com</a>.
              </p>
              <Button
                onClick={onClose}
                className="mt-4 bg-violet-700 text-white px-4 py-2 hover:bg-blue-600"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

export default DeveloperInfoModal;