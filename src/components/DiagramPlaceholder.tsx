export default function DiagramPlaceholder() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Subtle grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Placeholder content */}
      <div className="relative z-10 text-center px-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 3h16.5M3.75 3H2.25M20.25 3h1.5M9 3v4.5m6-4.5v4.5M6 20.25h12" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-300 mb-2">Diagram — Phase 2</h2>
        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
          SVG architecture diagram with power nodes, AMI nodes, and annotated flow arrows will render here.
        </p>

        {/* Node category pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { label: 'Generation', color: 'bg-amber-900/40 text-amber-300 border-amber-700/50' },
            { label: 'Transmission', color: 'bg-orange-900/40 text-orange-300 border-orange-700/50' },
            { label: 'Distribution', color: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50' },
            { label: 'Smart Meters', color: 'bg-green-900/40 text-green-300 border-green-700/50' },
            { label: 'RF Mesh / DCU', color: 'bg-blue-900/40 text-blue-300 border-blue-700/50' },
            { label: 'HES / MDMS', color: 'bg-violet-900/40 text-violet-300 border-violet-700/50' },
            { label: 'Billing / OMS', color: 'bg-slate-700/60 text-slate-300 border-slate-600/50' },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${color}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
