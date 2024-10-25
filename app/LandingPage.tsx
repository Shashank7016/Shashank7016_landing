'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Mail, ChevronDown, Menu, X, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion'

interface LandingPageProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
  }
export default function LandingPage({ darkMode, setDarkMode }: LandingPageProps){
  const { scrollYProgress } = useScroll()
  const controls = useAnimation()
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Adjust this value based on your header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <button
      onClick={() => scrollToSection(href.slice(1))}
      className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize nav-link ${
        activeSection === href.slice(1) ? 'text-blue-600 dark:text-blue-400' : ''
      }`}
    >
      {children}
    </button>
  )
 

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              SC
            </Link>
            <nav className="hidden md:flex space-x-6">
              {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <NavLink key={section} href={`#${section}`}>
                {section}
              </NavLink>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md pt-20 px-4 transition-colors duration-300"
            >
              <nav className="flex flex-col space-y-4">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                  <Link
                    key={section}
                    href={`#${section}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize nav-link ${
                      activeSection === section ? 'text-blue-600 dark:text-blue-400' : ''
                    }`}
                  >
                    {section}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-16">
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            id="hero"
            className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-32 md:py-48 text-center transition-colors duration-300"
          >
            <div className="container mx-auto px-4">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              >
                Shashank Chauhan
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Full Stack Developer
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl mb-12 max-w-2xl mx-auto"
              >
                Passionate about creating innovative web solutions
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-4"
              >
                <Link
                  href="#contact"
                  className="bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 font-bold py-3 px-8 rounded-full transition-colors text-lg"
                >
                  Get in touch
                </Link>
                <Link
                  href="#projects"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 font-bold py-3 px-8 rounded-full transition-colors text-lg"
                >
                  View Projects
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            id="about"
            className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400">About Me</h2>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/3 mb-8 md:mb-0"
                >
                  <Image src="/profile.svg" alt="Shashank Chauhan" width={400} height={400} className="rounded-lg shadow-lg mx-auto" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-2/3 md:pl-12"
                >
                  <p className="text-lg mb-6 leading-relaxed">
                    Hello! I'm Shashank Chauhan, a passionate Full Stack Developer with a keen interest in creating innovative web solutions. I'm currently pursuing my Master's in IT, building upon my strong foundation in Computer Applications.
                  </p>
                  <p className="text-lg mb-6 leading-relaxed">
                    My journey in tech has equipped me with a diverse skill set spanning frontend, backend, and cloud technologies. I thrive on creating intuitive user interfaces and leveraging advanced technologies to solve complex problems efficiently.
                  </p>
                  <p className="text-lg mb-6 leading-relaxed">
                    When I'm not coding, you'll find me exploring emerging technologies, contributing to open-source projects, or working on innovative personal ventures that challenge the status quo in web development.
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      href="#contact"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                    >
                      Contact Me
                    </Link>
                    <Link
                      href="/resume.pdf"
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-6 rounded-full transition-colors"
                    >
                      Download Resume
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            id="skills"
            className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400">Skills & Technologies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { name: 'React', icon: '⚛️' },
                  { name: 'Next.js', icon: '▲' },
                  { name: 'Node.js', icon: '🟩' },
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'Python', icon: '🐍' },
                  { name: 'Java', icon: '☕' },
                  { name: 'PHP', icon: '🐘' },
                  { name: 'HTML5', icon: '🌐' },
                  { name: 'CSS3', icon: '🎨' },
                  { name: 'JavaScript', icon: '🟨' },
                  { name: 'TypeScript', icon: '🔷' },
                  { name: 'Tailwind CSS', icon: '🌬️' },
                  { name: 'Material-UI', icon: '📐' },
                  { name: 'Ant Design', icon: '🐜' },
                  { name: 'GraphQL', icon: '◼️' },
                  { name: 'Redux', icon: '🔄' },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    initial="hidden"
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-3"
                  >
                    <span className="text-2xl" role="img" aria-label={skill.name}>
                      {skill.icon}
                    </span>
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            id="projects"
            className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Polaroid Photo Collection",
                    description: "A realistic collection of polaroid photos with animations, categorized for easy browsing.",
                    technologies: "React, CSS Animations",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Instagram Clone (In Progress)",
                    description: "An enhanced Instagram clone with additional features, leveraging a full-stack approach.",
                    technologies: "React Native, Redux, Node.js, MongoDB, GraphQL",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Mood-Based Playlist Generator",
                    description: "An application that generates playlists based on the user's current mood.",
                    technologies: "React, Node.js, Spotify API",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Flood Prediction App",
                    description: "A web application allowing users to predict floods in their area.",
                    technologies: "React, Ant Design, Node.js, MongoDB",
                    image: "/placeholder.svg"
                  }
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Image src={project.image} alt={project.title} width={600} height={300} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{project.title}</h3>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">{project.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Technologies: {project.technologies}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            id="experience"
            className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400">Professional Experience</h2>
              <div className="space-y-12">
                {[
                  {
                    title: "Full Stack Developer",
                    company: "NIMBLE XCO (ATHENA XCO PTY LTD)",
                    period: "Current",
                    description: "Working on an innovative job posting platform with extensive use of AI technologies.",
                    achievements: [
                      "Developing scalable web applications using modern JavaScript frameworks",
                      "Implementing AI-driven features to enhance user experience",
                      "Collaborating with cross-functional teams to deliver high-quality software solutions"
                    ]
                  },
                  {
                    title: "Frontend Developer",
                    company: "Digital Notebook Project",
                    period: "Freelance",
                    description: "Contributed to the creation of a digital note-taking application with export capabilities.",
                    achievements: [
                      "Developed responsive and intuitive user interfaces",
                      "Implemented features for seamless note organization and export",
                      "Optimized application performance for smooth user experience"
                    ]
                  }
                ].map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{job.title}</h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{job.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{job.period}</p>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{job.description}</p>
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Achievements:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{achievement}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            id="contact"
            className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white text-center transition-colors duration-300"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <p className="mb-8 text-xl max-w-2xl mx-auto">
                I'm always open to new opportunities, collaborations, or just a friendly chat about technology. Feel free to reach out!
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center space-x-6 mb-8"
              >
                <Link href="https://github.com/Shashank7016" className="text-white hover:text-blue-200 transition-colors">
                  <Github size={32} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://www.linkedin.com/in/shashank-chauhan-82a119198/" className="text-white hover:text-blue-200 transition-colors">
                  <Linkedin size={32} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="mailto:contact@shashank-chauhan.com" className="text-white hover:text-blue-200 transition-colors">
                  <Mail size={32} />
                  <span className="sr-only">Email</span>
                </Link>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-lg mx-auto"
              >
                <div className="mb-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div className="mb-4">
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div className="mb-4">
                  <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                </div>
                <button type="submit" className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-2 px-6 rounded-full transition-colors">
                  Send Message
                </button>
              </motion.form>
            </div>
          </motion.section>
        </main>

        <footer className="bg-gray-900 text-white py-8 text-center transition-colors duration-300">
          <p>&copy; {new Date().getFullYear()} Shashank Chauhan. All rights reserved.</p>
        </footer>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-4 right-4"
        >
          <Link
            href="#hero"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-colors duration-300 shadow-lg"
          >
            <ChevronDown size={24} className="transform rotate-180" />
            <span className="sr-only">Scroll to top</span>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .nav-link {
          position: relative;
          text-decoration: none;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: currentColor;
          transform-origin: center;
          transition: transform 0.3s ease-out;
        }

        .nav-link:hover::after,
        .nav-link:focus::after {
          transform: scaleX(1);
        }
      `}</style>
    </div>
  )
}