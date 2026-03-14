"use client"

import Image from "next/image"

interface VideoPlaceholderProps {
  aspectRatio?: "4:5" | "16:9"
  className?: string
  imageSrc?: string
  imageAlt?: string
  showPlayButton?: boolean
}

export function VideoPlaceholder({ 
  aspectRatio = "4:5", 
  className = "",
  imageSrc,
  imageAlt = "Video thumbnail",
  showPlayButton = true
}: VideoPlaceholderProps) {
  const paddingBottom = aspectRatio === "4:5" ? "125%" : "56.25%"
  
  return (
    <div 
      className={`relative w-full border-2 border-junior-black shadow-hard-sm overflow-hidden ${className}`}
      style={{ paddingBottom }}
    >
      <div className="absolute inset-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-junior-black" />
        )}
        
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-junior-black/30">
            <button 
              className="flex items-center justify-center"
              style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#E8392A",
                border: "3px solid white",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
              aria-label="Play video"
            >
              <div 
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "12px solid white",
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  marginLeft: "4px"
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
