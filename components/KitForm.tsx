"use client"

import { useEffect } from 'react'

interface KitFormProps {
  className?: string
  position?: 'cta' | 'footer'
}

declare global {
  interface Window {
    Kit?: any
  }
}

export function KitForm({ className = "", position = 'cta' }: KitFormProps) {
  const formId = position === 'cta' ? 'kit-form' : 'kit-form-footer'
  
  useEffect(() => {
    // Delay to ensure Kit script has loaded
    const timer = setTimeout(() => {
      if (window.Kit) {
        window.Kit.show()
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`flex ${className}`}>
      {/* Kit script will find and inject form into this div */}
      <div id={formId} className="w-full" />
    </div>
  )
}
