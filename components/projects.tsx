"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"

interface ProjectsProps {
  theme: "dark" | "light"
}

const projects = [
  {
    title: "3D Shoe Customization & Store",
    description:
      "Built an interactive 3D shoe customization platform with Three.js, enabling real-time design modifications. Designed an intuitive interface using Tailwind CSS to boost user engagement. Integrated e-commerce features for browsing, customizing, and purchasing shoes.",
    image: "/custom-kicks-studio.png",
    technologies: ["Next.js", "React.js", "Three.js", "Tailwind CSS"],
    role: "Frontend Developer",
    type: "Pre-Seed Startup",
    github: "https://github.com/Shashank7016/3dSneaker_Store", // TODO: add GitHub link
    demo: "https://3dsneakershoestore.vercel.app/",   // TODO: add live demo link
  },
  {
    title: "Flood Prevention Management System",
    description:
      "Developed a user-friendly frontend using React.js and Ant Design to display predictive analytics and evacuation plans. Leveraged Papa Parse for efficient data processing and visualization of large datasets. Collaborated with backend developers to ensure seamless integration and optimal performance.",
    image: "/flood-management-dashboard.png",
    technologies: ["React.js", "Ant Design", "Papa Parse"],
    role: "Frontend Developer",
    type: "Pre-Seed Startup",
    github: "https://github.com/Shashank7016/flood-prediction-app", // TODO: add GitHub link
    demo: "https://github.com/Shashank7016/flood-prediction-app",   // TODO: add live demo link
  },
  {
    title: "FAQ Chatbot System",
    description:
      "Built a 24/7 chatbot for the Swinburne Online portal using React.js and Ant Design for a seamless user experience. Integrated NLP models, including GPT-medium and DistilBERT, to deliver accurate and contextually relevant responses. Developed backend services with Flask and Node.js to support real-time interactions.",
    image: "/modern-ai-chatbot.png",
    technologies: ["GPT-medium", "DistilBERT", "Flask", "Node.js", "React.js", "Ant Design"],
    role: "Full Stack Developer",
    type: "Academic Project",
    github: "https://github.com/Shashank7016/swinburne-faq-ai", // TODO: add GitHub link
    demo: "https://github.com/Shashank7016/swinburne-faq-ai",   // TODO: add live demo link
  },
  {
    title: "AI Bill Splitter",
    description:
      "Developed a smart bill-splitting app where users can snap a photo of a receipt and AI automatically analyzes and extracts line items. Users can add group members and split expenses fairly among themselves. Built with a full-stack architecture featuring real-time updates and an intuitive drag-and-drop interface for assigning items.",
    image: "/ai-bill-splitter.svg",
    technologies: ["React.js", "Vite", "Tailwind CSS", "OpenAI GPT-4o-mini", "Vision API", "Canvas 2D API"],
    role: "Full Stack Developer",
    type: "Personal Project",
    github: "https://github.com/Shashank7016/splitbill", // TODO: add GitHub link
    demo: "https://aisplitbill.vercel.app/",   // TODO: add live demo link
  },
  {
    title: "AI Image Generator & Editor",
    description:
      "Built an AI-powered image generation platform where users can create images from text prompts and edit them directly on an interactive canvas. Features include inpainting, outpainting, layer management, and real-time brush editing. Integrated generative AI APIs with a custom canvas editor for a seamless creative workflow.",
    image: "/ai-image-generator.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI GPT-Image-1", "Node.js"],
    role: "Full Stack Developer",
    type: "Personal Project",
    github: "https://github.com/Shashank7016/ImageGen", // TODO: add GitHub link
    demo: "https://imagegen-rose.vercel.app/",   // TODO: add live demo link
  },
  {
    title: "Code Editor",
    description:
      "Designed and developed a real-time code editor using React.js and CodeMirror, supporting HTML, CSS, and JavaScript. Implemented features for managing multiple editors, persistent state handling, and code sharing. Enhanced user experience with syntax highlighting, auto-completion, and real-time error detection.",
    image: "/code-editor-syntax.png",
    technologies: ["React.js", "HTML", "CSS", "JavaScript", "CodeMirror"],
    role: "Developer",
    type: "Personal Project",
    github: "https://github.com/Shashank7016/code-editor", // TODO: add GitHub link
    demo: "https://github.com/Shashank7016/code-editor",   // TODO: add live demo link
  },
]

export default function Projects({ theme }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeFilter, setActiveFilter] = useState("All")

  const allTechnologies = ["All"]
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      if (!allTechnologies.includes(tech)) {
        allTechnologies.push(tech)
      }
    })
  })

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.technologies.some((tech) => tech === activeFilter))

  return (
    <section
      id="projects"
      className={`py-24 md:py-32 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900/80 to-black/80"
          : "bg-gradient-to-b from-blue-50/80 to-white/80"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              theme === "dark"
                ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                : "bg-blue-500/10 text-blue-700 border border-blue-500/20"
            }`}
          >
            My Work
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>
            Featured Projects
          </h2>
          <div className={`w-12 h-1 rounded-full ${theme === "dark" ? "bg-emerald-400" : "bg-blue-500"} mx-auto mb-10`} />

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTechnologies.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? theme === "dark"
                      ? "bg-emerald-400 text-gray-900"
                      : "bg-blue-600 text-white"
                    : theme === "dark"
                      ? "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                      : "bg-black/5 text-gray-500 hover:text-gray-900 hover:bg-black/10 border border-black/5"
                } hover:scale-105 active:scale-95`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} theme={theme} isInView={isInView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
