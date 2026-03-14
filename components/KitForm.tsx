"use client"

import { useEffect, useId } from 'react'

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  const formId = useId()
  
  useEffect(() => {
    // Kit script will look for elements with the data-kit-form attribute
    // We'll trigger it to render when component mounts
    if (window.Kit) {
      window.Kit.show()
    }
  }, [])

  return (
    <div className={`flex ${className}`}>
      {/* Kit will inject form into this div via the data-kit-form attribute */}
      <div data-kit-form="a6c4e0fc0e" className="w-full" />
    </div>
  )
}
