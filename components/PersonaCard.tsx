interface PersonaCardProps {
  title: string
  items: string[]
  className?: string
}

export function PersonaCard({ title, items, className = "" }: PersonaCardProps) {
  return (
    <div 
      className={`bg-junior-white border-2 border-junior-black p-6 md:p-8 shadow-hard-parchment-sm ${className}`}
    >
      <h3 className="font-display text-junior-black text-base md:text-lg uppercase tracking-wider mb-5 leading-tight">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="text-junior-black/70 text-lg leading-relaxed font-sans"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
