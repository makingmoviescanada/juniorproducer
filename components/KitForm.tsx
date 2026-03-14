"use client"

import { useEffect, useRef } from 'react'

interface KitFormProps {
  className?: string
  position?: 'cta' | 'footer'
}

declare global {
  interface Window {
    Kit?: {
      show?: () => void
      CreateForm?: (el: HTMLElement) => void
    }
  }
}

export function KitForm({ className = "", position = 'cta' }: KitFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(function initKitForm() {
    const timer = setTimeout(() => {
      if (window.Kit?.show) {
        window.Kit.show()
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const formId = position === 'cta' ? 'kit-form' : 'kit-form-footer'

  return (
    <div className={`flex ${className}`}>
      <div ref={containerRef} id={formId} className="w-full" />
    </div>
  )
}
