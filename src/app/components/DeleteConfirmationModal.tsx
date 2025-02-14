"use client"

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion"
import type React from "react" 

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel }: { isOpen: boolean; onConfirm: () => void; onCancel: () => void }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onCancel}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">Confirm Deletion</h2>
              <p className="text-gray-700 dark:text-gray-300">Are you sure you want to delete this task?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <Button
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onConfirm}
                  className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

export default DeleteConfirmationModal;