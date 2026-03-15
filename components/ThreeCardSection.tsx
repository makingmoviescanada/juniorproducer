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
          <h2 className="three-card-headline font-display text-junior-black mb-16 text-center text-balance">
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
                <h3 className="card-title font-display text-junior-black mb-4">
                  {card.title}
                </h3>
                <p className="card-subheading text-junior-black/70 mb-4">
                  {card.subtitle}
                </p>
                <p className="body-copy text-junior-black/80 flex-grow">
                  {card.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300} className="mt-12 text-center">
          <a
            href="#cta"
            className="btn-cta inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white shadow-hard-red-sm btn-hover"
          >
            Get Early Access
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
