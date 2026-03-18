"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Server, Database, Cloud, Brain } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="h-8 w-8 text-emerald-400" />,
    skills: [
      { name: "React.js", proficiency: "Expert", description: "Component architecture, hooks, context API" },
      { name: "Next.js", proficiency: "Advanced", description: "Server components, app router, data fetching" },
      { name: "JavaScript (ES6+)", proficiency: "Expert", description: "Async/await, modules, functional programming" },
      { name: "TypeScript", proficiency: "Advanced", description: "Type systems, interfaces, generics" },
      { name: "Tailwind CSS", proficiency: "Advanced", description: "Responsive design, custom configurations" },
      { name: "SCSS", proficiency: "Advanced", description: "Mixins, variables, nested rules" },
      { name: "Three.js", proficiency: "Intermediate", description: "3D rendering, animations, scene management" },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="h-8 w-8 text-emerald-400" />,
    skills: [
      { name: "Node.js", proficiency: "Advanced", description: "Express, middleware, async patterns" },
      { name: "Express.js", proficiency: "Advanced", description: "Routing, middleware, error handling" },
      { name: "RESTful APIs", proficiency: "Expert", description: "Resource modeling, status codes, authentication" },
      { name: "WebSocket", proficiency: "Intermediate", description: "Real-time communication, Socket.io" },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="h-8 w-8 text-emerald-400" />,
    skills: [
      { name: "AWS (EC2, S3)", proficiency: "Intermediate", description: "Deployment, storage, IAM" },
      { name: "Azure", proficiency: "Intermediate", description: "App services, functions, storage" },
      { name: "CI/CD Pipelines", proficiency: "Intermediate", description: "Automated testing, deployment" },
      { name: "GitHub Actions", proficiency: "Advanced", description: "Workflow automation, integration" },
    ],
  },
  {
    title: "Database Management",
    icon: <Database className="h-8 w-8 text-emerald-400" />,
    skills: [
      { name: "MongoDB", proficiency: "Advanced", description: "Schema design, aggregation, indexing" },
      { name: "MySQL", proficiency: "Advanced", description: "Query optimization, normalization" },
      { name: "PostgreSQL", proficiency: "Intermediate", description: "Relational modeling, transactions" },
    ],
  },
  {
    title: "AI Technologies",
    icon: <Brain className="h-8 w-8 text-emerald-400" />,
    skills: [
      { name: "Pandas", proficiency: "Intermediate", description: "Data manipulation, analysis" },
      { name: "NumPy", proficiency: "Intermediate", description: "Numerical computing, arrays" },
      { name: "GPT Models", proficiency: "Intermediate", description: "Prompt engineering, fine-tuning" },
      { name: "LangChain", proficiency: "Beginner", description: "LLM application frameworks" },
    ],
  },
]

// Proficiency to color mapping
const proficiencyColors = {
  Expert: "bg-emerald-400",
  Advanced: "bg-emerald-300",
  Intermediate: "bg-emerald-200",
  Beginner: "bg-emerald-100",
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm -z-10"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-4">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-emerald-500/10 hover:shadow-lg transition-all duration-300 border border-gray-700/50"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-emerald-500/10 mr-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + skillIndex * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          proficiencyColors[skill.proficiency as keyof typeof proficiencyColors] || "bg-gray-500"
                        } text-gray-900 font-medium`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{skill.description}</p>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                        className={`h-1 ${
                          proficiencyColors[skill.proficiency as keyof typeof proficiencyColors] || "bg-gray-500"
                        }`}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
