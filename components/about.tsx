"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AboutProps {
  theme: "dark" | "light"
}

export default function About({ theme }: AboutProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="about"
      className={`py-24 md:py-32 ${
        theme === "dark"
          ? "bg-gradient-to-b from-black/80 to-gray-900/80"
          : "bg-gradient-to-b from-white/80 to-blue-50/80"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                theme === "dark"
                  ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  : "bg-blue-500/10 text-blue-700 border border-blue-500/20"
              }`}
            >
              <Sparkles size={14} />
              About Me
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>
              Frontend Developer with a
              <span className={`${theme === "dark" ? " text-emerald-400" : " text-blue-600"}`}> Passion </span>
              for Innovation
            </h2>
            <div className={`w-12 h-1 rounded-full ${theme === "dark" ? "bg-emerald-400" : "bg-blue-500"} mx-auto`} />
          </motion.div>

          {/* Content with staggered paragraphs */}
          <div className="space-y-6">
            {[
              "As a skilled Frontend Developer with expertise in React, Next.js, and backend technologies like Node.js, MongoDB, and SQL, I bring a comprehensive approach to web development. My passion lies in delivering scalable, user-centric solutions that combine aesthetic appeal with functional excellence.",
              "I have experience working with AI and LLM technologies using Python and cloud platforms such as AWS and Azure. My recent projects include developing dynamic platforms like Nimble Marketplace, an interactive 3D Shoe Customization Store, and a Flood Prevention Management System.",
              "I thrive on creating innovative web experiences and am eager to contribute to impactful, cutting-edge applications. My goal is to continue pushing the boundaries of what's possible in frontend development while delivering exceptional user experiences.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className={`text-lg leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
