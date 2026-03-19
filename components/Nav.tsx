'use client'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F0EBE0] border-b-2 border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-20">
        {/* Wordmark: JUNIOR (left) */}
        <a
          href="/"
          className="font-display text-[#1A1A1A] uppercase text-xl md:text-2xl"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            letterSpacing: '0.04em',
          }}
        >
          JUNIOR
        </a>

        {/* CTA button: GET EARLY ACCESS (right) */}
        <a
          href="#closing-cta"
          className="px-6 py-3 bg-[#E8392A] text-white font-sans font-bold uppercase text-sm md:text-base"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            letterSpacing: '0.05em',
            boxShadow: '4px 4px 0px #1A1A1A',
            transition: 'all 150ms ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#C9301E'
            ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '6px 6px 0px #1A1A1A'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E8392A'
            ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '4px 4px 0px #1A1A1A'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
          }}
        >
          GET EARLY ACCESS
        </a>
      </div>
    </nav>
  )
}
