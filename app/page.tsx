'use client';

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
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI%20work%20assistant%20concept%205-cbBkjxz0NKeVgJrfyqYTiuvHt3cozy.png" alt="Junior AI assistant with person" style={{ width: '100%', maxWidth: '500px', objectFit: 'contain' }} />
          </div>
        </div>
      </section>
      <section className="w-full px-8 py-20" style={{ backgroundColor: '#E8392A' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div style={{ backgroundColor: '#F0EBE0', boxShadow: '4px 4px 0px #1A1A1A', padding: '40px 32px' }}>
            <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, color: '#1A1A1A', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '20px' }}>Easily navigate the Canadian funding system.</h3>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>Junior is there for you, even when the government portals are down. Every funder, every program, every deadline.</p>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer', width: '100%' }}>GET FUNDING INTELLIGENCE</button>
          </div>
          <div style={{ backgroundColor: '#F0EBE0', boxShadow: '4px 4px 0px #1A1A1A', padding: '40px 32px' }}>
            <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, color: '#1A1A1A', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '20px' }}>Automatically track deadlines.</h3>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>Junior syncs your deadlines directly to your calendar and alerts you when a window opens.</p>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer', width: '100%' }}>GET DEADLINE TOOLS</button>
          </div>
          <div style={{ backgroundColor: '#F0EBE0', boxShadow: '4px 4px 0px #1A1A1A', padding: '40px 32px' }}>
            <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, color: '#1A1A1A', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '20px' }}>Effortlessly calculate budgets and tax credits.</h3>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, color: '#1A1A1A', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>Junior builds your budget, calculates your tax credits, and tells you exactly what you qualify for — before you pitch.</p>
            <button style={{ backgroundColor: '#E8392A', color: '#FFFFFF', boxShadow: '4px 4px 0px #1A1A1A', fontWeight: 900, letterSpacing: '0.04em', padding: '12px 24px', border: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-barlow)', cursor: 'pointer', width: '100%' }}>GET BUDGET TOOLS</button>
          </div>
        </div>
      </section>
    </div>
  );
}
