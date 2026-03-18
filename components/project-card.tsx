"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

interface ProjectProps {
  project: {
    title: string
    description: string
    image: string
    technologies: string[]
    role: string
    type: string
  }
  index: number
  theme: "dark" | "light"
  isInView?: boolean
}

export default function ProjectCard({ project, index, theme, isInView = true }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card rounded-2xl overflow-hidden group ${
        theme === "dark"
          ? "bg-gray-800/40 border-gray-700/30 hover:border-emerald-400/30"
          : "bg-white/60 border-gray-200/50 hover:border-blue-500/30"
      }`}
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${
            isHovered ? "scale-110 brightness-75" : "scale-100 brightness-100"
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          theme === "dark" ? "from-gray-900/90" : "from-gray-900/70"
        } via-transparent to-transparent`} />

        {/* Overlay info */}
        <div className="absolute bottom-0 left-0 p-5">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-2 ${
              theme === "dark"
                ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
            }`}
          >
            {project.type}
          </span>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className={`text-sm ${theme === "dark" ? "text-emerald-400/80" : "text-blue-300"}`}>
            {project.role}
          </p>
        </div>

        {/* Hover action buttons */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#"
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="View code"
          >
            <Github size={16} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Live demo"
          >
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-emerald-400/10 text-emerald-400/80 hover:bg-emerald-400/20"
                  : "bg-blue-500/10 text-blue-600/80 hover:bg-blue-500/20"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
