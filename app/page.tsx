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
      <section className="bg-junior-parchment px-6 py-32 md:px-12 lg:px-24 flex items-center min-h-screen pt-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div className="mb-8">
                <div className="inline-block px-3 py-2 bg-junior-parchment border-2 border-junior-black"
                  style={{ borderRadius: "4px", fontSize: "0.875rem" }}
                >
                  <span className="font-display text-junior-black font-bold uppercase tracking-wider">Junior</span>
                </div>
              </div>
              <h1 className="font-display text-junior-black text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight text-pretty" style={{ lineHeight: "1.1", marginBottom: "24px" }}>
                The late nights and weekends aren&apos;t a badge of honour — you need help.
              </h1>
              <h2 className="font-barlow-semibold text-junior-black text-lg md:text-xl lg:text-2xl tracking-wide leading-relaxed text-pretty mb-8" style={{ lineHeight: "1.4" }}>
                Junior is the producer&apos;s assistant you could never afford to hire — handling the funding, the admin, and the chaos so you can focus on making films.
              </h2>
              <a
                href="#cta"
                className="inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm"
                style={{ letterSpacing: "0.05em", fontSize: "0.875rem" }}
              >
                Get Early Access
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="left" className="w-full order-first lg:order-last">
              <div style={{ filter: "grayscale(100%) contrast(1.1)" }}>
                <VideoPlaceholder 
                  aspectRatio="4:5" 
                  imageSrc="/images/hero-production.jpg"
                  imageAlt="Film production scene"
                  showPlayButton={false}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section: Three Card Section */}
      <ThreeCardSection />

      {/* Section: Second Brain & Integrations */}
      <section className="bg-junior-red px-6 py-32 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <h2 className="font-display text-junior-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-8 text-balance leading-tight">
                JUNIOR IS YOUR SECOND BRAIN.
              </h2>
              <p className="font-sans text-junior-white/90 text-base md:text-lg leading-relaxed font-sans mb-6" style={{ lineHeight: "1.7" }}>
                The Canadian film industry runs on sweat equity that never recoups. We do it out of passion, but it doesn't pay the bills, and while we're working our day jobs, we miss deadlines, stay up late and burn out, so we don't drop a ball that no one else is there to catch.
              </p>
              <p className="font-sans text-junior-white/90 text-base md:text-lg leading-relaxed font-sans" style={{ lineHeight: "1.7" }}>
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
      <section id="features" className="bg-junior-parchment px-6 py-32 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-4 text-center text-balance">
              No budget, no team, no problem.
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-junior-black/80 text-base md:text-lg leading-relaxed font-sans text-left mb-16" style={{ lineHeight: "1.7" }}>
                Junior holds everything you can&apos;t afford to forget — funding windows, delivery dates, document versions, budget checkpoints — and surfaces what you need, when you need it.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <FeatureTiers />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Pricing Tiers */}
      <PricingTiers />

      {/* Section: Logo Cloud */}
      <section className="bg-junior-white px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <LogoCloud title="Junior understands these funders — because we've worked with them" />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Founders/About */}
      <section id="why-we-built-it" className="bg-junior-parchment px-6 py-32 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered headline and intro - full width above the grid */}
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-4xl md:text-5xl font-black uppercase tracking-wider mb-8 leading-tight text-center">
              BUILT BY CANADIAN FILMMAKERS,<br />FOR CANADIAN FILMMAKERS.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-junior-black/80 text-base md:text-lg leading-relaxed font-sans mb-16 text-center max-w-3xl mx-auto" style={{ lineHeight: "1.7" }}>
              Junior started as our own in-house tool — built out of frustration with broken government portals, missed funding windows, and the sheer volume of admin that falls on independent filmmakers with no staff and no budgets to keep the lights on between productions.
            </p>
          </ScrollReveal>

          {/* Two-column: bios on left, photos on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: founder bios (60% on desktop) */}
            <ScrollReveal delay={150} className="flex flex-col gap-4">
              <p className="text-junior-black/80 text-base md:text-lg leading-relaxed font-sans border-2 border-junior-black p-6" style={{ lineHeight: "1.6" }}>
                Gavin Seal is a Writers Guild of Canada prize-winning writer and Golden Sheaf Award-winning director who has led in-house creative teams at Mattel and Shopify.
              </p>
              <p className="text-junior-black/80 text-base md:text-lg leading-relaxed font-sans border-2 border-junior-black p-6" style={{ lineHeight: "1.6" }}>
                Lisa Purisima is a Canadian Screen Award-nominated producer whose credits include John Wick 4 and The Morning Show (Apple TV+). Junior is built on this intersectional experience of art and technology.
              </p>
            </ScrollReveal>

            {/* Right: stacked photos (40% on desktop) */}
            <ScrollReveal delay={200} direction="left" className="w-full">
              <div className="flex flex-col gap-2">
                {/* Gavin's photo */}
                <img
                  src="/images/gavin-seal-headshot.jpg"
                  alt="Gavin Seal, co-founder of Junior"
                  className="w-full h-auto"
                  style={{
                    aspectRatio: "1",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(100%) contrast(1.1)"
                  }}
                />
                {/* Lisa's photo */}
                <img
                  src="/images/lisa-purisima-headshot.jpg"
                  alt="Lisa Purisima, co-founder of Junior"
                  className="w-full h-auto"
                  style={{
                    aspectRatio: "1",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(100%) contrast(1.1)"
                  }}
                />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-junior-red px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-junior-white text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-4 text-balance leading-tight">
              THE CAVALRY'S NOT COMING. BUT JUNIOR IS.
            </h2>
            <p className="font-barlow-semibold text-junior-white text-base md:text-lg mb-12" style={{ letterSpacing: "0.05em" }}>
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
              <div 
                className="font-display text-junior-black uppercase mb-2 leading-none inline-block px-3 py-2 bg-junior-parchment border-2 border-junior-parchment"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", borderRadius: "6px" }}
              >
                JUNIOR
              </div>
              <p className="text-junior-white/50 text-sm font-sans mt-3">
                © Intersectional Films Inc.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
