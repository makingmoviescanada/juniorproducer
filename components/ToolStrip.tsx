"use client"

const tools = [
  { name: "Google Calendar", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01%20png-transparent-google-calendar-google-s-logo-icon-uRfCF5VlL03mdcKVO3LHeWLFT0Sk02.png" },
  { name: "Asana", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02%20png-transparent-asana-logo-thumbnail-tech-companies-nPPWbLRYR5vnMBROTCymHzZWF0nBPx.png" },
  { name: "Claude", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03%20claude-color-NvlVR6q42q1Ci93p9uiMuTojPzjvcs.png" },
  { name: "Make", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04%20658d1160346d50ccbcb96f4d_Make-Logo-ouWRctSMfIxB8U0XDHH424ZO3peA76.png" },
  { name: "Google Sheets", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05%20png-clipart-google-sheets-logo-lyVeGSpdGmx8d6Eto92pVAem6UIe5k.png" },
  { name: "Google Drive", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06%20Google-drive-logo-on-transparent-background-PNG-9hMWjQTSiO88aTUXlZcTZVK7VTE5AV.avif" },
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
