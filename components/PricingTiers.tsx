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

const TIER_DIFFERENTIATORS: Record<string, string> = {
  ARTIST: "For independent filmmakers",
  PRODUCER: "For producers with a slate",
}

const TIER_BUTTON_TEXT: Record<string, string> = {
  ARTIST: "JOIN AS ARTIST",
  PRODUCER: "JOIN AS PRODUCER",
}

interface TierProps {
  label: string
  features: string[]
  featured?: boolean
}

const TierCard: React.FC<TierProps> = ({ label, features, featured }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col">
      {featured && (
        <div className="flex justify-center mb-4">
          <span
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#FFFFFF',
              background: '#E8392A',
              borderRadius: '0px',
              padding: '4px 10px',
              textTransform: 'uppercase',
            }}
          >
            RECOMMENDED
          </span>
        </div>
      )}
      <div
        className="flex flex-col flex-1 p-8"
        style={{
          background: '#F0EBE0',
          border: featured ? '2px solid #E8392A' : '2px solid #1A1A1A',
          borderRadius: '16px',
          boxShadow: '6px 6px 0px #1A1A1A',
        }}
      >
      <div className="mb-6">
        <h3
          className="text-lg md:text-xl uppercase tracking-wider"
          style={{ fontWeight: 900, fontFamily: 'var(--font-barlow)', color: '#1A1A1A', marginBottom: '8px' }}
        >
          {label}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 400,
            fontSize: '14px',
            color: '#1A1A1A',
            margin: 0,
          }}
        >
          {TIER_DIFFERENTIATORS[label]}
        </p>
      </div>

      {/* Desktop — always show features */}
      <ul className="space-y-3 mb-8 flex-grow hidden md:block">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="font-bold text-lg flex-shrink-0 mt-0.5" style={{ color: '#E8392A' }}>✓</span>
            <span
              className="leading-relaxed"
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem' }}
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
                  className="leading-relaxed"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem' }}
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

      <div style={{ marginTop: 'auto' }}>
        <button
          data-tier={label.toLowerCase()}
          onClick={() => handleTierClick(label.toLowerCase())}
          className="w-full px-6 py-3 font-bold uppercase tracking-wider text-sm md:text-base transition-all duration-150 ease-in-out"
          style={{
            background: '#E8392A',
            color: '#FFFFFF',
            borderRadius: '0px',
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
          {TIER_BUTTON_TEXT[label]}
        </button>
      </div>
      </div>
    </div>
  )
}

export function PricingTiers() {
  const tiers: TierProps[] = [
    {
      label: "ARTIST",
      features: [
        "Your guide through the funding maze — chat with a Canadian arts funding intelligence agent trained on all the councils",
        "Every arts council deadline and funding window tracked automatically — synced to your Google Calendar so your schedule reflects your films",
      ],
    },
    {
      label: "PRODUCER",
      features: [
        "Your own Canadian film funding intelligence agent — trained on all major funders: Telefilm, CMF, NFB, SODEC, and more",
        "Sync your entire slate's development cycles and funding deadlines to your calendar automatically — so your schedule reflects your slate",
        "Connect your project management tools to automate your entire slate workflow",
        "Junior becomes your second brain — every document, draft, and decision versioned and searchable",
        "Always working off the latest version — no more version chaos",
      ],
      featured: true,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {tiers.map((tier, idx) => (
              <TierCard key={idx} {...tier} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

