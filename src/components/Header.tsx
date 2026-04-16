export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-8 py-5 flex items-center justify-between shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
            Eversource Energy
          </span>
        </div>
        <h1 className="text-xl font-semibold text-white leading-tight">
          AMI &amp; Power Distribution Architecture
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Interactive infrastructure diagram — power flow &amp; data flow
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 bg-amber-400" />
          Power Flow
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 bg-blue-400 border-dashed" style={{ borderTop: '2px dashed #60a5fa', height: 0 }} />
          Data Flow
        </span>
        <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">
          Click a node to explore
        </span>
      </div>
    </header>
  )
}
