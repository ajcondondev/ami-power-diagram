export default function DetailPanel() {
  return (
    <aside className="w-72 shrink-0 bg-slate-900 border-l border-slate-700 flex flex-col">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-slate-700">
        <h2 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Node Details
        </h2>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-500">No node selected</p>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Click any node in the diagram to view its role, connections, and significance.
        </p>
      </div>

      {/* Placeholder sections */}
      <div className="px-5 pb-5 space-y-3">
        {['Role', 'Upstream', 'Downstream', 'Why it matters'].map((label) => (
          <div key={label} className="rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3">
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              {label}
            </div>
            <div className="h-2.5 rounded bg-slate-700/60 w-3/4" />
          </div>
        ))}
      </div>
    </aside>
  )
}
