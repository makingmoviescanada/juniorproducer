"use client"

import Image from "next/image"

const tools = [
  { 
    name: "Asana", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/asana-logo-1200x1200-pgYthsShqkAmkihxGrKqVY7lVYYs5L.png" 
  },
  { 
    name: "Make", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design-sans-titre-10-1-6tWGE2DUZXRDAoaM3HXv2Ql0LRcdxm.png" 
  },
  { 
    name: "Airtable", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/airtable-logo-1-8aSO73LWqGqhyJa8nVJKCDYQR5nLvJ.png" 
  },
  { 
    name: "Google Drive", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_drive_logo-kAfMUfwHBAOwRCHqIu0MZzAf9fGrua.png" 
  },
  { 
    name: "Google Calendar", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google-calendar-1024x1024-8IjZvI1J6Q2xPqL0VnKqL2Fq3M8yxJ.png" 
  },
]

// Add Airtable and Google Calendar to the visible tools
const visibleTools = tools

export function ToolStrip() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-center">
            <div className="relative w-12 h-12">
              <Image
                src={tool.logo}
                alt={tool.name}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            {index < tools.length - 1 && (
              <span className="ml-6 text-junior-white/40 text-2xl">·</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-junior-white/80 text-center font-sans text-sm">
        Junior connects to the tools you already use.
      </p>
    </div>
  )
}
