"use client"

export function TrustBadges() {
  const badges = [
    { label: "There at 4AM" },
    { label: "No Staff Required" },
    { label: "Built by a Producer" },
  ]

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="px-3 py-2 border border-junior-black/20 bg-junior-white/30 flex items-center gap-2"
        >
          <span className="font-sans text-xs uppercase tracking-wide text-junior-black/70">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  )
}
