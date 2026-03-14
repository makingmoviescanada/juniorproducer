import { VideoPlaceholder } from "@/components/VideoPlaceholder"
import { KitForm } from "@/components/KitForm"
import { StickyHeader } from "@/components/StickyHeader"
import { LogoCloud } from "@/components/LogoCloud"
import { FeatureTiers } from "@/components/FeatureTiers"
import { IntegrationHub } from "@/components/IntegrationHub"
import { ScrollReveal } from "@/components/ScrollReveal"

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
                <button className="inline-block px-6 py-4 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm font-display"
                  style={{ fontSize: "clamp(2.5rem, 10vw, 4.5rem)" }}
                >
                  Junior
                </button>
              </div>
              <p className="font-display text-junior-black text-2xl md:text-3xl uppercase tracking-wider mb-8 leading-tight">
                Automate the drudgery,<br />so you can focus on <span className="text-junior-red">making movies</span>.
              </p>
              <p className="text-junior-black/80 text-xl leading-relaxed font-sans max-w-2xl mb-8">
                Junior automates tedious admin and operations tasks and streamlines version chaos.
              </p>
              <a
                href="#cta"
                className="inline-block px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm"
              >
                Join the Waitlist
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

      {/* Section: Integration Hub - Junior at the center */}
      <section id="tools" className="bg-junior-white px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider mb-16 text-balance leading-tight">
              Optimize your film slate,<br />
              updates and reporting in seconds 24/7,<br />
              leverage an AI assistant trained on<br />
              the Canadian film industry.
            </h2>
          </ScrollReveal>
            <ScrollReveal delay={150} direction="fade">
            <IntegrationHub landscape />
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Feature Tiers */}
      <section className="bg-junior-black px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-junior-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-16 text-center text-balance">
              No budget, no team, no problem.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <FeatureTiers dark />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-junior-white px-6 py-20 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-2xl md:text-3xl uppercase tracking-wider mb-8 text-balance">
              Join the waitlist for early access.
            </h2>
            <KitForm className="justify-center" />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-junior-red px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <h2 className="font-display text-junior-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-6 text-balance">
                JUNIOR IS your second brain.
              </h2>
              <p className="text-junior-white/90 text-xl leading-relaxed font-sans mb-6">
                Junior is your dream 24/7 assistant from pre-development through distribution.
              </p>
              <p className="text-junior-white/90 text-xl leading-relaxed font-sans mb-6">
                Pull documents, track deadlines, and check budgets at 4AM on set — instead of navigating Google Drive from your phone or waiting for your accountant to wake up.
              </p>
              <p className="text-junior-white/90 text-xl leading-relaxed font-sans">
                Junior handles the nights, weekends, and everything in between.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="left" className="w-full order-first lg:order-last">
              <div className="border-2 border-junior-white/30 shadow-hard-red-sm overflow-hidden">
                <img 
                  src="/images/dashboard-screenshot.jpg" 
                  alt="Junior dashboard interface" 
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 5: Who Built This */}
      <section id="about" className="bg-junior-parchment px-6 py-24 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-junior-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-12 text-balance">
              About the creator
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            <ScrollReveal direction="right" className="w-full order-1 h-full">
              <VideoPlaceholder 
                aspectRatio="3:4" 
                imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gavin_seal_frederic_bouchard-500-BhgdBTpwqTGwqAbuVdm8B6aqu2qgIS.jpg"
                imageAlt="Gavin Seal, founder of Junior"
                showPlayButton={false}
              />
            </ScrollReveal>
            <ScrollReveal delay={150} className="order-2 space-y-6">
              <p className="text-junior-black/80 text-xl leading-relaxed font-sans">
                Gavin Seal is a Writers Guild of Canada prize-winning writer and Chief Creative Officer at Intersectionnel Films. Junior started as our own in-house production tool — automatically crawling government websites for revised funding deadlines, keeping track of document versioning across collaborators, calculating tax credits, and other tedious drudgery.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <blockquote className="border-t-2 border-junior-black pt-12 text-center max-w-3xl mx-auto">
              <p className="font-display text-junior-black text-2xl md:text-3xl uppercase tracking-wider leading-tight text-balance">
                &ldquo;I hope Junior helps you get some sleep, delegate to your team more efficiently, and spend more nights and weekends with friends and family.&rdquo;
              </p>
              <cite className="block mt-6 text-junior-black/50 font-sans text-sm not-italic uppercase tracking-widest">— Gavin Seal, Founder</cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Section: Logo Cloud */}
      <section className="bg-junior-white px-6 py-16 md:px-12 lg:px-24 border-t-2 border-junior-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <LogoCloud title="Junior understands these funders — because we've worked with them" />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="bg-junior-black border-t-2 border-junior-black px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h3 className="font-display text-junior-white text-2xl uppercase tracking-wider mb-6">
                Sign up to get early access.
              </h3>
              <KitForm className="max-w-md" variant="dark" />
            </div>
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
