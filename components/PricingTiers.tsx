"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/ScrollReveal"

function handleTierClick(tier: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('tier', tier)
  window.history.replaceState({}, '', url)

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
  featured?: boolean
}

const TierCard: React.FC<TierProps> = ({ label, subheading, body, features, featured }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="flex flex-col h-full p-8"
      style={{
        background: '#F0EBE0',
        border: '1px solid #1A1A1A',
        borderRadius: '8px',
        boxShadow: '4px 4px 0px #1A1A1A',
        borderTop: featured ? '4px solid #E8392A' : '1px solid #1A1A1A',
      }}
    >
      <div className="mb-6">
        <h3
          className="text-lg md:text-xl uppercase tracking-wider mb-3"
          style={{ fontWeight: 900, fontFamily: 'var(--font-barlow)', color: '#1A1A1A' }}
        >
          {label}
        </h3>
        <p
          className="italic text-sm md:text-base"
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', opacity: 0.7 }}
        >
          {subheading}
        </p>
      </div>

      <p
        className="text-base md:text-lg leading-relaxed mb-8"
        style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A' }}
      >
        {body}
      </p>

      {/* Desktop — always show features */}
      <ul className="space-y-3 mb-8 flex-grow hidden md:block">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="font-bold text-lg flex-shrink-0 mt-0.5" style={{ color: '#E8392A' }}>✓</span>
            <span
              className="text-sm md:text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A' }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Mobile — expandable features */}
      <div className="md:hidden flex-grow mb-8">
        {isExpanded && (
          <ul className="space-y-3 mb-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-bold text-lg flex-shrink-0 mt-0.5" style={{ color: '#E8392A' }}>✓</span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A' }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-bold uppercase tracking-wide transition-colors"
          style={{ fontFamily: 'var(--font-barlow)', color: '#E8392A' }}
        >
          {isExpanded ? "Hide" : "See what's included"} ↓
        </button>
      </div>

      <button
        data-tier={label.toLowerCase()}
        onClick={() => handleTierClick(label.toLowerCase())}
        className="w-full px-6 py-3 font-bold uppercase tracking-wider text-sm md:text-base transition-all duration-150 ease-in-out"
        style={{
          background: '#E8392A',
          color: '#FFFFFF',
          borderRadius: '6px',
          border: 'none',
          fontFamily: 'var(--font-barlow)',
          fontWeight: 700,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.background = '#C9301F'
          el.style.transform = 'translateY(-2px)'
          el.style.boxShadow = '4px 4px 0px #1A1A1A'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.background = '#E8392A'
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
        }}
      >
        Join the Waitlist
      </button>
    </div>
  )
}

export function PricingTiers() {
  const tiers: TierProps[] = [
    {
      label: "ARTIST",
      subheading: "For the independent artist.",
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
      featured: true,
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
    <section className="px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-16 text-center text-balance leading-snug"
            style={{ fontWeight: 900, fontFamily: 'var(--font-barlow)', color: '#1A1A1A' }}
          >
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

