import type { NodeCategory } from '../types/diagram'
import { NODES } from '../data/nodes'
import { NODE_CONTENT } from '../data/nodeContent'

const CATEGORY_BADGE: Record<NodeCategory, string> = {
  power:      'bg-amber-900/50 text-amber-300 border-amber-700/60',
  meter:      'bg-emerald-900/50 text-emerald-300 border-emerald-700/60',
  ami:        'bg-blue-900/50 text-blue-300 border-blue-700/60',
  backoffice: 'bg-violet-900/50 text-violet-300 border-violet-700/60',
}

const ACCENT_BAR: Record<NodeCategory, string> = {
  power:      'bg-amber-500',
  meter:      'bg-emerald-500',
  ami:        'bg-blue-500',
  backoffice: 'bg-violet-500',
}

interface DetailPanelProps {
  selectedNodeId: string | null
  onClose: () => void
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5M12 3v18" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-500">No node selected</p>
      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
        Click any node in the diagram to explore its role, connections, and significance.
      </p>
    </div>
  )
}

export default function DetailPanel({ selectedNodeId, onClose }: DetailPanelProps) {
  const node = selectedNodeId ? NODES.find((n) => n.id === selectedNodeId) ?? null : null
  const content = node ? NODE_CONTENT[node.id] ?? null : null

  return (
    <aside className="w-72 shrink-0 bg-slate-900 border-l border-slate-700 flex flex-col overflow-hidden">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
        <h2 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Node Details
        </h2>
        {node && (
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-400 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {!node || !content ? (
        <EmptyState />
      ) : (
        <>
          {/* Node title block */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-700/60 shrink-0">
            <div className={`w-full h-0.5 rounded mb-3 ${ACCENT_BAR[node.category]}`} />
            <h3 className="text-base font-semibold text-white leading-tight mb-2">
              {content.title}
            </h3>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_BADGE[node.category]}`}>
              {content.categoryLabel}
            </span>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {content.description}
            </p>

            <div className="w-full h-px bg-slate-800" />

            {/* Function / Role */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                Function
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {content.role}
              </p>
            </div>

            {/* Upstream */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                Upstream
              </div>
              <div className="flex flex-wrap gap-1.5">
                {content.upstream.map((u) => (
                  <span key={u} className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    {u}
                  </span>
                ))}
              </div>
            </div>

            {/* Downstream */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                Downstream
              </div>
              <div className="flex flex-wrap gap-1.5">
                {content.downstream.map((d) => (
                  <span key={d} className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Why it matters */}
            <div className="rounded-lg bg-slate-800/60 border border-slate-700/60 px-4 py-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Why It Matters
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {content.whyItMatters}
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
