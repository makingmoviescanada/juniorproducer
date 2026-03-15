"use client"

const tools = [
  { name: "Google Calendar", logo: "https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png" },
  { name: "Claude", logo: "https://claude.ai/images/claude_app_icon.svg" },
  { name: "Asana", logo: "https://luna.assets.asana.biz/assets/img/social/default.png" },
  { name: "Make", logo: "https://www.make.com/en/press-kit/images/make-logo-default.svg" },
  { name: "Google Sheets", logo: "https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png" },
  { name: "Google Drive", logo: "https://www.gstatic.com/images/branding/product/1x/drive_48dp.png" },
]

export function ToolStrip() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center items-center gap-3">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white border border-gray-200 rounded"
            style={{ width: "80px", height: "80px", padding: "12px" }}
          >
            <img
              src={tool.logo}
              alt={tool.name}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
      <p className="text-junior-white/80 text-center font-sans text-sm">
        Junior connects to the tools you already use.
      </p>
    </div>
  )
}
