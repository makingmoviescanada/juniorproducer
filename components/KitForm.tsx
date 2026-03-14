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
    // Delay to ensure Kit script has loaded completely
    const timer = setTimeout(() => {
      if (window.Kit) {
        // Trigger Kit to process forms
        window.Kit.show()
        // Also try to mount to the specific container
        const container = document.getElementById(formId)
        if (container && window.Kit && window.Kit.CreateForm) {
          window.Kit.CreateForm(container)
        }
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [formId])

  return (
    <div className={`flex ${className}`}>
      {/* Kit script will inject form into this div */}
      <div id={formId} className="w-full" />
    </div>
  )
}
