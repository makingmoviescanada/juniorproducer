interface ToolCardProps {
  title: string
  description: string
  cta?: string
  href?: string
  className?: string
}

export function ToolCard({ 
  title, 
  description, 
  cta = "Try prototype →",
  href = "#", 
  className = "" 
}: ToolCardProps) {
  return (
    <a 
      href={href}
      className={`block bg-junior-white border-2 border-junior-black p-6 md:p-8 shadow-hard-parchment-sm hover-lift ${className}`}
    >
      <h3 className="font-display text-junior-black text-lg md:text-xl uppercase tracking-wider mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-junior-black/70 text-sm md:text-base leading-relaxed mb-6 font-sans">
        {description}
      </p>
      <span className="inline-block text-junior-red font-bold text-xs md:text-sm uppercase tracking-wider font-sans">
        {cta}
      </span>
    </a>
  )
}
