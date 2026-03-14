"use client"

export function DashboardIllustration() {
  return (
    <div className="bg-junior-parchment border-2 border-junior-white/30 p-4 sm:p-6 md:p-8">
      {/* Header bar */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-junior-black/20">
        <div className="w-8 h-8 bg-junior-red rounded-sm" />
        <div className="h-3 w-24 bg-junior-black/30 rounded-sm" />
        <div className="ml-auto flex gap-2">
          <div className="w-3 h-3 bg-junior-black/20 rounded-full" />
          <div className="w-3 h-3 bg-junior-black/20 rounded-full" />
          <div className="w-3 h-3 bg-junior-black/20 rounded-full" />
        </div>
      </div>

      {/* Top row - Gauge charts */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <GaugeChart percentage={85} label="Budget" />
        <GaugeChart percentage={62} label="Schedule" />
        <GaugeChart percentage={94} label="Resources" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Left column - Checklist */}
        <div className="space-y-3">
          <div className="h-3 w-20 bg-junior-black/40 rounded-sm mb-3" />
          
          {/* Checklist items */}
          <div className="space-y-2">
            {[true, true, true, false, false].map((checked, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-4 h-4 border-2 border-junior-black flex-shrink-0 flex items-center justify-center ${checked ? 'bg-junior-red' : 'bg-junior-white'}`}>
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-junior-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className={`h-2 rounded-sm ${checked ? 'bg-junior-black/20' : 'bg-junior-black/10'}`} style={{ width: `${60 + Math.random() * 30}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Timeline */}
        <div className="space-y-3">
          <div className="h-3 w-16 bg-junior-black/40 rounded-sm mb-3" />
          
          {/* Timeline */}
          <div className="relative pl-5">
            <div className="absolute left-1.5 top-1 bottom-1 w-0.5 bg-junior-black/20" />
            
            <div className="space-y-3">
              {[true, true, false, false].map((complete, i) => (
                <div key={i} className="relative flex items-start gap-2">
                  <div className={`absolute -left-3.5 top-0.5 w-2.5 h-2.5 border-2 rounded-full flex-shrink-0 ${complete ? 'bg-junior-red border-junior-black' : 'bg-junior-white border-junior-black/30'}`} />
                  <div className="flex-1 space-y-1">
                    <div className={`h-2 rounded-sm ${complete ? 'bg-junior-black/20' : 'bg-junior-black/10'}`} style={{ width: `${70 + i * 5}%` }} />
                    <div className="h-1.5 w-1/2 bg-junior-black/10 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GaugeChart({ percentage, label }: { percentage: number; label: string }) {
  // Calculate needle rotation: -90deg (0%) to 90deg (100%)
  const rotation = -90 + (percentage / 100) * 180
  
  return (
    <div className="bg-junior-white border-2 border-junior-black p-2 sm:p-3">
      <svg viewBox="0 0 100 60" className="w-full h-auto">
        {/* Gauge background arc */}
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="3"
          strokeOpacity="0.15"
        />
        {/* Gauge colored arc - shows progress */}
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="#E8392A"
          strokeWidth="3"
          strokeDasharray={`${percentage * 1.26} 126`}
        />
        {/* Needle */}
        <g transform={`rotate(${rotation} 50 55)`}>
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="22"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="55" r="4" fill="#1A1A1A" />
        </g>
        {/* Percentage text */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          className="fill-junior-red font-display text-[10px] sm:text-xs"
          fontWeight="bold"
        >
          {percentage}%
        </text>
      </svg>
      {/* Label placeholder bar */}
      <div className="h-1.5 sm:h-2 w-2/3 mx-auto bg-junior-black/20 rounded-sm mt-1" />
    </div>
  )
}
