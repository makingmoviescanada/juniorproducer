export default function Home() {
  return (
    <div>
      <nav className="w-full px-8 py-4 flex items-center justify-between" style={{ backgroundColor: '#F0EBE0' }}>
        <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.04em', color: '#1A1A1A' }}>JUNIOR</span>
        <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', fontFamily: 'var(--font-barlow)', fontWeight: 900, boxShadow: '4px 4px 0px #1A1A1A', border: 'none', letterSpacing: '0.04em', padding: '12px 24px', textTransform: 'uppercase', cursor: 'pointer' }}>GET EARLY ACCESS</button>
      </nav>
      <section className="w-full px-8 py-20" style={{ backgroundColor: '#F0EBE0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h1 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>JUNIOR IS YOUR 24/7 PRODUCING PARTNER.</h1>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1.125rem', lineHeight: 1.6 }}>Built for the Canadian funding system — every funder, every program, every deadline, and more.</p>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer' }}>GET EARLY ACCESS</button>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20Puzzle-uwsYnOuhO4YR32MMy2YkbI5LhKyDwe.png" alt="Junior AI assistant with person collaborating on puzzle" style={{ width: '100%', maxWidth: '500px', objectFit: 'contain' }} />
          </div>
        </div>
      </section>
      <section className="w-full px-8 py-20" style={{ backgroundColor: '#E8392A' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" style={{ alignItems: 'stretch' }}>
          <div style={{ backgroundColor: '#F0EBE0', boxShadow: '4px 4px 0px #1A1A1A', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '320px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, color: '#1A1A1A', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '20px' }}>Easily navigate the Canadian funding system.</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem', lineHeight: 1.6, marginTop: '12px', marginBottom: '20px' }}>Junior knows every funder, every program, and every deadline — finding answers to your questions along the way.</p>
            </div>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer', width: '100%' }}>GET FUNDING INTELLIGENCE</button>
          </div>
          <div style={{ backgroundColor: '#F0EBE0', boxShadow: '4px 4px 0px #1A1A1A', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '320px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, color: '#1A1A1A', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '20px' }}>Automatically track deadlines.</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem', lineHeight: 1.6, marginTop: '12px', marginBottom: '20px' }}>Junior syncs every funding deadline directly to your calendar and alerts you when application windows open.</p>
            </div>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer', width: '100%' }}>GET DEADLINE TOOLS</button>
          </div>
          <div style={{ backgroundColor: '#F0EBE0', boxShadow: '4px 4px 0px #1A1A1A', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '320px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, color: '#1A1A1A', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '20px' }}>Effortlessly calculate budgets and tax credits.</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem', lineHeight: 1.6, marginTop: '12px', marginBottom: '20px' }}>Junior builds your budget using regional rates and calculates your tax credits instantly so you can assess opportunities quickly.</p>
            </div>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer', width: '100%' }}>GET BUDGET TOOLS</button>
          </div>
        </div>
      </section>
      <section className="w-full" style={{ backgroundColor: '#F0EBE0', padding: '64px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <img src="/logos/telefilm.png" alt="Telefilm Canada" style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7 }} />
          <img src="/logos/cmf.png" alt="Canada Media Fund" style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7 }} />
          <img src="/logos/nfb.png" alt="National Film Board of Canada" style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7 }} />
          <img src="/logos/canada-council.png" alt="Canada Council for the Arts" style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7 }} />
        </div>
      </section>
      <style>{`
        .closing-cta-btn {
          background-color: #1A1A1A;
          color: #FFFFFF;
          font-family: var(--font-barlow);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 16px 40px;
          border: none;
          border-radius: 6px;
          box-shadow: 4px 4px 0px #FFFFFF;
          cursor: pointer;
          transition: all 150ms ease;
        }
        .closing-cta-btn:hover {
          background-color: #333333;
          box-shadow: 6px 6px 0px #FFFFFF;
          transform: translateY(-2px);
        }
      `}</style>
      <section className="w-full" style={{ backgroundColor: '#E8392A', padding: '96px 48px' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.14, marginBottom: '20px' }}>THE CAVALRY'S NOT COMING. BUT JUNIOR IS.</h2>
          <p className="no-italic" style={{ fontFamily: "'Barlow', sans-serif", fontStyle: "normal", fontWeight: 600, color: '#FFFFFF', fontSize: '1.125rem', marginBottom: '40px' }}>Early access. Limited spots.</p>
          <button className="closing-cta-btn">GET EARLY ACCESS</button>
        </div>
      </section>
      <footer className="w-full flex items-center justify-between px-12 py-8" style={{ backgroundColor: '#1A1A1A', padding: '32px 48px' }}>
        <div />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.04em', color: '#FFFFFF', textTransform: 'uppercase' }}>JUNIOR</span>
          <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: '1rem', color: '#FFFFFF', margin: 0 }}>© 2026 Intersectionnel Films Inc.</p>
        </div>
      </footer>
    </div>
  );
}
