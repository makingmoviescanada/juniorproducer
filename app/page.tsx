export default function Home() {
  return (
    <div className="w-full h-screen bg-white">
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 border-b-2 border-junior-black"
        style={{ backgroundColor: '#F0EBE0' }}
      >
        {/* Left: Logo */}
        <div
          className="font-black uppercase"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            color: '#1A1A1A',
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            letterSpacing: '0.05em',
          }}
        >
          Junior
        </div>

        {/* Right: Button */}
        <button
          className="font-black uppercase transition-all duration-150 ease-in-out active:scale-95"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            color: 'white',
            backgroundColor: '#E8392A',
            borderRadius: '6px',
            boxShadow: '4px 4px 0px #1A1A1A',
            padding: '0.75rem 1.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C9301E';
            e.currentTarget.style.boxShadow = '6px 6px 0px #1A1A1A';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#E8392A';
            e.currentTarget.style.boxShadow = '4px 4px 0px #1A1A1A';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Get Early Access
        </button>
      </nav>
    </div>
  )
}
