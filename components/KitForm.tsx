"use client"

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  return (
    <div className={`flex ${className}`}>
      <a
        href="https://letsbuildanewcanadianfilmindustry.kit.com/a6c4e0fc0e"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm whitespace-nowrap"
      >
        Get Early Access
      </a>
    </div>
  )
}
