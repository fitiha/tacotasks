"use client"

import { motion } from "framer-motion"
import { FiPlus } from "react-icons/fi"

interface FloatingAddButtonProps {
  onClick: () => void
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none"
      onClick={onClick}
    >
      <FiPlus className="w-6 h-6" />
    </motion.button>
  )
}

