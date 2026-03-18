"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

interface ExperienceProps {
  theme: "dark" | "light"
}

const experiences = [
  {
    title: "Frontend Developer",
    company: "Spryzo",
    description:
      "Developed the frontend using Next.js and React.js, incorporating responsive designs with Tailwind CSS and SCSS. Created reusable UI components and integrated AI-driven features to match talent with businesses based on skills. Ensured seamless alignment of design and functionality to enhance user experience.",
    period: "July 2024 to Nov 2024",
    technologies: ["Next.js", "React.js", "SCSS", "Tailwind CSS", "AI", "LLM Models"],
  },
  {
    title: "Frontend Contributor",
    company: "Digital Notebook (Internal Tool for Corporate Client)",
    description:
      "Built an interactive digital notebook with React.js, enabling real-time data saving and retrieval. Customized animations with React and CSS to create a more engaging and user-friendly experience.",
    period: "May 2021 to July 2021",
    technologies: ["React.js", "CSS", "Firebase", "jsPDF"],
  },
]

export default function Experience({ theme }: ExperienceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="experience"
      className={`py-24 md:py-32 ${
        theme === "dark"
          ? "bg-gradient-to-b from-black/80 to-gray-900/80"
          : "bg-gradient-to-b from-white/80 to-blue-50/80"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              theme === "dark"
                ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                : "bg-blue-500/10 text-blue-700 border border-blue-500/20"
            }`}
          >
            Work Experience
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>
            Professional Journey
          </h2>
          <div className={`w-12 h-1 rounded-full ${theme === "dark" ? "bg-emerald-400" : "bg-blue-500"} mx-auto`} />
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="max-w-3xl mx-auto">
          <div className="relative pl-8 md:pl-12 space-y-12">
            {/* Animated timeline line */}
            <motion.div
              className={`absolute left-0 top-2 w-[2px] origin-top ${
                theme === "dark" ? "bg-gradient-to-b from-emerald-400 to-emerald-400/10" : "bg-gradient-to-b from-blue-500 to-blue-500/10"
              }`}
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.2, type: "spring" }}
                  className={`absolute -left-8 md:-left-12 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-gray-900 border-2 border-emerald-400" : "bg-white border-2 border-blue-500"
                  }`}
                >
                  <Briefcase size={12} className={theme === "dark" ? "text-emerald-400" : "text-blue-600"} />
                </motion.div>

                {/* Card */}
                <div
                  className={`glass-card rounded-2xl p-6 ${
                    theme === "dark"
                      ? "bg-gray-800/40 border-gray-700/30 hover:border-emerald-400/30"
                      : "bg-white/60 border-gray-200/50 hover:border-blue-500/30"
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                    <div>
                      <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                        {exp.title}
                      </h3>
                      <p className={`text-sm font-medium ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>
                        {exp.company}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          theme === "dark"
                            ? "bg-emerald-400/10 text-emerald-400/80"
                            : "bg-blue-500/10 text-blue-600/80"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
