"use client"

import { useEffect, useRef } from 'react'
import Script from 'next/script'

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptId = useRef(`kit-script-${Math.random().toString(36).substr(2, 9)}`)
  
  useEffect(() => {
    // Create a unique container for each form instance
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      const script = document.createElement('script')
      script.async = true
      script.dataset.uid = 'a6c4e0fc0e'
      script.src = 'https://letsbuildanewcanadianfilmindustry.kit.com/a6c4e0fc0e/index.js'
      containerRef.current.appendChild(script)
    }
  }, [])

  return (
    <div className={`flex ${className}`}>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}
