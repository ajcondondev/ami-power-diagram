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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
        {label}
      </div>
      {children}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 text-center">
      <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-500">No node selected</p>
      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-[180px]">
        Click any node in the diagram to explore its role, connections, and significance.
      </p>
    </div>
  )
}

export default function DetailPanel({ selectedNodeId, onClose }: DetailPanelProps) {
  const node    = selectedNodeId ? NODES.find((n) => n.id === selectedNodeId) ?? null : null
  const content = node ? NODE_CONTENT[node.id] ?? null : null

  return (
    <aside className="w-72 shrink-0 bg-slate-900 border-l border-slate-700 flex flex-col overflow-hidden">
      {/* Panel header */}
      <div className="px-5 py-3.5 border-b border-slate-700 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Node Details
        </span>
        {node && (
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-600 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="Deselect node"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {!node || !content ? (
        <EmptyState />
      ) : (
        // key forces remount on node change, triggering the entrance animation
        <div key={selectedNodeId} className="flex flex-col flex-1 overflow-hidden anim-fade-in">
          {/* Node identity block */}
          <div className="px-5 pt-4 pb-3.5 border-b border-slate-700/50 shrink-0">
            <div className={`h-0.5 w-10 rounded-full mb-3 ${ACCENT_BAR[node.category]}`} />
            <h3 className="text-[15px] font-semibold text-white leading-snug mb-2">
              {content.title}
            </h3>
            <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border font-medium ${CATEGORY_BADGE[node.category]}`}>
              {content.categoryLabel}
            </span>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-4">

            {/* Description */}
            <p className="text-[13px] text-slate-300 leading-relaxed">
              {content.description}
            </p>

            <div className="h-px bg-slate-800/80" />

            {/* Function */}
            <Section label="Function">
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {content.role}
              </p>
            </Section>

            {/* Upstream */}
            <Section label="Upstream">
              <div className="flex flex-wrap gap-1.5">
                {content.upstream.map((u) => (
                  <span key={u} className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-slate-400 leading-relaxed">
                    {u}
                  </span>
                ))}
              </div>
            </Section>

            {/* Downstream */}
            <Section label="Downstream">
              <div className="flex flex-wrap gap-1.5">
                {content.downstream.map((d) => (
                  <span key={d} className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-slate-400 leading-relaxed">
                    {d}
                  </span>
                ))}
              </div>
            </Section>

            {/* Why it matters */}
            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Why It Matters
              </div>
              <p className="text-[13px] text-slate-300 leading-relaxed">
                {content.whyItMatters}
              </p>
            </div>

            {/* Key Concepts */}
            {content.concepts && content.concepts.length > 0 && (
              <>
                <div className="h-px bg-slate-800/80" />
                <Section label="Key Concepts">
                  <div className="space-y-3">
                    {content.concepts.map((c) => (
                      <div key={c.title} className="rounded-md bg-slate-800/40 border border-slate-700/40 px-3 py-2.5">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                          {c.title}
                        </div>
                        <p className="text-[12px] text-slate-400 leading-relaxed">
                          {c.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {/* Bottom breathing room */}
            <div className="h-2" />
          </div>
        </div>
      )}
    </aside>
  )
}
