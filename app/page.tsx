import { VideoPlaceholder } from "@/components/VideoPlaceholder"
import { KitForm } from "@/components/KitForm"
import { StickyHeader } from "@/components/StickyHeader"
import { LogoCloud } from "@/components/LogoCloud"
import { FunderLogos } from "@/components/FunderLogos"
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
      <section
        className="bg-junior-parchment px-6 pt-32 pb-24 md:px-12 lg:px-24 border-b-2 border-junior-black"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Paper grain texture overlay */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.05,
            zIndex: 0,
          }}
        >
          <filter id="hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        <div className="max-w-7xl mx-auto w-full" style={{ position: "relative", zIndex: 2 }}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left column — all copy stacked, centered vertically against right column on desktop */}
            <div className="flex-1 flex flex-col justify-center gap-4">
              <ScrollReveal>
                <h1
                  className="font-display text-junior-black font-black uppercase text-pretty"
                  style={{
                    fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                    letterSpacing: "0.058em",
                    lineHeight: 1.14,
                  }}
                >
                  Your producing partner.<br />Available 24/7.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-sans text-junior-black text-xl md:text-2xl font-semibold tracking-wide leading-relaxed text-pretty">
                  Junior is the producing assistant you've always dreamed of — built for the realities of the Canadian film industry.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <a
                  href="#cta"
                  className="inline-block px-6 py-3 text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm self-start border-2 border-junior-black"
                  style={{
                    backgroundColor: "#E8392A",
                    borderRadius: "5px",
                    letterSpacing: "0.05em",
                    fontSize: "0.875rem",
                    color: "#FFFFFF",
                  }}
                >
                  Get Early Access
                </a>
              </ScrollReveal>

            </div>

            {/* Right column — responsive photo sizing */}
            <ScrollReveal delay={200} direction="left" className="w-full md:w-2/5 lg:w-[45%] flex-shrink-0">
              <div style={{ 
                filter: "grayscale(100%) contrast(1.1)",
                boxShadow: "6px 6px 0px #1A1A1A"
              }}>
                <VideoPlaceholder
                  aspectRatio="4:5"
                  imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-fOWDTRFXpS9Vgq7Tbfnozxll69KREp.jpeg"
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
          <ScrollReveal>
            <h2 className="font-display text-junior-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-16 text-balance leading-snug text-center">
              Junior is a second brain for producers
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-junior-white/90 text-lg md:text-xl leading-relaxed font-sans max-w-2xl mb-16 text-center mx-auto">
              Junior makes sure nothing falls through the cracks. Every deadline tracked, every document versioned, every funding window watched — so you can focus on making the film.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ToolStrip />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Pricing Tiers */}
      <PricingTiers />

      {/* Section: Logo Cloud */}
      <section className="bg-junior-black px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <FunderLogos />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Founders/About */}
      <section id="why-we-built-it" className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered headline and intro - full width above the grid */}
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-16 leading-snug text-center text-balance">
              BUILT BY CANADIAN FILMMAKERS,<br />FOR CANADIAN FILMMAKERS.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-junior-black/80 text-lg md:text-xl leading-relaxed font-sans mb-16 text-center max-w-3xl mx-auto">
              Junior started as our own in-house tool — built out of frustration with broken government portals, missed funding windows, and the sheer volume of admin that falls on independent filmmakers with no staff and no budgets to keep the lights on between productions.
            </p>
          </ScrollReveal>

          {/* Two-column: bios on left, photos on right */}
          {/* Mobile: each founder as photo + bio pair. Desktop: bios left, overlapping photos right */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

            {/* Left: founder bios — always visible */}
            <ScrollReveal delay={150} className="flex flex-col gap-4 w-full min-w-0">
              {/* Gavin - mobile: photo + bio row, desktop: bio only */}
              <div className="flex items-stretch gap-4">
                <div className="flex-shrink-0 w-24 bg-white border-2 border-junior-black flex items-center justify-center overflow-hidden lg:hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-gcA2FsTP2af7VF1EjAowBgm97wok9P.png"
                    alt="Gavin Seal, co-founder of Junior"
                    className="h-auto object-cover object-top w-full"
                    style={{ filter: "grayscale(100%) contrast(1.1)" }}
                  />
                </div>
                <p className="text-junior-black/80 text-lg leading-relaxed font-sans border-2 border-junior-black p-6 flex-1">
                  Gavin Seal is a Writers Guild of Canada prize-winning writer and Golden Sheaf Award-winning director who has led in-house creative teams at Mattel and Shopify.
                </p>
              </div>
              {/* Lisa - mobile: photo + bio row, desktop: bio only */}
              <div className="flex items-stretch gap-4">
                <div className="flex-shrink-0 w-24 bg-white border-2 border-junior-black flex items-center justify-center overflow-hidden lg:hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lisa%20Purisima-qUBLzUadSzr2Y7cedlcDtMBSgOjM1r.png"
                    alt="Lisa Purisima, co-founder of Junior"
                    className="h-auto object-cover object-top w-full"
                    style={{ filter: "grayscale(100%) contrast(1.1)" }}
                  />
                </div>
                <p className="text-junior-black/80 text-lg leading-relaxed font-sans border-2 border-junior-black p-6 flex-1">
                  Lisa Purisima is a Canadian Screen Award-nominated producer whose credits include John Wick 4 and The Morning Show (Apple TV+).
                </p>
              </div>
            </ScrollReveal>

            {/* Right: overlapping photos — desktop only */}
            <ScrollReveal delay={200} direction="left" className="hidden lg:flex w-full justify-center">
              <div className="relative" style={{ width: "320px", height: "360px" }}>
                <div className="absolute z-0" style={{ width: "180px", height: "220px", top: 0, left: 0, backgroundColor: "white", border: "2px solid black", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-gcA2FsTP2af7VF1EjAowBgm97wok9P.png"
                    alt="Gavin Seal, co-founder of Junior"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      filter: "grayscale(100%) contrast(1.1)"
                    }}
                  />
                </div>
                <div className="absolute z-10" style={{ width: "180px", height: "220px", bottom: 0, right: 0, backgroundColor: "white", border: "2px solid black", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lisa%20Purisima-qUBLzUadSzr2Y7cedlcDtMBSgOjM1r.png"
                    alt="Lisa Purisima, co-founder of Junior"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      filter: "grayscale(100%) contrast(1.1)"
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>

          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-junior-red px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-junior-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-6 text-balance leading-snug">
              THE CAVALRY'S NOT COMING. BUT JUNIOR IS.
            </h2>
            <p className="font-sans text-junior-white text-lg md:text-xl font-semibold mb-16">
              Early access. Limited spots.
            </p>
            <KitForm className="justify-center" />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="bg-junior-black border-t-2 border-junior-black px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-end items-end gap-12">
            <div className="text-right">
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
