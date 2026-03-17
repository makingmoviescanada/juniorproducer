"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/ScrollReveal"

function handleTierClick(tier: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('tier', tier)
  window.history.replaceState({}, '', url)
  
  // Scroll to the CTA section with the waitlist form
  const ctaSection = document.getElementById('cta')
  if (ctaSection) {
    ctaSection.scrollIntoView({ behavior: 'smooth' })
  }
}

interface TierProps {
  label: string
  subheading: string
  body: string
  features: string[]
}

const TierCard: React.FC<TierProps> = ({ label, subheading, body, features }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-junior-white border-2 border-junior-black p-8 flex flex-col h-full shadow-hard-parchment-sm">
      <div className="mb-6">
        <h3 className="font-display text-junior-black text-lg md:text-xl uppercase tracking-wider mb-3" style={{ fontWeight: 900, fontFamily: 'var(--font-barlow)' }}>
          {label}
        </h3>
        <p className="font-sans text-junior-black/70 italic text-sm md:text-base">
          {subheading}
        </p>
      </div>

      <p className="font-sans text-junior-black text-base md:text-lg leading-relaxed mb-8">
        {body}
      </p>

      {/* Desktop - always show features */}
      <ul className="space-y-3 mb-8 flex-grow hidden md:block">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-junior-red font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
            <span className="font-sans text-junior-black text-sm md:text-base leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Mobile - expandable features */}
      <div className="md:hidden flex-grow mb-8">
        {isExpanded && (
          <ul className="space-y-3 mb-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-junior-red font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
                <span className="font-sans text-junior-black text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-junior-red font-sans text-sm font-bold uppercase tracking-wide hover:text-junior-black transition-colors"
        >
          {isExpanded ? "Hide" : "See what's included"} ↓
        </button>
      </div>

      <button
        data-tier={label.toLowerCase()}
        onClick={() => handleTierClick(label.toLowerCase())}
        className="w-full px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider btn-hover font-sans text-sm md:text-base"
      >
        Join the Waitlist
      </button>
    </div>
  )
}

export function PricingTiers() {
  const tiers: TierProps[] = [
    {
      label: "FILMMAKER",
      subheading: "For the filmmaker self-producing.",
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
      subheading: "For producers ready to scale.",
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
          <h2 className="font-display text-junior-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-16 text-center text-balance leading-snug" style={{ fontWeight: 900, fontFamily: 'var(--font-barlow)' }}>
            START WHERE YOU ARE.<br />GROW AS YOU GO.
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

