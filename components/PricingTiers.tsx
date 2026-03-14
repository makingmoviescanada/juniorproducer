"use client"

const tiers = [
  {
    name: "Filmmaker",
    price: "$29",
    period: "/mo",
    description: "For indie filmmakers doing it all alone.",
    features: [
      "Canadian funding intelligence (CMF, Telefilm, SODEC, provincial)",
      "Tax credit calculations and stacking strategies",
      "Budget estimation from screenplay",
      "Deadline tracking across funders",
      "Distribution strategy builder",
      "24/7 availability — there at 4AM",
    ],
    cta: "Join Waitlist",
    highlight: false,
  },
  {
    name: "Producer",
    price: "$69",
    period: "/mo",
    description: "For producers juggling multiple active projects.",
    features: [
      "Everything in the Filmmaker tier, plus:",
      "Multi-project dashboard",
      "Document version control across projects",
      "Guild agreement reference (AQTIS, ACTRA, DGC, WGC)",
      "Cross-project budget tracking",
      "Priority support",
    ],
    cta: "Join Waitlist",
    highlight: true,
  },
]

export function PricingTiers({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`p-8 border-2 border-junior-black ${
              tier.highlight 
                ? "bg-junior-black text-junior-white shadow-hard-parchment" 
                : "bg-junior-white text-junior-black shadow-hard-parchment-sm"
            }`}
          >
            <div className="mb-6">
              <p className={`font-display text-sm uppercase tracking-wider mb-2 ${
                tier.highlight ? "text-junior-red" : "text-junior-red"
              }`}>
                {tier.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl">{tier.price}</span>
                <span className={`text-sm ${tier.highlight ? "text-junior-white/60" : "text-junior-black/60"}`}>
                  {tier.period}
                </span>
              </div>
              <p className={`mt-3 text-sm font-sans ${
                tier.highlight ? "text-junior-white/70" : "text-junior-black/70"
              }`}>
                {tier.description}
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, featureIndex) => (
                <li 
                  key={featureIndex} 
                  className={`text-sm font-sans flex items-start gap-3 ${
                    tier.highlight ? "text-junior-white/90" : "text-junior-black/80"
                  }`}
                >
                  <span className={`mt-0.5 ${tier.highlight ? "text-junior-red" : "text-junior-red"}`}>+</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#waitlist"
              className={`block w-full py-3 text-center font-bold uppercase tracking-wider text-sm border-2 transition-all ${
                tier.highlight
                  ? "bg-junior-red border-junior-red text-junior-white hover:bg-junior-white hover:text-junior-red"
                  : "bg-junior-black border-junior-black text-junior-white hover:bg-junior-red hover:border-junior-red"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center mt-8 text-junior-black/50 text-sm font-sans">
        Free tools available now — no signup required.
      </p>
    </div>
  )
}
