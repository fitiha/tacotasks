"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiBarChart2 } from "react-icons/fi"

interface Task {
  id: string
  completed: boolean
  archived: boolean
}

interface ProgressGraphProps {
  tasks: Task[]
}

export default function ProgressGraph({ tasks }: ProgressGraphProps) {
  const [isOpen, setIsOpen] = useState(false)

  const completedTasks = tasks.filter((task) => task.completed && !task.archived).length
  const totalTasks = tasks.filter((task) => !task.archived).length
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
      >
        <FiBarChart2 className="mr-2" />
        {isOpen ? "Hide Progress" : "Show Progress"}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-purple-600 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
            {completedTasks} of {totalTasks} tasks completed ({Math.round(completionPercentage)}%)
          </p>
        </motion.div>
      )}
    </div>
  )
}

