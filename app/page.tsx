'use client'

import { useState } from 'react'
import LandingPage from './LandingPage'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return <LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />
}