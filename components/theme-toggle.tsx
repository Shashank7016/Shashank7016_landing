"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  onThemeChange: (theme: "dark" | "light") => void
  currentTheme?: "dark" | "light"
}

export default function ThemeToggle({ onThemeChange, currentTheme }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">(currentTheme || "dark")

  // Update local state when prop changes
  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme)
    }
  }, [currentTheme])

  // Initialize local theme state from localStorage on mount,
  // without notifying the parent again (parent already handles global theme)
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    onThemeChange(newTheme)

    // Store preference in localStorage
    localStorage.setItem("portfolio-theme", newTheme)
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative rounded-full p-2 ${
        theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-blue-100 hover:bg-blue-200"
      } transition-colors duration-300`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 180 }} transition={{ duration: 0.5 }}>
        {theme === "dark" ? (
          <Sun size={20} className="text-yellow-300" />
        ) : (
          <Moon size={20} className="text-blue-600" />
        )}
      </motion.div>
    </motion.button>
  )
}
