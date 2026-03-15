"use client"

import Image from "next/image"

const partners = [
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

export function LogoCloud({ 
  title = "Trusted by Canadian funders",
  className = "" 
}: { 
  title?: string
  className?: string 
}) {
  return (
    <div className={`${className}`}>
      <p className="text-center text-junior-black/60 font-sans text-sm uppercase tracking-wide mb-12">
        {title}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="border-2 border-junior-black bg-white flex items-center justify-center flex-shrink-0"
            style={{ height: "100px", padding: "12px" }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={80}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
