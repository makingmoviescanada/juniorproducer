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
    <div className={`${className} flex flex-col gap-12`}>
      <p className="text-center text-junior-black font-display text-lg md:text-xl font-black uppercase tracking-wider">
        {title}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {funders.map((funder, index) => (
          <div
            key={index}
            className="border-2 border-junior-black flex items-center justify-center w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]"
            style={{ height: "120px", padding: "16px", backgroundColor: "#ffffff" }}
          >
            <Image
              src={funder.logo}
              alt={funder.name}
              width={160}
              height={80}
              className="max-w-full max-h-full object-contain"
              style={{ backgroundColor: "#ffffff" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
