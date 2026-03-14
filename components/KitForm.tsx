"use client"

import { useEffect } from 'react'

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  useEffect(() => {
    // Dynamically inject Kit script
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', '7770c7b826')
    script.src = 'https://letsbuildanewcanadianfilmindustry.kit.com/7770c7b826/index.js'
    document.body.appendChild(script)
    
    return () => {
      // Cleanup: remove script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return <div className={className} />
}
