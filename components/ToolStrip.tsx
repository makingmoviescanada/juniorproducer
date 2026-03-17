"use client"

const tools = [
  { name: "Google Calendar", logo: "/logos/01 calendar_17_2x.png" },
  { name: "Claude", logo: "/logos/02 claude-color.png" },
  { name: "Asana", logo: "/logos/03 Asana-Symbol.png" },
  { name: "Make", logo: "/logos/04 make-color.png" },
  { name: "Google Sheets", logo: "/logos/05 sheets_2020q4_48dp.png" },
  { name: "Google Drive", logo: "/logos/06 drive_2020q4_48dp.png" },
]

export function ToolStrip() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            style={{
              background: '#FFFFFF',
              border: '1px solid #1A1A1A',
              borderRadius: '8px',
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={tool.logo}
              alt={tool.name}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                filter: 'grayscale(100%)',
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-center font-sans text-lg md:text-xl" style={{ color: '#1A1A1A' }}>
        Junior connects to the tools you already use.
      </p>
    </div>
  )
}
