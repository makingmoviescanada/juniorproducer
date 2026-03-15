"use client"

import { ScrollReveal } from "./ScrollReveal"

interface Card {
  title: string
  subtitle: string
  body: string
}

const cards: Card[] = [
  {
    title: "Built for Canadian Film",
    subtitle: "Junior knows every Canadian deadline, eligibility requirement, and funding window.",
    body: "Stop crawling the same pages over and over again.",
  },
  {
    title: "Always On",
    subtitle: "When things go wrong, you'll never have to figure it out on your own again.",
    body: "Junior is available whenever you need it — no office hours, no waiting, no callbacks.",
  },
  {
    title: "No Staff Required",
    subtitle: "The assistant you could never afford to hire. Until now.",
    body: "Junior handles the admin, the version chaos, and the production overhead — for less than one billable hour.",
  },
]

export function ThreeCardSection() {
  return (
    <section className="bg-junior-parchment px-6 py-32 md:px-12 lg:px-24 border-t-2 border-junior-black">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-junior-black text-3xl md:text-4xl lg:text-5xl font-black tracking-wider mb-16 text-center text-balance leading-tight" style={{ textTransform: "none", letterSpacing: "0.02em", lineHeight: "1.2" }}>
            You&apos;re doing the work of an entire production office. Junior has your back.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" style={{ alignItems: "stretch" }}>
          {cards.map((card, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div 
                className="p-8 md:p-10 bg-junior-parchment border-2 border-junior-black shadow-hard-parchment-sm h-full flex flex-col"
                style={{ borderRadius: "86px" }}
              >
                <h3 className="text-junior-black text-base md:text-lg font-black uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, letterSpacing: "1px" }}>
                  {card.title}
                </h3>
                <p className="text-junior-black/70 italic text-sm md:text-base mb-4" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, lineHeight: "1.5" }}>
                  {card.subtitle}
                </p>
                <p className="font-sans text-junior-black/80 text-base md:text-lg flex-grow" style={{ lineHeight: "1.6" }}>
                  {card.body}
                </p>
                <a
                  href="#cta"
                  className="inline-block mt-auto px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-black uppercase tracking-wider shadow-hard-red-sm btn-hover text-sm"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, marginTop: "auto", letterSpacing: "2px" }}
                >
                  Get Early Access
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
