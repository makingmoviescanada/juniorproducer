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
      category: "Budgets & Documents",
      items: [
        "Get a budget estimate straight from your screenplay",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="border-2 border-junior-black flex flex-col">
          <div className="border-b-2 border-junior-black px-6 py-4">
            <h3 className="font-display text-junior-black text-base md:text-lg font-black">
              {feature.category}
            </h3>
          </div>

          <ul className="space-y-4 px-6 py-6 flex-grow">
            {feature.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-3">
                <span className="text-junior-red mt-1 flex-shrink-0 font-bold">✓</span>
                <span className="font-sans text-base leading-relaxed text-junior-black">
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
