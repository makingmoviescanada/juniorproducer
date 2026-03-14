"use client"

import Image from "next/image"

// Position tools in a circle around center
const tools = [
  { name: "Asana", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/asana-logo-1200x1200-pgYthsShqkAmkihxGrKqVY7lVYYs5L.png", angle: 0 },
  { name: "Make", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design-sans-titre-10-1-6tWGE2DUZXRDAoaM3HXv2Ql0LRcdxm.png", angle: 72 },
  { name: "Gmail", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/192px-JmJJ2l33SjVJ4jLspz20XTZqhV63ii.svg", angle: 144 },
  { name: "Google Drive", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_drive_logo-kAfMUfwHBAOwRCHqIu0MZzAf9fGrua.png", angle: 216 },
  { name: "Claude", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/claude-ai-logo-rounded-hd-free-png-qiEYjrgTXCNABuyODyeIo0MVMvKr6I.png", angle: 288 },
]

// Calculate position from angle
function getPosition(angle: number, radius: number) {
  const radian = (angle - 90) * (Math.PI / 180)
  return {
    x: 50 + radius * Math.cos(radian),
    y: 50 + radius * Math.sin(radian),
  }
}

export function IntegrationHub({ className = "", landscape = false }: { className?: string; landscape?: boolean }) {
  const radius = landscape ? 38 : 40
  
  return (
    <div className={`relative ${className}`}>
      <div className={`relative w-full mx-auto ${landscape ? "max-w-4xl aspect-video" : "max-w-2xl aspect-square"}`}>
        
        {/* Connection lines */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100"
        >
          {tools.map((tool, index) => {
            const pos = getPosition(tool.angle, radius)
            return (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="#1A1A1A"
                strokeWidth="0.4"
                strokeDasharray="2,2"
                opacity="0.3"
              />
            )
          })}
        </svg>

        {/* Center hub - Junior */}
        <div 
          className="absolute bg-junior-red border-2 border-junior-black flex items-center justify-center z-20 shadow-hard-red-sm"
          style={{ 
            width: "80px", 
            height: "80px", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="font-display text-junior-white text-2xl tracking-wider">JR</span>
        </div>

        {/* Tool icons */}
        {tools.map((tool, index) => {
          const pos = getPosition(tool.angle, radius)
          return (
            <div
              key={index}
              className="absolute bg-junior-white border-2 border-junior-black flex items-center justify-center z-10 transition-transform hover:scale-110 shadow-hard-parchment-sm"
              style={{
                width: "56px",
                height: "56px",
                top: `${pos.y}%`,
                left: `${pos.x}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={tool.name}
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={40}
                height={40}
                className="w-9 h-9 object-contain"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
