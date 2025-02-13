"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiPlus } from "react-icons/fi"

interface TaskInputProps {
  onAddTask: (text: string) => void
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTask(text.trim())
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-white bg-purple-600 rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          <FiPlus className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  )
}

