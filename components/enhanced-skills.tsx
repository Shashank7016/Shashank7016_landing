"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Server, Cloud, Database, Brain } from "lucide-react"

interface EnhancedSkillsProps {
  theme: "dark" | "light"
}

const proficiencyLevels = {
  expert: { label: "Expert", width: "100%" },
  advanced: { label: "Advanced", width: "80%" },
  intermediate: { label: "Intermediate", width: "60%" },
  beginner: { label: "Beginner", width: "35%" },
}

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="w-5 h-5" />,
    skills: [
      { name: "React.js", proficiency: "expert" },
      { name: "Next.js", proficiency: "advanced" },
      { name: "JavaScript (ES6+)", proficiency: "expert" },
      { name: "TypeScript", proficiency: "advanced" },
      { name: "Tailwind CSS", proficiency: "advanced" },
      { name: "SCSS", proficiency: "advanced" },
      { name: "Three.js", proficiency: "intermediate" },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Node.js", proficiency: "advanced" },
      { name: "Express.js", proficiency: "advanced" },
      { name: "RESTful APIs", proficiency: "expert" },
      { name: "WebSocket", proficiency: "intermediate" },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="w-5 h-5" />,
    skills: [
      { name: "AWS (EC2, S3)", proficiency: "intermediate" },
      { name: "Azure", proficiency: "intermediate" },
      { name: "CI/CD Pipelines", proficiency: "intermediate" },
      { name: "GitHub Actions", proficiency: "advanced" },
    ],
  },
  {
    title: "Database Management",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "MongoDB", proficiency: "advanced" },
      { name: "MySQL", proficiency: "advanced" },
      { name: "PostgreSQL", proficiency: "intermediate" },
    ],
  },
  {
    title: "AI Technologies",
    icon: <Brain className="w-5 h-5" />,
    skills: [
      { name: "Pandas", proficiency: "intermediate" },
      { name: "NumPy", proficiency: "intermediate" },
      { name: "GPT Models", proficiency: "intermediate" },
      { name: "LangChain", proficiency: "beginner" },
    ],
  },
]

const getProficiencyColor = (proficiency: string, theme: "dark" | "light") => {
  if (theme === "dark") {
    switch (proficiency) {
      case "expert": return "bg-emerald-400"
      case "advanced": return "bg-emerald-400/80"
      case "intermediate": return "bg-emerald-400/60"
      case "beginner": return "bg-emerald-400/40"
      default: return "bg-gray-400"
    }
  } else {
    switch (proficiency) {
      case "expert": return "bg-blue-600"
      case "advanced": return "bg-blue-500"
      case "intermediate": return "bg-blue-400"
      case "beginner": return "bg-blue-300"
      default: return "bg-gray-400"
    }
  }
}

export default function EnhancedSkills({ theme }: EnhancedSkillsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section
      id="skills"
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
          className="text-center mb-16"
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              theme === "dark"
                ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                : "bg-blue-500/10 text-blue-700 border border-blue-500/20"
            }`}
          >
            My Skills
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>
            Technical Expertise
          </h2>
          <div className={`w-12 h-1 rounded-full ${theme === "dark" ? "bg-emerald-400" : "bg-blue-500"} mx-auto`} />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`glass-card rounded-2xl p-6 ${
                theme === "dark"
                  ? "bg-gray-800/40 border-gray-700/30"
                  : "bg-white/60 border-gray-200/50"
              } ${hoveredCard === index ? "tilt-card" : ""}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl ${
                  theme === "dark"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-blue-500/10 text-blue-600"
                } transition-transform duration-300 ${hoveredCard === index ? "scale-110 rotate-3" : ""}`}>
                  {category.icon}
                </div>
                <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const level = proficiencyLevels[skill.proficiency as keyof typeof proficiencyLevels]
                  return (
                    <div key={skillIndex} className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                          {skill.name}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            theme === "dark"
                              ? "text-emerald-400/80 bg-emerald-400/10"
                              : "text-blue-600/80 bg-blue-500/10"
                          }`}
                        >
                          {level.label}
                        </span>
                      </div>

                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/80"
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: level.width } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: 0.3 + skillIndex * 0.08,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className={`h-full rounded-full ${getProficiencyColor(skill.proficiency, theme)}`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
