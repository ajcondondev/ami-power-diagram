import type { DiagramNode } from '../types/diagram'
import { NODES } from '../data/nodes'
import { CONNECTIONS } from '../data/connections'

// ── Visual tokens per category ─────────────────────────────────────────────
const FILL: Record<string, string> = {
  power:      '#1c0a00',
  meter:      '#052e16',
  ami:        '#0c1a3a',
  backoffice: '#1a0533',
}
const STROKE: Record<string, string> = {
  power:      '#d97706',
  meter:      '#16a34a',
  ami:        '#2563eb',
  backoffice: '#7c3aed',
}
const TEXT_COLOR: Record<string, string> = {
  power:      '#fde68a',
  meter:      '#bbf7d0',
  ami:        '#bfdbfe',
  backoffice: '#ddd6fe',
}

// Section background bands (very subtle)
const BANDS = [
  { x: 5,   y: 22, w: 482, h: 548, fill: '#78350f', opacity: 0.10 },
  { x: 492, y: 22, w: 208, h: 548, fill: '#1e3a8a', opacity: 0.10 },
  { x: 705, y: 22, w: 390, h: 548, fill: '#4c1d95', opacity: 0.10 },
]

const SECTION_LABELS = [
  { text: 'POWER PATH',   x: 175, y: 16 },
  { text: 'AMI NETWORK', x: 590, y: 16 },
  { text: 'BACK-OFFICE', x: 893, y: 16 },
]

const METER_LABEL = { text: 'SMART METERS', x: 205, y: 492 }

// ── NodeRect ───────────────────────────────────────────────────────────────
interface NodeRectProps {
  node: DiagramNode
  isSelected: boolean
  isDimmed: boolean
  onClick: () => void
}

function NodeRect({ node, isSelected, isDimmed, onClick }: NodeRectProps) {
  const cx = node.x + node.width / 2
  const cy = node.y + node.height / 2

  return (
    <g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label={node.label}
      opacity={isDimmed ? 0.35 : 1}
    >
      {/* Selection glow ring */}
      {isSelected && (
        <rect
          x={node.x - 4}
          y={node.y - 4}
          width={node.width + 8}
          height={node.height + 8}
          rx={10}
          fill="none"
          stroke={STROKE[node.category]}
          strokeWidth={2}
          opacity={0.45}
        />
      )}

      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={6}
        fill={FILL[node.category]}
        stroke={isSelected ? '#ffffff' : STROKE[node.category]}
        strokeWidth={isSelected ? 2 : 1.5}
      />

      <text
        x={cx}
        y={cy + 4.5}
        textAnchor="middle"
        fill={isSelected ? '#ffffff' : TEXT_COLOR[node.category]}
        fontSize={11.5}
        fontFamily="system-ui, 'Segoe UI', sans-serif"
        fontWeight={isSelected ? 600 : 500}
        letterSpacing={0.2}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.label}
      </text>
    </g>
  )
}

// ── Diagram ────────────────────────────────────────────────────────────────
interface DiagramProps {
  selectedNodeId: string | null
  onNodeClick: (id: string) => void
}

export default function Diagram({ selectedNodeId, onNodeClick }: DiagramProps) {
  const hasSelection = selectedNodeId !== null

  return (
    <div className="flex-1 bg-slate-950 overflow-hidden">
      <svg
        viewBox="0 0 1100 575"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        aria-label="AMI and Power Distribution Architecture Diagram"
      >
        <defs>
          <marker id="arrow-power" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#d97706" />
          </marker>
          <marker id="arrow-data" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.4" />
          </pattern>
        </defs>

        <rect width="1100" height="575" fill="url(#grid)" opacity={0.35} />

        {BANDS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill} opacity={b.opacity} rx={4} />
        ))}

        <line x1={490} y1={5} x2={490} y2={570} stroke="#334155" strokeWidth={1} strokeDasharray="4,4" />
        <line x1={703} y1={5} x2={703} y2={570} stroke="#334155" strokeWidth={1} strokeDasharray="4,4" />

        {SECTION_LABELS.map((l) => (
          <text key={l.text} x={l.x} y={l.y} textAnchor="middle" fill="#475569" fontSize={9}
            fontFamily="system-ui, 'Segoe UI', sans-serif" fontWeight={600} letterSpacing={1.5}>
            {l.text}
          </text>
        ))}

        <text x={METER_LABEL.x} y={METER_LABEL.y} textAnchor="middle" fill="#374151" fontSize={8.5}
          fontFamily="system-ui, 'Segoe UI', sans-serif" fontWeight={600} letterSpacing={1.2}>
          {METER_LABEL.text}
        </text>

        {/* Connections */}
        {CONNECTIONS.map((conn) => (
          <path
            key={conn.id}
            d={conn.path}
            fill="none"
            stroke={conn.flow === 'power' ? '#d97706' : '#3b82f6'}
            strokeWidth={conn.flow === 'power' ? 2 : 1.5}
            strokeDasharray={conn.flow === 'data' ? '6,4' : undefined}
            strokeLinecap="round"
            markerEnd={conn.flow === 'power' ? 'url(#arrow-power)' : 'url(#arrow-data)'}
            opacity={hasSelection ? (conn.flow === 'power' ? 0.25 : 0.2) : (conn.flow === 'power' ? 0.85 : 0.75)}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node) => (
          <NodeRect
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            isDimmed={hasSelection && node.id !== selectedNodeId}
            onClick={() => onNodeClick(node.id)}
          />
        ))}
      </svg>
    </div>
  )
}
