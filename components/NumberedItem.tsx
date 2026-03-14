interface NumberedItemProps {
  number: string
  title: string
  description: string
  items: string[]
  className?: string
}

export function NumberedItem({ 
  number, 
  title, 
  description, 
  items, 
  className = "" 
}: NumberedItemProps) {
  return (
    <div className={`flex gap-8 md:gap-12 ${className}`}>
      <div className="flex-shrink-0">
        <span className="font-display text-junior-red text-5xl md:text-7xl lg:text-8xl leading-none">
          {number}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-display text-junior-black text-lg md:text-2xl uppercase tracking-wider mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-junior-black/75 text-base leading-relaxed mb-6 font-sans">
          {description}
        </p>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="text-junior-black/70 text-sm leading-relaxed font-sans flex items-start gap-2"
            >
              <span className="text-junior-black/50 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
