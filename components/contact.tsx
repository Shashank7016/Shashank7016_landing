"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactProps {
  theme: "dark" | "light"
}

const useTypingEffect = (texts: string[], speed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayText, textIndex, isDeleting, texts, speed, deleteSpeed, pauseTime])

  return displayText
}

export default function Contact({ theme }: ContactProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const typingTexts = [
    "Let's build something amazing together...",
    "Ready to turn your ideas into reality...",
    "Your next project starts here...",
  ]

  const typedText = useTypingEffect(typingTexts, 80, 40, 1500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const contactInfo = [
    {
      id: "email",
      icon: <Mail size={18} />,
      label: "Email",
      value: "bryanhovak@gmail.com",
      href: "mailto:bryanhovak@gmail.com",
    },
    {
      id: "phone",
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+61 435 915 307",
      href: "tel:+61435915307",
    },
    {
      id: "location",
      icon: <MapPin size={18} />,
      label: "LinkedIn",
      value: "Shashank Chauhan",
      href: "https://www.linkedin.com/in/shashank-chauhan-82a119198/",
    },
  ]

  return (
    <section
      id="contact"
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
            Get In Touch
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>
            Let's Work Together
          </h2>
          <div className={`w-12 h-1 rounded-full ${theme === "dark" ? "bg-emerald-400" : "bg-blue-500"} mx-auto mb-6`} />

          {/* Typing Effect */}
          <div className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"} min-h-[24px] flex items-center justify-center`}>
            <span className="font-mono">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className={theme === "dark" ? "text-emerald-400" : "text-blue-600"}
              >
                |
              </motion.span>
            </span>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"} mb-3`}>
                  Ready to start your project?
                </h3>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  I'm always excited to work on new projects and help bring innovative ideas to life.
                </p>
              </div>

              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.id}
                    href={info.href}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      theme === "dark"
                        ? "hover:bg-white/5 text-gray-300 hover:text-white"
                        : "hover:bg-black/5 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20"
                        : "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20"
                    } group-hover:scale-110`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{info.label}</p>
                      <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                        {info.value}
                      </p>
                    </div>
                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`h-12 px-4 rounded-xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:bg-white/10"
                      : "bg-black/[0.02] border-black/10 text-gray-800 placeholder-gray-400 focus:border-blue-500/50 focus:bg-white"
                  }`}
                  placeholder="Your Name"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`h-12 px-4 rounded-xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:bg-white/10"
                      : "bg-black/[0.02] border-black/10 text-gray-800 placeholder-gray-400 focus:border-blue-500/50 focus:bg-white"
                  }`}
                  placeholder="Email Address"
                />
              </div>

              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`h-12 px-4 rounded-xl border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:bg-white/10"
                    : "bg-black/[0.02] border-black/10 text-gray-800 placeholder-gray-400 focus:border-blue-500/50 focus:bg-white"
                }`}
                placeholder="Subject"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`p-4 rounded-xl border transition-all duration-300 resize-none ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:bg-white/10"
                    : "bg-black/[0.02] border-black/10 text-gray-800 placeholder-gray-400 focus:border-blue-500/50 focus:bg-white"
                }`}
                placeholder="Tell me about your project..."
              />

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl text-center text-sm font-medium ${
                    theme === "dark" ? "bg-emerald-400/10 text-emerald-400" : "bg-green-500/10 text-green-700"
                  }`}
                >
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`magnetic-btn w-full py-3 px-6 rounded-xl font-semibold text-base ${
                  theme === "dark"
                    ? "bg-emerald-400 hover:bg-emerald-500 text-gray-900 shadow-lg shadow-emerald-500/15"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/15"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Loading"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={16} />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
