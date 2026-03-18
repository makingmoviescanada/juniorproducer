"use client"

import Image from "next/image"

const funders = [
  { 
    name: "Telefilm Canada", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-VISUALS-BANNERS-WEBSITE-1920x1080-1-krRrZ6OoVYaFsb3i9SIVAMLArYv8dP.png"
  },
  { 
    name: "Canada Media Fund", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02-CMF-Logo-BIL-1C-Horiz-Black-POS-RGB-yVNbUbiMYMr8Ny3nHqteL9xRUT1RL9.png"
  },
  { 
    name: "SODEC", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-Logo-SODEC-couleur1.svg-gHIYnwDwIjtRo5K7XjHLR0UkoHAGT6.png"
  },
  { 
    name: "Canada Council for the Arts", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-Council-FaceBook-IsqpKUmkeNLDqMsyGsuFnBUNftFFNz.png"
  },
  { 
    name: "CALQ", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-Logo_CALQ_noir_725x300-xN4oFHle3rZgmaVCPyQUrWBswlmG4A.png"
  },
]

export function FunderLogos({ 
  title = "JUNIOR UNDERSTANDS THESE FUNDERS — BECAUSE WE'VE WORKED WITH THEM",
  className = "" 
}: { 
  title?: string
  className?: string 
}) {
  return (
    <div className={`${className} flex flex-col py-20`}>
      <h2 className="text-center text-junior-white font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-16 leading-snug text-balance" style={{ fontWeight: 900, fontFamily: 'var(--font-barlow)' }}>
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {funders.map((funder, index) => (
          <div
            key={index}
            style={{
              width: "180px",
              height: "80px",
              background: "#FFFFFF",
              border: "1px solid #1A1A1A",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <Image
              src={funder.logo}
              alt={funder.name}
              width={140}
              height={48}
              style={{
                maxWidth: "140px",
                maxHeight: "48px",
                objectFit: "contain",
                filter: "grayscale(100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
