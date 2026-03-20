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
            borderRadius: '6px',
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
                  borderRadius: '6px',
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
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = '#C9301E';
                  btn.style.boxShadow = '6px 6px 0px #1A1A1A';
                  btn.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = '#E8392A';
                  btn.style.boxShadow = '4px 4px 0px #1A1A1A';
                  btn.style.transform = 'translateY(0)';
                }}
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
    </div>
  )
}
