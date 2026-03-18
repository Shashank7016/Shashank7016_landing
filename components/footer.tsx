"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

interface FooterProps {
  theme: "dark" | "light"
}

export default function Footer({ theme }: FooterProps) {
  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/shashank-chauhan-82a119198/", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/", label: "GitHub" },
    { icon: <Mail size={18} />, href: "mailto:bryanhovak@gmail.com", label: "Email" },
  ]

  return (
    <footer
      className={`py-12 border-t ${
        theme === "dark" ? "bg-black/80 border-white/5" : "bg-white/80 border-black/5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link href="#home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              Shashank
              <span className={theme === "dark" ? "text-emerald-400" : "text-blue-600"}>.</span>
            </motion.div>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "text-gray-500 hover:text-emerald-400 hover:bg-emerald-400/10"
                    : "text-gray-400 hover:text-blue-600 hover:bg-blue-500/10"
                }`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-6 border-t text-center ${
          theme === "dark" ? "border-white/5" : "border-black/5"
        }`}>
          <p className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
            &copy; {new Date().getFullYear()} Shashank Chauhan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
