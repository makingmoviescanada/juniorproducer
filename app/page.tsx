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
    </div>
  )
}