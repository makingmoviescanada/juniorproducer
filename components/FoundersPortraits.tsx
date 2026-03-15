"use client"

import Image from "next/image"

export function FoundersPortraits() {
  return (
    <div className="w-full relative" style={{ aspectRatio: "4/5", minHeight: "500px" }}>
      {/* Lisa - larger portrait positioned bottom-right */}
      <div className="absolute bottom-0 right-0 w-4/5 h-4/5 border-4 border-junior-black bg-junior-parchment overflow-hidden">
        <Image
          src="/images/lisa-purisima-headshot.jpg"
          alt="Lisa Purisima, founder of Junior"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Gavin - smaller portrait positioned top-left, on top layer */}
      <div className="absolute top-0 left-0 z-10 w-3/5 h-3/5 border-4 border-junior-black bg-junior-parchment overflow-hidden">
        <Image
          src="/images/gavin-seal-headshot.jpg"
          alt="Gavin Seal, founder of Junior"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
