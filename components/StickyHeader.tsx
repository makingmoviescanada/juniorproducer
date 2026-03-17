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
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #1A1A1A",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:px-12 lg:px-24 flex items-center justify-between">
        <a 
          href="#" 
          className="px-4 py-3 bg-junior-parchment border-2 border-junior-black font-display text-junior-black uppercase tracking-wider text-lg font-bold"
          style={{ borderRadius: "6px" }}
        >
          Junior
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className="font-sans text-sm text-junior-black/70 hover:text-junior-black transition-colors"
          >
            What Junior Does
          </a>
          <a 
            href="#why-we-built-it" 
            className="font-sans text-sm text-junior-black/70 hover:text-junior-black transition-colors"
          >
            Why We Built This
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
