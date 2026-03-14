"use client"

export function DashboardIllustration() {
  return (
    <div className="bg-junior-parchment border-2 border-junior-white/30 p-6 md:p-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Checklist */}
        <div className="space-y-4">
          <div className="h-3 w-20 bg-junior-black/40 rounded-sm mb-4" />
          
          {/* Checklist items */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-junior-black bg-junior-red flex items-center justify-center">
                <svg className="w-3 h-3 text-junior-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="h-2 w-full bg-junior-black/20 rounded-sm" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-junior-black bg-junior-red flex items-center justify-center">
                <svg className="w-3 h-3 text-junior-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="h-2 w-3/4 bg-junior-black/20 rounded-sm" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-junior-black bg-junior-red flex items-center justify-center">
                <svg className="w-3 h-3 text-junior-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="h-2 w-5/6 bg-junior-black/20 rounded-sm" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-junior-black bg-junior-white" />
              <div className="h-2 w-2/3 bg-junior-black/20 rounded-sm" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-junior-black bg-junior-white" />
              <div className="h-2 w-4/5 bg-junior-black/20 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Middle column - Timeline */}
        <div className="space-y-4">
          <div className="h-3 w-16 bg-junior-black/40 rounded-sm mb-4" />
          
          {/* Timeline */}
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-junior-black/20" />
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute -left-4 top-1 w-3 h-3 bg-junior-red border-2 border-junior-black rounded-full" />
                <div className="h-2 w-full bg-junior-black/20 rounded-sm mb-1" />
                <div className="h-2 w-2/3 bg-junior-black/10 rounded-sm" />
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-1 w-3 h-3 bg-junior-red border-2 border-junior-black rounded-full" />
                <div className="h-2 w-5/6 bg-junior-black/20 rounded-sm mb-1" />
                <div className="h-2 w-1/2 bg-junior-black/10 rounded-sm" />
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-1 w-3 h-3 bg-junior-white border-2 border-junior-black rounded-full" />
                <div className="h-2 w-3/4 bg-junior-black/20 rounded-sm mb-1" />
                <div className="h-2 w-2/5 bg-junior-black/10 rounded-sm" />
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-1 w-3 h-3 bg-junior-white border-2 border-junior-black/30 rounded-full" />
                <div className="h-2 w-2/3 bg-junior-black/10 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Progress cards */}
        <div className="space-y-4">
          <div className="h-3 w-14 bg-junior-black/40 rounded-sm mb-4" />
          
          {/* Progress card 1 */}
          <div className="bg-junior-white border-2 border-junior-black p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-12 bg-junior-black/30 rounded-sm" />
              <div className="text-junior-red font-display text-sm">75%</div>
            </div>
            <div className="h-2 bg-junior-black/10 rounded-sm overflow-hidden">
              <div className="h-full w-3/4 bg-junior-red" />
            </div>
          </div>

          {/* Progress card 2 */}
          <div className="bg-junior-white border-2 border-junior-black p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-16 bg-junior-black/30 rounded-sm" />
              <div className="text-junior-red font-display text-sm">50%</div>
            </div>
            <div className="h-2 bg-junior-black/10 rounded-sm overflow-hidden">
              <div className="h-full w-1/2 bg-junior-red" />
            </div>
          </div>

          {/* Progress card 3 */}
          <div className="bg-junior-white border-2 border-junior-black p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-10 bg-junior-black/30 rounded-sm" />
              <div className="text-junior-red font-display text-sm">90%</div>
            </div>
            <div className="h-2 bg-junior-black/10 rounded-sm overflow-hidden">
              <div className="h-full w-[90%] bg-junior-red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
