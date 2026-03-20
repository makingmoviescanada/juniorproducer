'use client';

export default function Home() {
  return (
    <div>
      <nav className="w-full px-8 py-4 flex items-center justify-between" style={{ backgroundColor: '#F0EBE0' }}>
        <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          JUNIOR
        </span>
        <button
          className="px-6 py-3 uppercase transition-all duration-150 hover:-translate-y-0.5"
          style={{
            backgroundColor: '#E8392A',
            color: '#FFFFFF',
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            boxShadow: '4px 4px 0px #1A1A1A',
            border: 'none',
            letterSpacing: '0.04em'
          }}
        >
          GET EARLY ACCESS
        </button>
      </nav>

      {/* Hero */}
      <section
        className="w-full px-8 py-20"
        style={{ backgroundColor: '#F0EBE0' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Left column */}
          <div className="flex-1 flex flex-col gap-6">
            <h1
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#1A1A1A',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
              }}
            >
              JUNIOR IS YOUR 24/7 PRODUCING PARTNER.
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                color: '#1A1A1A',
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              Built for the Canadian funding system — every funder, every program, every deadline, and more.
            </p>

            <div>
            <button
              style={{
                backgroundColor: '#E8392A',
                color: '#FFFFFF',
                boxShadow: '4px 4px 0px #1A1A1A',
                fontWeight: 900,
                letterSpacing: '0.04em',
                padding: '12px 24px',
                border: 'none',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-barlow)',
                cursor: 'pointer',
                transition: 'background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
              }}
              className="hover:bg-[#C9301E] hover:shadow-[6px_6px_0px_#1A1A1A] hover:-translate-y-0.5"
            >
              GET EARLY ACCESS
            </button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex justify-center">
            <img
              src="/placeholder.svg?height=560&width=420"
              alt="Junior producing partner illustration"
              style={{
                aspectRatio: '3 / 4',
                width: '100%',
                maxWidth: '420px',
                objectFit: 'cover',
                filter: 'grayscale(100%)',
                borderRadius: '4px',
              }}
            />
          </div>

        </div>
      </section>

      {/* Three-Card Section */}
      <section
        className="w-full px-8 py-20"
        style={{ backgroundColor: '#E8392A' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: '#F0EBE0',
              boxShadow: '4px 4px 0px #1A1A1A',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 900,
                color: '#1A1A1A',
                fontSize: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              The Canadian funding system is complicated. Junior isn't.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                color: '#1A1A1A',
                fontSize: '1rem',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              Every funder, every program, every deadline — chat with Junior and get an instant answer, even when the government portals are down. Never miss a window that only opens once a year again.
            </p>
            <button
              data-tier="funding-intelligence"
              style={{
                backgroundColor: '#E8392A',
                color: '#FFFFFF',
                boxShadow: '4px 4px 0px #1A1A1A',
                fontWeight: 900,
                letterSpacing: '0.04em',
                padding: '12px 24px',
                border: 'none',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-barlow)',
                cursor: 'pointer',
                transition: 'background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
              }}
              className="hover:bg-[#C9301E] hover:shadow-[6px_6px_0px_#1A1A1A] hover:-translate-y-0.5"
            >
              I WANT JUNIOR'S FUNDING INTELLIGENCE
            </button>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: '#F0EBE0',
              boxShadow: '4px 4px 0px #1A1A1A',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 900,
                color: '#1A1A1A',
                fontSize: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              Know your numbers before you're in the room.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                color: '#1A1A1A',
                fontSize: '1rem',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              Junior builds your budget, calculates your tax credits, and tells you exactly what you qualify for — before you pitch.
            </p>
            <button
              data-tier="budget-tools"
              style={{
                backgroundColor: '#E8392A',
                color: '#FFFFFF',
                boxShadow: '4px 4px 0px #1A1A1A',
                fontWeight: 900,
                letterSpacing: '0.04em',
                padding: '12px 24px',
                border: 'none',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-barlow)',
                cursor: 'pointer',
                transition: 'background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
              }}
              className="hover:bg-[#C9301E] hover:shadow-[6px_6px_0px_#1A1A1A] hover:-translate-y-0.5"
            >
              I WANT JUNIOR'S BUDGET TOOLS
            </button>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: '#F0EBE0',
              boxShadow: '4px 4px 0px #1A1A1A',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 900,
                color: '#1A1A1A',
                fontSize: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              Never miss a deadline again.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                color: '#1A1A1A',
                fontSize: '1rem',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              Junior monitors every funding program and alerts you the moment a window opens. Every deadline synced directly to your calendar.
            </p>
            <button
              data-tier="deadline-tools"
              style={{
                backgroundColor: '#E8392A',
                color: '#FFFFFF',
                boxShadow: '4px 4px 0px #1A1A1A',
                fontWeight: 900,
                letterSpacing: '0.04em',
                padding: '12px 24px',
                border: 'none',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-barlow)',
                cursor: 'pointer',
                transition: 'background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
              }}
              className="hover:bg-[#C9301E] hover:shadow-[6px_6px_0px_#1A1A1A] hover:-translate-y-0.5"
            >
              I WANT JUNIOR'S DEADLINE TOOLS
            </button>
          </div>

        </div>
      </section>
    </div>
  )
}
