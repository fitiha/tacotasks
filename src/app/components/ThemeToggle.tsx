"use client"

import { FiSun, FiMoon } from "react-icons/fi"

interface ThemeToggleProps {
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
}

export default function ThemeToggle({ isDarkMode, setIsDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
    >
      {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  )
}

