"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react" 
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  color: string
  archived: boolean
}

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, "id" | "completed" | "archived">) => void
  editingTask: Task | null
  onEditTask: (task: Task) => void
}

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]

export default function AddTaskModal({ isOpen, onClose, onAddTask, editingTask, onEditTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("bg-purple-500")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setColor(editingTask.color)
    } else {
      setTitle("")
      setDescription("")
      setColor("bg-purple-500")
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      if (editingTask) {
        onEditTask({ ...editingTask, title, description, color })
      } else {
        onAddTask({ title, description, color })
        setTitle("")
        setDescription("")
        setColor("bg-purple-500")
      }
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{editingTask ? "Edit Task" : "Add New Task"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <div className="flex justify-between mb-4">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`w-8 h-8 rounded-full ${c} ${color === c ? "ring-2 ring-offset-2 ring-black" : ""}`}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 dark:text-gray-300 mr-2">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  {editingTask ? "Save Changes" : "Add Task"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

