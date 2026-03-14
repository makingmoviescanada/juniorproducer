"use client"

export function ProductMockup() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Browser frame */}
      <div className="border-2 border-junior-black bg-junior-white">
        {/* Top bar */}
        <div className="bg-junior-white border-b-2 border-junior-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-junior-red border-2 border-junior-black"></div>
            <span className="font-display text-junior-black text-sm uppercase tracking-wider">Junior Dashboard</span>
          </div>
          <div className="flex gap-2">
            <button className="w-3 h-3 bg-junior-black/20 border border-junior-black"></button>
            <button className="w-3 h-3 bg-junior-black/20 border border-junior-black"></button>
            <button className="w-3 h-3 bg-junior-black/20 border border-junior-black"></button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 min-h-96 bg-junior-white">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-xs uppercase tracking-wider text-junior-black/60 mb-2">CURRENT PROJECT</p>
              <h2 className="font-display text-junior-black text-2xl uppercase tracking-wider">The Documentary</h2>
              <p className="text-sm text-junior-black/70 mt-1">Budget: $450,000 • Days: 28 • Status: Pre-production</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y-2 border-junior-black">
              <div>
                <p className="text-xs uppercase tracking-wider text-junior-black/60 mb-1">Available Budget</p>
                <p className="font-display text-xl text-junior-black">$127,500</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-junior-black/60 mb-1">Days Left</p>
                <p className="font-display text-xl text-junior-black">14</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-junior-black/60 mb-1">Tasks</p>
                <p className="font-display text-xl text-junior-black">23</p>
              </div>
            </div>

            {/* Items grid */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-junior-black/60">Recent Actions</p>
              <div className="space-y-2">
                {["Get crew quotes for camera dept", "Submit tax credit paperwork", "Finalize location agreements"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-junior-black/10">
                    <span className="text-junior-red font-bold mt-1">✓</span>
                    <span className="text-sm text-junior-black/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shadow behind */}
      <div 
        className="absolute -bottom-3 -right-3 w-full h-full border-2 border-junior-black bg-junior-parchment pointer-events-none z-0"
        style={{ transform: "translate(8px, 8px)" }}
      />
    </div>
  )
}
