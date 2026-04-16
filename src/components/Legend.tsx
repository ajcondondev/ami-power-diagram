export default function Legend() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 px-8 py-3 flex items-center gap-8 shrink-0 overflow-x-auto">
      <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest shrink-0">Legend</span>

      <div className="flex items-center gap-5 text-xs text-slate-400 shrink-0">
        {/* Flow types */}
        <span className="flex items-center gap-2">
          <svg width="28" height="4" viewBox="0 0 28 4">
            <line x1="0" y1="2" x2="28" y2="2" stroke="#d97706" strokeWidth="2" />
            <polygon points="22 0, 28 2, 22 4" fill="#d97706" />
          </svg>
          Power flow
        </span>
        <span className="flex items-center gap-2">
          <svg width="28" height="4" viewBox="0 0 28 4">
            <line x1="0" y1="2" x2="22" y2="2" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />
            <polygon points="22 0, 28 2, 22 4" fill="#3b82f6" />
          </svg>
          Data flow
        </span>
      </div>

      <span className="w-px h-4 bg-slate-700 shrink-0" />

      <div className="flex items-center gap-5 text-xs text-slate-400 shrink-0">
        {/* Node categories */}
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-amber-600/80" />
          Power infrastructure
        </span>
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-emerald-600/80" />
          Smart meters
        </span>
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-blue-600/80" />
          AMI network
        </span>
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-violet-600/80" />
          Back-office systems
        </span>
      </div>

      <span className="w-px h-4 bg-slate-700 shrink-0" />

      <span className="text-xs text-slate-600 shrink-0">Click any node to explore · Click again to deselect</span>
    </footer>
  )
}
