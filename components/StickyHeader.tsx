"use client"

import { useState, useEffect } from "react"

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? "bg-junior-white border-b-2 border-junior-black shadow-hard-parchment-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:px-12 lg:px-24 flex items-center justify-between">
        <a 
          href="#" 
          className="px-4 py-2 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-display text-lg"
        >
          Junior
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#tools" 
            className="font-sans text-sm text-junior-black/70 hover:text-junior-black transition-colors"
          >
            Features
          </a>
          <a 
            href="#about" 
            className="font-sans text-sm text-junior-black/70 hover:text-junior-black transition-colors"
          >
            About
          </a>
        </nav>

        <a
          href="#cta"
          className="px-4 py-2 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-xs"
        >
          Get Early Access
        </a>
      </div>
    </header>
  )
}
