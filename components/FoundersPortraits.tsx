"use client"

import Image from "next/image"

export function FoundersPortraits() {
  return (
    <div className="w-full relative" style={{ aspectRatio: "4/5" }}>
      {/* Lisa - larger portrait positioned center-right */}
      <div className="absolute inset-0 flex items-center justify-end pr-0">
        <div className="w-4/5 h-full border-4 border-junior-black bg-junior-parchment overflow-hidden">
          <Image
            src="/images/lisa-purisima-headshot.jpg"
            alt="Lisa Purisima, founder of Junior"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Gavin - smaller portrait positioned top-left, overlapping only corner */}
      <div className="absolute top-0 left-0 z-10" style={{ width: "45%", aspectRatio: "1" }}>
        <div className="w-full h-full border-4 border-junior-black bg-junior-parchment overflow-hidden">
          <Image
            src="/images/gavin-seal-headshot.jpg"
            alt="Gavin Seal, founder of Junior"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
