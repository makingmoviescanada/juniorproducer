"use client"

import { ScrollReveal } from "./ScrollReveal"

interface Card {
  title: string
  subtitle: string
  body: string
}

const cards: Card[] = [
  {
    title: "for canadians",
    subtitle: "",
    body: "Junior crawls so you can run — every funding window, eligibility requirement, and deadline.",
  },
  {
    title: "always on",
    subtitle: "",
    body: "No office hours. No callbacks. No waiting. Junior is standing by — even at 11:59PM.",
  },
  {
    title: "no budget, no problem",
    subtitle: "",
    body: "Junior automates the admin drudgery and version chaos that falls on producers with no staff — for less than one billable hour per month.",
  },
]

export function ThreeCardSection() {
  return (
    <section className="bg-junior-black px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-junior-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-16 text-center text-balance leading-snug">
            You&apos;re doing the work of an entire production office - Junior is here to help.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div 
                className="p-8 md:p-10 bg-junior-white border-2 border-junior-black shadow-hard-parchment-sm h-full flex flex-col"
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
            className="inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider btn-hover font-sans text-sm"
          >
            Get Early Access
          </a>
        </ScrollReveal>

        <ScrollReveal delay={400} className="mt-12 text-center">
          <p className="font-sans text-junior-white text-lg md:text-xl leading-relaxed">
            The average film producer earns $19.70/hour in Quebec and 50% have no full-time employees.
          </p>
          <p className="font-sans text-junior-white/50 text-sm mt-4">
            <a href="https://www.uppcq.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-junior-white">Source: UPPCQ, 2024</a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
