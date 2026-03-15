"use client"

import { ScrollReveal } from "./ScrollReveal"

interface Card {
  title: string
  subtitle: string
  body: string
}

const cards: Card[] = [
  {
    title: "Built for Canadian Producers",
    subtitle: "Stop crawling the same pages over and over again.",
    body: "Junior knows every Canadian deadline, eligibility requirement, and funding window.",
  },
  {
    title: "Ready When You Are",
    subtitle: "When things go wrong, you'll never have to figure it out on your own again.",
    body: "Junior is available whenever you need it — no office hours, no waiting, no callbacks.",
  },
  {
    title: "No Staff, No Problem",
    subtitle: "The assistant you could never afford to hire. Until now.",
    body: "Junior handles the admin, the version chaos, and the production overhead — for less than one billable hour.",
  },
]

export function ThreeCardSection() {
  return (
    <section className="bg-junior-parchment px-6 py-32 md:px-12 lg:px-24 border-t-2 border-junior-black">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-junior-black text-4xl md:text-5xl lg:text-6xl font-black tracking-wider mb-16 text-center text-balance leading-tight">
            You&apos;re doing the work of an entire production office. Junior has your back.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div 
                className="p-8 md:p-10 bg-junior-parchment border-2 border-junior-black shadow-hard-parchment-sm h-full flex flex-col"
                style={{ borderRadius: "86px" }}
              >
                <h3 className="font-display text-junior-black text-lg md:text-xl font-black uppercase tracking-wider mb-4">
                  {card.title}
                </h3>
                <p className="font-sans text-junior-black/80 text-base md:text-lg leading-relaxed md:leading-loose flex-grow">
                  {card.subtitle}
                </p>
                <p className="font-sans text-junior-black/80 text-base md:text-lg leading-relaxed md:leading-loose flex-grow">
                  {card.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300} className="mt-12 text-center">
          <a
            href="#cta"
            className="inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm"
          >
            Get Early Access
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
