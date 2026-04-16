export default function Legend() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 px-8 py-3 flex items-center gap-8 shrink-0">
      <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Legend</span>

      <div className="flex items-center gap-6 text-xs text-slate-400">
        {/* Flow types */}
        <span className="flex items-center gap-2">
          <span className="block w-8 h-0.5 bg-amber-400 rounded" />
          Power flow
        </span>
        <span className="flex items-center gap-2">
          <svg width="32" height="4" viewBox="0 0 32 4">
            <line x1="0" y1="2" x2="32" y2="2" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,3" />
          </svg>
          Data flow
        </span>

        <span className="w-px h-4 bg-slate-700" />

        {/* Node categories */}
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-amber-500/70" />
          Power infrastructure
        </span>
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-blue-500/70" />
          AMI network
        </span>
        <span className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-sm bg-violet-500/70" />
          Back-office systems
        </span>
      </div>

      <div className="ml-auto text-xs text-slate-700">Phase 1 — Shell</div>
    </footer>
  )
}
