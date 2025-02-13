"use client"

import { motion } from "framer-motion"

interface FilterButtonsProps {
  filter: "all" | "active" | "completed" | "archived"
  setFilter: (filter: "all" | "active" | "completed" | "archived") => void
}

export default function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      {["all", "active", "completed", "archived"].map((buttonFilter) => (
        <motion.button
          key={buttonFilter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter(buttonFilter as "all" | "active" | "completed" | "archived")}
          className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none ${
            filter === buttonFilter
              ? "bg-purple-600 text-white dark:bg-purple-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {buttonFilter.charAt(0).toUpperCase() + buttonFilter.slice(1)}
        </motion.button>
      ))}
    </div>
  )
}

