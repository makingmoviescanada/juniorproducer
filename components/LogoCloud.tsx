"use client"

import Image from "next/image"

const partners = [
  { 
    name: "Google Calendar", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01%20png-transparent-google-calendar-google-s-logo-icon-qOFvwRXXC02B9PW6Nvw0gMXhUFUcgf.png"
  },
  { 
    name: "Asana", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02%20png-transparent-asana-logo-thumbnail-tech-companies-lADYAWw6OQuVDDLoSyXJhRDukcVbC7.png"
  },
  { 
    name: "Claude", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03%20claude-color-mGJ0rqUWQLcD2kzV9hIXIjOWxqTfS7.png"
  },
  { 
    name: "Make", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04%20658d1160346d50ccbcb96f4d_Make-Logo-n21h25Phd1Qa1BZZ2VkxKsUnxBKX6i.png"
  },
  { 
    name: "Google Sheets", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05%20png-clipart-google-sheets-logo-Jx8wlWnGLd621KRJRTeHvOHkmhXwv7.png"
  },
  { 
    name: "Google Drive", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06%20Google-drive-logo-on-transparent-background-PNG-MjfFS7VARJaATNnyupODQsrxHer7BA.avif"
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
    <div className={`${className} flex flex-col gap-12`}>
      <p className="text-center text-junior-black font-display text-lg md:text-xl font-black uppercase tracking-wider">
        {title}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="border-2 border-junior-black flex items-center justify-center"
            style={{ height: "120px", padding: "16px", backgroundColor: "#ffffff" }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
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
