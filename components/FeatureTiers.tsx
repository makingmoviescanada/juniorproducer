"use client"

export function FeatureTiers({ dark = false }: { dark?: boolean }) {
  const tiers = [
    {
      name: "For Filmmakers\ndoing it all alone",
      features: [
        "Budget estimation from screenplay",
        "Track Canadian funding deadlines",
        "Tax credit calculator (CAVCO, provincial)",
        "Build distribution strategies",
        "Document version control",
        "24/7 producer by your side",
      ],
    },
    {
      name: "For Producers\njuggling a slate",
      features: [
        "Everything in the Filmmaker tier",
        "Multi-project dashboard",
        "Collaborator workspace",
        "Guild agreement templates",
        "Cross-project budget tracking",
        "Funding roadmap builder",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className={`p-8 border-2 ${dark ? "border-junior-white bg-junior-black/50 shadow-hard-red-sm" : "border-junior-black bg-junior-white shadow-hard-parchment-sm"}`}
        >
          <div className="mb-8">
            <h3 className={`font-display ${dark ? "text-junior-white" : "text-junior-black"} text-xl uppercase tracking-wider leading-tight whitespace-pre-line`}>
              {tier.name}
            </h3>
          </div>

          <ul className="space-y-4">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <span className={`font-sans text-lg leading-relaxed ${dark ? "text-junior-white/80" : "text-junior-black/80"}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
