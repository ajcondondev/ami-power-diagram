interface HeaderProps {
  showPower: boolean
  showData: boolean
  onTogglePower: () => void
  onToggleData: () => void
  onReset: () => void
  hasSelection: boolean
}

export default function Header({ showPower, showData, onTogglePower, onToggleData, onReset, hasSelection }: HeaderProps) {
  const canReset = hasSelection || !showPower || !showData

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-8 py-4 flex items-center justify-between shrink-0">
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

      <div className="hidden sm:flex items-center gap-2">
        {/* Power flow toggle */}
        <button
          onClick={onTogglePower}
          title={showPower ? 'Hide power flow' : 'Show power flow'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium transition-colors duration-150
            ${showPower
              ? 'bg-amber-950/50 border-amber-700/60 text-amber-300 hover:bg-amber-950/70'
              : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400 hover:border-slate-600'
            }`}
        >
          <span className={`block w-5 h-0.5 rounded-full ${showPower ? 'bg-amber-400' : 'bg-slate-600'}`} />
          Power flow
        </button>

        {/* Data flow toggle */}
        <button
          onClick={onToggleData}
          title={showData ? 'Hide data flow' : 'Show data flow'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium transition-colors duration-150
            ${showData
              ? 'bg-blue-950/50 border-blue-700/60 text-blue-300 hover:bg-blue-950/70'
              : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400 hover:border-slate-600'
            }`}
        >
          <svg width="20" height="4" viewBox="0 0 20 4" className="shrink-0">
            <line x1="0" y1="2" x2="20" y2="2"
              stroke={showData ? '#60a5fa' : '#475569'}
              strokeWidth="2"
              strokeDasharray="5,3"
            />
          </svg>
          Data flow
        </button>

        <span className="w-px h-5 bg-slate-700 mx-1" />

        {/* Reset */}
        <button
          onClick={onReset}
          disabled={!canReset}
          title="Reset view"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium transition-colors duration-150
            ${canReset
              ? 'bg-slate-800 border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              : 'bg-slate-900 border-slate-800 text-slate-700 cursor-not-allowed'
            }`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Reset
        </button>
      </div>
    </header>
  )
}
