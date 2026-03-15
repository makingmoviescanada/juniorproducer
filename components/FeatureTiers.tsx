"use client"

export function FeatureTiers({ dark = false }: { dark?: boolean }) {
  const features = [
    {
      category: "Funding & Tax Credits",
      items: [
        "Every Canadian funding deadline, automatically tracked and updated as they're released by funders",
        "Calculate your tax credits in a few clicks",
      ],
    },
    {
      category: "Budget & Tracking",
      items: [
        "Get a budget estimate straight from your screenplay",
      ],
    },
    {
      category: "Documents & Agreements",
      items: [
        "Never lose track of who has the latest version",
      ],
    },
    {
      category: "Slate Management",
      items: [
        "See every project, deadline, and budget at a glance",
        "Get real-time production and distribution updates as they happen",
        "Get answers at 4AM — Junior doesn't sleep",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`p-8 border-2 ${dark ? "border-junior-white bg-junior-black/50 shadow-hard-red-sm" : "border-junior-black bg-junior-white shadow-hard-parchment-sm"}`}
        >
          <div className="mb-8">
            <h3 className={`font-display ${dark ? "text-junior-white" : "text-junior-black"} text-xl uppercase tracking-wider leading-tight`}>
              {feature.category}
            </h3>
          </div>

          <ul className="space-y-4">
            {feature.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-3">
                <span className={`font-sans text-base leading-relaxed ${dark ? "text-junior-white/80" : "text-junior-black/80"}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
