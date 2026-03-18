"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  theme: "dark" | "light"
}

export default function Hero({ theme }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const handleScroll = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity, scale }} className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium tracking-wide ${
                theme === "dark"
                  ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  : "bg-blue-500/10 text-blue-700 border border-blue-500/20"
              }`}
            >
              Frontend Developer
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            } mb-6`}
          >
            Shashank
            <br />
            <span className={`${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>
              Chauhan
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-lg md:text-xl leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            } mb-10 max-w-xl mx-auto`}
          >
            Building exceptional digital experiences with React, Next.js, and Three.js.
            Specializing in interactive and responsive web applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              onClick={() => handleScroll("#contact")}
              className={`magnetic-btn px-8 py-3 rounded-full font-semibold text-base ${
                theme === "dark"
                  ? "bg-emerald-400 hover:bg-emerald-500 text-gray-900 shadow-lg shadow-emerald-500/20"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
              }`}
            >
              Get in Touch
            </Button>

            <Button
              variant="outline"
              onClick={() => handleScroll("#projects")}
              className={`magnetic-btn px-8 py-3 rounded-full font-semibold text-base border-2 ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 bg-transparent"
                  : "border-blue-500/40 text-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white bg-white/80"
              }`}
            >
              View Projects
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/shashank-chauhan-82a119198/", label: "LinkedIn" },
              { icon: <Github size={20} />, href: "https://github.com/", label: "GitHub" },
              { icon: <Mail size={20} />, href: "mailto:bryanhovak@gmail.com", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "text-gray-500 hover:text-emerald-400 bg-white/5 hover:bg-emerald-400/10 border border-white/10 hover:border-emerald-400/30"
                    : "text-gray-400 hover:text-blue-600 bg-black/5 hover:bg-blue-500/10 border border-black/5 hover:border-blue-500/30"
                }`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.button
          onClick={() => handleScroll("#about")}
          className={`p-2 rounded-full transition-colors ${
            theme === "dark"
              ? "text-gray-600 hover:text-emerald-400"
              : "text-gray-400 hover:text-blue-600"
          }`}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-label="Scroll down"
        >
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  )
}
