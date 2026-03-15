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
      <section className="bg-junior-parchment px-6 pt-32 pb-24 md:px-12 lg:px-24 border-b-2 border-junior-black">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

            {/* Left column — all copy stacked */}
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div 
                className="inline-flex items-center border-2 border-junior-black px-4 py-2 self-start"
                style={{ borderRadius: "6px" }}
              >
                <span className="font-display text-junior-black text-sm uppercase tracking-wider font-black">
                  JUNIOR
                </span>
              </div>
              <ScrollReveal>
                <h1 className="font-display text-junior-black text-4xl md:text-5xl lg:text-6xl font-black tracking-wider leading-tight text-pretty">
                  Burnout isn&apos;t a badge of honour —
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-sans text-junior-black text-lg md:text-xl font-semibold tracking-wide leading-relaxed text-pretty">
                  Junior is the 24/7 producer&apos;s assistant you could never afford to hire.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <a
                  href="#cta"
                  className="inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm self-start"
                  style={{ letterSpacing: "0.05em", fontSize: "0.875rem" }}
                >
                  Get Early Access
                </a>
              </ScrollReveal>
            </div>

            {/* Right column — image fills full height */}
            <ScrollReveal delay={200} direction="left" className="w-full lg:w-2/5 lg:flex-shrink-0">
              <div
                className="border-2 border-junior-black overflow-hidden w-full h-full"
                style={{ minHeight: "480px", filter: "grayscale(100%) contrast(1.1)" }}
              >
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
      <section className="bg-junior-red px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <h2 className="font-display text-junior-white text-3xl md:text-4xl font-black uppercase tracking-wider mb-8 text-balance leading-tight">
                Junior is a second brain for producers
              </h2>
              <p className="text-junior-white/90 text-lg md:text-xl leading-relaxed font-sans">
                Junior makes sure nothing falls through the cracks. Every deadline tracked, every document versioned, every funding window watched — so you can focus on making the film.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="left" className="w-full order-first lg:order-last">
              <ToolStrip />
            </ScrollReveal>
          </div>
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
      <section id="why-we-built-it" className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered headline and intro - full width above the grid */}
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-3xl md:text-4xl font-black uppercase tracking-wider mb-8 leading-tight text-center">
              BUILT BY CANADIAN FILMMAKERS,<br />FOR CANADIAN FILMMAKERS.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-junior-black/80 text-lg leading-relaxed font-sans mb-16 text-center max-w-3xl mx-auto">
              Junior started as our own in-house tool — built out of frustration with broken government portals, missed funding windows, and the sheer volume of admin that falls on independent filmmakers with no staff and no budgets to keep the lights on between productions.
            </p>
          </ScrollReveal>

          {/* Two-column: bios on left, photos on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: founder bios */}
            <ScrollReveal delay={150} className="flex flex-col gap-4">
              <p className="text-junior-black/80 text-lg leading-relaxed font-sans border-2 border-junior-black p-6">
                Gavin Seal is a Writers Guild of Canada prize-winning writer and Golden Sheaf Award-winning director who has led in-house creative teams at Mattel and Shopify.
              </p>
              <p className="text-junior-black/80 text-lg leading-relaxed font-sans border-2 border-junior-black p-6">
                Lisa Purisima is a Canadian Screen Award-nominated producer whose credits include John Wick 4 and The Morning Show (Apple TV+). Junior is built on this intersectional experience of art and technology.
              </p>
            </ScrollReveal>

            {/* Right: overlapping photos */}
            <ScrollReveal delay={200} direction="left" className="w-full flex justify-center">
              <div className="relative" style={{ width: "320px", height: "360px", overflow: "hidden" }}>
                {/* Gavin — top-left, behind */}
                <img
                  src="/images/gavin-seal-headshot.jpg"
                  alt="Gavin Seal, co-founder of Junior"
                  className="absolute z-0"
                  style={{
                    width: "180px",
                    height: "220px",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(100%) contrast(1.1)"
                  }}
                />
                {/* Lisa — bottom-right, in front */}
                <img
                  src="/images/lisa-purisima-headshot.jpg"
                  alt="Lisa Purisima, co-founder of Junior"
                  className="absolute z-10"
                  style={{
                    width: "180px",
                    height: "220px",
                    bottom: 0,
                    right: 0,
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
      <section id="cta" className="bg-junior-red px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-junior-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-4 text-balance leading-tight">
              THE CAVALRY'S NOT COMING. BUT JUNIOR IS.
            </h2>
            <p className="font-sans text-junior-white text-base md:text-lg font-semibold mb-12">
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
