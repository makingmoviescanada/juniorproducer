"use client"

import { ScrollReveal } from "./ScrollReveal"

interface Card {
  title: string
  subtitle: string
  body: string
}

const cards: Card[] = [
  {
    title: "FOR CANADIANS",
    subtitle: "",
    body: "Junior crawls so you can run — every funding window, eligibility requirement, and deadline.",
  },
  {
    title: "ALWAYS ON",
    subtitle: "",
    body: "No office hours. No callbacks. No waiting. Junior is standing by — even at 11:59PM.",
  },
  {
    title: "NO BUDGET, NO PROBLEM",
    subtitle: "",
    body: "Junior automates admin and version chaos — so you can focus on tasks that move the needle.",
  },
]

export function ThreeCardSection() {
  return (
    <section
      className="grain-overlay px-6 py-24 md:px-12 lg:px-24"
      style={{ backgroundColor: '#E8392A' }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-16 text-center text-balance leading-snug"
            style={{
              color: '#FFFFFF',
              fontWeight: 900,
              fontFamily: 'var(--font-barlow)',
            }}
          >
            You&apos;re doing the work of an entire production office — Junior is here to help.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:items-stretch">
          {cards.map((card, index) => (
            <ScrollReveal key={index} delay={index * 100} className="h-full">
              <div
                className="p-6 h-full flex flex-col"
                style={{
                  backgroundColor: '#F0EBE0',
                  border: '1px solid #1A1A1A',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px #1A1A1A',
                }}
              >
                <h3
                  className="text-base md:text-lg uppercase tracking-wider mb-3"
                  style={{
                    color: '#1A1A1A',
                    fontWeight: 900,
                    fontFamily: 'var(--font-barlow)',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed flex-grow font-sans"
                  style={{ color: '#1A1A1A' }}
                >
                  {card.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300} className="mt-12 text-center">
          <a
            href="#cta"
            className="inline-block px-6 py-3 uppercase tracking-wider font-sans text-sm font-bold btn-black"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              borderRadius: '6px',
            }}
          >
            Get Early Access
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
