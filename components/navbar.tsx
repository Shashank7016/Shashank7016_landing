"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

interface NavbarProps {
  onThemeChange: (theme: "dark" | "light") => void
  theme: "dark" | "light"
}

export default function Navbar({ onThemeChange, theme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [clickedSection, setClickedSection] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const scrollingTimeout = useRef<NodeJS.Timeout | null>(null)

  const determineActiveSection = () => {
    const sectionElements = navItems
      .map((item) => {
        const id = item.href.substring(1)
        const element = document.getElementById(id)
        if (!element) return null

        const rect = element.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const visiblePercentage = visibleHeight > 0 ? visibleHeight / rect.height : 0

        return { id, rect, visiblePercentage }
      })
      .filter(Boolean)

    if (clickedSection && scrollingTimeout.current) {
      return clickedSection
    }

    const mostVisibleSections = [...sectionElements].sort((a, b) => {
      if (Math.abs(a!.visiblePercentage - b!.visiblePercentage) > 0.3) {
        return b!.visiblePercentage - a!.visiblePercentage
      }
      const scrollingUp = window.scrollY < lastScrollY.current
      if (scrollingUp) {
        return a!.rect.top - b!.rect.top
      } else {
        return b!.rect.bottom - a!.rect.bottom
      }
    })

    return mostVisibleSections.length > 0 ? mostVisibleSections[0]!.id : navItems[0].href.substring(1)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      if (!scrollingTimeout.current) {
        const newActiveSection = determineActiveSection()
        setActiveSection(newActiveSection)
      }

      lastScrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollingTimeout.current) {
        clearTimeout(scrollingTimeout.current)
      }
    }
  }, [clickedSection])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const sectionId = href.substring(1)
    setActiveSection(sectionId)
    setClickedSection(sectionId)

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })

      if (scrollingTimeout.current) {
        clearTimeout(scrollingTimeout.current)
      }

      scrollingTimeout.current = setTimeout(() => {
        setClickedSection(null)
        scrollingTimeout.current = null
        const finalActiveSection = determineActiveSection()
        setActiveSection(finalActiveSection)
      }, 1000)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-black/70 backdrop-blur-xl py-3 shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-white/70 backdrop-blur-xl py-3 shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick("#home")
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-800"}`}
          >
            Shashank
            <span className={`${theme === "dark" ? "text-emerald-400" : "text-blue-500"}`}>.</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="relative px-3 py-2 group"
              >
                <span
                  className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? theme === "dark" ? "text-emerald-400" : "text-blue-600"
                      : theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </span>

                {/* Clean underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full ${
                      theme === "dark" ? "bg-emerald-400" : "bg-blue-500"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Subtle hover bg */}
                <motion.div
                  className={`absolute inset-0 rounded-lg ${
                    theme === "dark" ? "bg-white/5" : "bg-black/5"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </Link>
            )
          })}

          <div className="ml-3 pl-3 border-l border-gray-500/20">
            <ThemeToggle onThemeChange={onThemeChange} currentTheme={theme} />
          </div>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle onThemeChange={onThemeChange} currentTheme={theme} />
          <button
            type="button"
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-black/5"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`md:hidden overflow-hidden ${
              theme === "dark" ? "bg-black/90" : "bg-white/90"
            } backdrop-blur-xl`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? theme === "dark"
                            ? "text-emerald-400 bg-emerald-400/10"
                            : "text-blue-600 bg-blue-500/10"
                          : theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-white/5"
                            : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
