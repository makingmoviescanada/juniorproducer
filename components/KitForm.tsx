"use client"

import { useEffect } from 'react'

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  useEffect(() => {
    // Trigger Kit script to render form if it hasn't already
    if (window.Kit) {
      window.Kit.show()
    }
  }, [])

  return (
    <div className={`flex ${className}`}>
      {/* Kit embed script in layout.tsx will inject the form here */}
      <div id="kit-form" className="w-full" />
    </div>
  )
}
