"use client"

import Image from "next/image"

const funders = [
  { 
    name: "Telefilm Canada", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VISUALS-BANNERS-WEBSITE-1920x1080-1-KGWjEel5TPTPl5cTvPZbCzz0IVCi4s.png"
  },
  { 
    name: "SODEC", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logosodec22cl.jpg-vyoqgNHdBSFJtepROtTBVOAa8mWlZD.webp"
  },
  { 
    name: "CMF", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CMF-Logo-BIL-1C-Horiz-Black-POS-RGB-IlsAoGNX5acFPynO4qOuk2XxOrlY4e.png"
  },
  { 
    name: "Canada Council for the Arts", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Council-FaceBook-aCWo4ZTman0n3ZnH7ROl0Ub9IKwemR.png"
  },
  { 
    name: "CALQ", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_CALQ_noir_725x300-G1tn4sj6vMy6fyVJZcEezpwRFh7lYG.png"
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {funders.map((funder, index) => (
          <div
            key={index}
            className="border-2 border-junior-black flex items-center justify-center"
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
