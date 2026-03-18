"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import EnhancedSkills from "@/components/enhanced-skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { ThreeDBackground } from "@/components/three-d-background"
import { DayBackground } from "@/components/day-background"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }

    const handleHashLink = () => {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      }
    }

    handleHashLink()
    window.addEventListener("hashchange", handleHashLink)

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
      window.removeEventListener("hashchange", handleHashLink)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (theme === "light") {
      root.style.setProperty("--foreground-rgb", "33, 33, 33")
      root.style.setProperty("--background-start-rgb", "255, 255, 255")
      root.style.setProperty("--background-end-rgb", "255, 255, 255")
      root.style.setProperty("--scrollbar-track-bg", "transparent")
      root.style.setProperty("--scrollbar-thumb-bg", "#1976d2")
      root.style.setProperty("--scrollbar-thumb-hover-bg", "#1565c0")
    } else {
      root.style.setProperty("--foreground-rgb", "255, 255, 255")
      root.style.setProperty("--background-start-rgb", "0, 0, 0")
      root.style.setProperty("--background-end-rgb", "0, 0, 0")
      root.style.setProperty("--scrollbar-track-bg", "transparent")
      root.style.setProperty("--scrollbar-thumb-bg", "#3eeaac")
      root.style.setProperty("--scrollbar-thumb-hover-bg", "#2dd89a")
    }

    localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setTheme(newTheme)
  }

  return (
    <div ref={containerRef} className={`relative min-h-screen w-full ${theme === "light" ? "light-theme" : "dark-theme"}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX,
          background: theme === "dark"
            ? "linear-gradient(90deg, #3eeaac, #3e8eea)"
            : "linear-gradient(90deg, #1976d2, #42a5f5)",
        }}
      />

      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        {theme === "dark" ? <ThreeDBackground /> : <DayBackground />}
      </div>

      {/* Subtle gradient overlay that doesn't obstruct */}
      <div
        className={`fixed inset-0 -z-10 w-full h-full pointer-events-none ${
          theme === "dark"
            ? "bg-gradient-to-b from-transparent via-black/20 to-black/60"
            : "bg-gradient-to-b from-transparent via-white/10 to-white/30"
        }`}
      />

      <Navbar onThemeChange={handleThemeChange} theme={theme} />

      <main className="relative z-10 w-full">
        <Hero theme={theme} />
        <About theme={theme} />
        <EnhancedSkills theme={theme} />
        <Experience theme={theme} />
        <Projects theme={theme} />
        <Education theme={theme} />
        <Contact theme={theme} />
        <Footer theme={theme} />
      </main>
    </div>
  )
}
