"use client"

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  return (
    <div className={`flex ${className}`}>
      {/* Kit embed script in layout.tsx will inject the form here */}
      <div id="kit-form" className="w-full" />
    </div>
  )
}
