"use client"

import { ScrollReveal } from "@/components/ScrollReveal"

interface TierProps {
  label: string
  subheading: string
  body: string
  features: string[]
}

const TierCard: React.FC<TierProps> = ({ label, subheading, body, features }) => (
  <div className="bg-junior-white border-2 border-junior-black p-8 flex flex-col h-full shadow-hard-parchment-sm">
    <div className="mb-6">
      <h3 className="font-display text-junior-black text-lg uppercase tracking-wider font-bold mb-3">
        {label}
      </h3>
      <p className="font-sans text-junior-black/70 italic text-sm">
        {subheading}
      </p>
    </div>

    <p className="font-sans text-junior-black text-base leading-relaxed mb-8">
      {body}
    </p>

    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-junior-red font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
          <span className="font-sans text-junior-black text-sm leading-relaxed">
            {feature}
          </span>
        </li>
      ))}
    </ul>

    <button className="w-full px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-xs">
      Join the Waitlist
    </button>
  </div>
)

export function PricingTiers() {
  const tiers: TierProps[] = [
    {
      label: "FILMMAKER",
      subheading: "For the solo filmmaker doing it all alone.",
      body: "Your 24/7 Canadian film funding assistant. Ask anything — deadlines, eligibility, funding windows — and never miss an opportunity again.",
      features: [
        "Chat with a Canadian film industry-trained AI",
        "Every funding deadline, automatically tracked",
        "Syncs to your Google Calendar with prep reminders",
        "Notifications ahead of key dates",
      ],
    },
    {
      label: "PRODUCER",
      subheading: "For the producer juggling a slate.",
      body: "Everything in Filmmaker, plus Junior connects to your project management workflow — so your funding intelligence lives inside your productions.",
      features: [
        "Everything in Filmmaker",
        "Connects to Asana and your existing tools",
        "Junior reads and updates your active projects",
        "Budget estimation from screenplay",
        "Never lose track of who has the latest version",
      ],
    },
    {
      label: "STUDIO",
      subheading: "For the filmmaker who wants Junior fully integrated into their world.",
      body: "Junior becomes your true second brain — operating inside your own Claude environment, learning your projects, and surfacing what you need before you know you need it.",
      features: [
        "Everything in Producer",
        "Powered by your own Claude account",
        "Full document and project memory",
        "Adapts to your specific productions and use cases",
        "White-glove onboarding included",
      ],
    },
  ]

  return (
    <section className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-junior-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-16 text-center text-balance">
            Start where you are. Grow as you go.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <TierCard key={idx} {...tier} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

