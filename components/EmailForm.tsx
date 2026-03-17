"use client"

import { useState } from "react"

interface EmailFormProps {
  className?: string
  variant?: "light" | "dark"
}

export function EmailForm({ className = "", variant = "light" }: EmailFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setStatus("success")
  }

  const isDark = variant === "dark"

  if (status === "success") {
    return (
      <div className={`${className}`}>
        <p className={`font-display text-base uppercase tracking-wider ${isDark ? "text-junior-white" : "text-junior-black"}`}>
          Thanks! We'll be in touch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`} suppressHydrationWarning>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        suppressHydrationWarning
        className={`flex-1 px-4 py-3 border-2 font-sans focus:outline-none transition-opacity ${
          status === "loading" ? "opacity-70" : ""
        } ${
          isDark 
            ? "bg-junior-white/10 border-junior-white/50 text-junior-white placeholder:text-junior-white/50" 
            : "bg-junior-white border-junior-black text-junior-black placeholder:text-junior-black/40"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        suppressHydrationWarning
        className={`px-5 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider btn-red font-sans text-sm whitespace-nowrap transition-all ${
          status === "loading" ? "opacity-80" : ""
        }`}
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  )
}
