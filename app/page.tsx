import { VideoPlaceholder } from "@/components/VideoPlaceholder"
import { KitForm } from "@/components/KitForm"
import { StickyHeader } from "@/components/StickyHeader"
import { LogoCloud } from "@/components/LogoCloud"
import { FeatureTiers } from "@/components/FeatureTiers"
import { ScrollReveal } from "@/components/ScrollReveal"
import { DashboardIllustration } from "@/components/DashboardIllustration"
import { ThreeCardSection } from "@/components/ThreeCardSection"
import { ToolStrip } from "@/components/ToolStrip"
import { FoundersPortraits } from "@/components/FoundersPortraits"
import { PricingTiers } from "@/components/PricingTiers"

export default function Home() {
  return (
    <main>
      <StickyHeader />
      {/* Section 1: Hero */}
      <section className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 flex items-center min-h-screen pt-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div className="mb-8">
                <div className="inline-block px-4 py-3 bg-junior-parchment border-2 border-junior-black"
                  style={{ borderRadius: "6px", fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}
                >
                  <span className="font-display text-junior-black font-bold uppercase tracking-wider">Junior</span>
                </div>
              </div>
              <h1 className="font-display text-junior-black text-2xl md:text-3xl tracking-wider mb-8 leading-tight text-pretty">
                The late nights and weekends aren&apos;t a badge of honour — you need help. Junior is the producer&apos;s assistant you could never afford to hire — handling the funding, the admin, and the chaos so you can get back to making films.
              </h1>
              <ul className="mb-8 space-y-2 border-l-2 border-junior-black pl-6">
                {["Canadian funding deadlines.", "Document version control.", "Production support.", "Available 24/7."].map((point) => (
                  <li key={point} className="text-junior-black/80 text-lg font-sans font-medium tracking-wide">
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm"
              >
                Get Early Access
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="left" className="w-full order-first lg:order-last">
              <VideoPlaceholder 
                aspectRatio="4:5" 
                imageSrc="/images/hero-production.jpg"
                imageAlt="Film production scene"
                showPlayButton={false}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section: Three Card Section */}
      <ThreeCardSection />

      {/* Section: Second Brain & Integrations */}
      <section className="bg-junior-red px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <h2 className="font-display text-junior-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-6 text-balance leading-tight">
                JUNIOR IS YOUR SECOND BRAIN.
              </h2>
              <p className="text-junior-white/90 text-xl leading-relaxed font-sans mb-6">
                The Canadian film industry runs on sweat equity that never recoups. We do it out of passion, but it doesn't pay the bills, and while we're working our day jobs, we miss deadlines, stay up late and burn out, so we don't drop a ball that no one else is there to catch.
              </p>
              <p className="text-junior-white/90 text-xl leading-relaxed font-sans">
                You focus on making the film. Junior makes sure nothing falls through the cracks.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="left" className="w-full order-first lg:order-last">
              <ToolStrip />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section: Feature Grid */}
      <section id="features" className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-4 text-center text-balance">
              No budget, no team, no problem.
            </h2>
            <p className="text-junior-black/80 text-xl leading-relaxed font-sans max-w-3xl mb-16">
              Junior holds everything you can&apos;t afford to forget — funding windows, delivery dates, document versions, budget checkpoints — and surfaces what you need, when you need it.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <FeatureTiers />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Pricing Tiers */}
      <PricingTiers />

      {/* Section: Logo Cloud */}
      <section className="bg-junior-white px-6 py-16 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <LogoCloud title="Junior understands these funders — because we've worked with them" />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Founders/About */}
      <section id="why-we-built-it" className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <ScrollReveal>
              <h2 className="font-display text-junior-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-12 text-balance">
                BUILT BY CANADIAN FILMMAKERS, FOR CANADIAN FILMMAKERS.
              </h2>
              
              <div className="mb-8">
                <p className="text-junior-black/80 text-xl leading-relaxed font-sans mb-6">
                  Junior started as our own in-house tool — built out of frustration with broken government portals, missed funding windows, and the sheer volume of admin that falls on independent filmmakers with no staff and no budgets to keep the lights on between productions.
                </p>

                <p className="text-junior-black/80 text-xl leading-relaxed font-sans">
                  Gavin Seal is a Writers Guild of Canada prize-winning writer and Golden Sheaf Award-winning director who has led in-house creative teams at Mattel and Shopify. Lisa Purisima is a Canadian Screen Award-nominated producer whose credits include John Wick 4 and The Morning Show (Apple TV+). Junior is built on this intersectional experience of art and technology.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="left" className="w-full order-first lg:order-last">
              <FoundersPortraits />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-junior-white px-6 py-20 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-2xl md:text-3xl uppercase tracking-wider mb-3 text-balance">
              THE CAVALRY'S NOT COMING. BUT JUNIOR IS.
            </h2>
            <p className="font-sans text-junior-black/70 text-lg mb-8">
              Early access. Limited spots.
            </p>
            <KitForm className="justify-center" />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="bg-junior-black border-t-2 border-junior-black px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div />
            <div className="lg:text-right">
              <p 
                className="font-display text-junior-white uppercase mb-2 leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                JUNIOR
              </p>
              <p className="text-junior-white/50 text-sm font-sans">
                © Intersectional Films Inc.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
