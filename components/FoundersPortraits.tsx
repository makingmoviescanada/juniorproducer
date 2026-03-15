"use client"

import Image from "next/image"

export function FoundersPortraits() {
  return (
    <div className="w-full h-auto aspect-square max-w-md mx-auto relative">
      {/* Container for overlapping portraits */}
      <div className="relative w-full h-full">
        {/* Gavin - positioned top-left with border */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-0 left-0 w-3/4 aspect-square border-4 border-junior-black bg-junior-parchment overflow-hidden">
            <Image
              src="/images/gavin-seal-headshot.jpg"
              alt="Gavin Seal, founder of Junior"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Lisa - positioned bottom-right with border, overlapping */}
          <div className="absolute bottom-0 right-0 w-3/4 aspect-square border-4 border-junior-black bg-junior-parchment overflow-hidden">
            <Image
              src="/images/lisa-purisima-headshot.jpg"
              alt="Lisa Purisima, founder of Junior"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
