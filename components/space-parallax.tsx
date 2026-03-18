"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface SpaceParallaxProps {
  scrollY: number
}

export default function SpaceParallax({ scrollY }: SpaceParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate which section we're in based on scroll position
  const sectionHeight = typeof window !== "undefined" ? window.innerHeight : 1000
  const currentSection = Math.floor(scrollY / sectionHeight)

  // Different space elements for different sections with colors instead of images
  const spaceElements = [
    { id: 0, element: "nebula", color: "rgba(41, 128, 185, 0.2)", position: 0 },
    { id: 1, element: "asteroid-belt", color: "rgba(142, 68, 173, 0.2)", position: sectionHeight },
    { id: 2, element: "galaxy", color: "rgba(231, 76, 60, 0.2)", position: sectionHeight * 2 },
    { id: 3, element: "black-hole", color: "rgba(52, 152, 219, 0.2)", position: sectionHeight * 3 },
    { id: 4, element: "supernova", color: "rgba(243, 156, 18, 0.2)", position: sectionHeight * 4 },
    { id: 5, element: "cosmic-dust", color: "rgba(46, 204, 113, 0.2)", position: sectionHeight * 5 },
  ]

  // Filter elements that should be visible based on current scroll position
  const visibleElements = spaceElements.filter((el) => Math.abs(scrollY - el.position) < sectionHeight * 2)

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-5">
      {visibleElements.map((el) => {
        // Calculate parallax effect based on scroll position
        const yOffset = (scrollY - el.position) * 0.5
        const opacity = 1 - Math.min(1, Math.abs(scrollY - el.position) / sectionHeight)

        return (
          <motion.div
            key={el.id}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity,
              y: yOffset,
              backgroundColor: el.color,
              zIndex: -5,
            }}
          />
        )
      })}

      {/* Floating particles that move with scroll */}
      <div className="absolute inset-0 w-full h-full">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1
          const speed = Math.random() * 0.3 + 0.1
          const initialLeft = Math.random() * 100
          const initialTop = Math.random() * 100

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: size,
                height: size,
                left: `${initialLeft}%`,
                top: `${initialTop}%`,
                opacity: Math.random() * 0.5 + 0.3,
                y: scrollY * speed,
                x: Math.sin(scrollY * speed * 0.05) * 20,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
