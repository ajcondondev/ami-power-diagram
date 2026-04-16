import { useState, useMemo } from 'react'
import type { DiagramNode } from '../types/diagram'
import { NODES } from '../data/nodes'
import { CONNECTIONS } from '../data/connections'

// ── Visual tokens ─────────────────────────────────────────────────────────
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

// ── NodeRect ───────────────────────────────────────────────────────────────
interface NodeRectProps {
  node: DiagramNode
  isSelected: boolean
  isConnected: boolean
  isDimmed: boolean
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

function NodeRect({ node, isSelected, isDimmed, isHovered, onMouseEnter, onMouseLeave, onClick }: NodeRectProps) {
  const cx = node.x + node.width / 2
  const cy = node.y + node.height / 2

  return (
    <g
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label={node.label}
      opacity={isDimmed ? 0.3 : 1}
    >
      {/* Hover ring */}
      {isHovered && !isSelected && (
        <rect
          x={node.x - 3} y={node.y - 3}
          width={node.width + 6} height={node.height + 6}
          rx={9} fill="none"
          stroke={STROKE[node.category]}
          strokeWidth={1.5} opacity={0.4}
        />
      )}

      {/* Selection glow ring */}
      {isSelected && (
        <rect
          x={node.x - 5} y={node.y - 5}
          width={node.width + 10} height={node.height + 10}
          rx={11} fill="none"
          stroke={STROKE[node.category]}
          strokeWidth={2.5} opacity={0.4}
        />
      )}

      <rect
        x={node.x} y={node.y}
        width={node.width} height={node.height}
        rx={6}
        fill={FILL[node.category]}
        stroke={isSelected ? '#ffffff' : STROKE[node.category]}
        strokeWidth={isSelected ? 2 : isHovered ? 2 : 1.5}
      />

      <text
        x={cx} y={cy + 4.5}
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
  showPower: boolean
  showData: boolean
}

export default function Diagram({ selectedNodeId, onNodeClick, showPower, showData }: DiagramProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // All node IDs in the "selection neighborhood" (selected + direct neighbors)
  const neighborIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>()
    const ids = new Set<string>([selectedNodeId])
    for (const c of CONNECTIONS) {
      if (c.fromId === selectedNodeId) ids.add(c.toId)
      if (c.toId === selectedNodeId) ids.add(c.fromId)
    }
    return ids
  }, [selectedNodeId])

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
          <marker id="arrow-power-hi" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
          </marker>
          <marker id="arrow-data" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker id="arrow-data-hi" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.4" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="1100" height="575" fill="url(#grid)" opacity={0.35} />
        {BANDS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill} opacity={b.opacity} rx={4} />
        ))}

        {/* Section separators */}
        <line x1={490} y1={5} x2={490} y2={570} stroke="#334155" strokeWidth={1} strokeDasharray="4,4" />
        <line x1={703} y1={5} x2={703} y2={570} stroke="#334155" strokeWidth={1} strokeDasharray="4,4" />

        {/* Section labels */}
        {SECTION_LABELS.map((l) => (
          <text key={l.text} x={l.x} y={l.y} textAnchor="middle" fill="#475569"
            fontSize={9} fontFamily="system-ui, 'Segoe UI', sans-serif" fontWeight={600} letterSpacing={1.5}>
            {l.text}
          </text>
        ))}
        <text x={205} y={492} textAnchor="middle" fill="#374151"
          fontSize={8.5} fontFamily="system-ui, 'Segoe UI', sans-serif" fontWeight={600} letterSpacing={1.2}>
          SMART METERS
        </text>

        {/* Connections */}
        {CONNECTIONS.map((conn) => {
          if (conn.flow === 'power' && !showPower) return null
          if (conn.flow === 'data'  && !showData)  return null

          const isRelated = selectedNodeId !== null
            && (conn.fromId === selectedNodeId || conn.toId === selectedNodeId)

          const opacity = selectedNodeId
            ? (isRelated ? 1 : 0.06)
            : (conn.flow === 'power' ? 0.85 : 0.75)

          const strokeWidth = isRelated
            ? (conn.flow === 'power' ? 2.75 : 2.25)
            : (conn.flow === 'power' ? 2 : 1.5)

          const stroke = isRelated
            ? (conn.flow === 'power' ? '#fbbf24' : '#60a5fa')
            : (conn.flow === 'power' ? '#d97706' : '#3b82f6')

          const markerEnd = conn.flow === 'power'
            ? (isRelated ? 'url(#arrow-power-hi)' : 'url(#arrow-power)')
            : (isRelated ? 'url(#arrow-data-hi)' : 'url(#arrow-data)')

          return (
            <path
              key={conn.id}
              d={conn.path}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={conn.flow === 'data' ? '6,4' : undefined}
              strokeLinecap="round"
              markerEnd={markerEnd}
              opacity={opacity}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const isSelected  = node.id === selectedNodeId
          const isConnected = neighborIds.has(node.id)
          const isDimmed    = selectedNodeId !== null && !isConnected
          const isHovered   = hoveredId === node.id

          return (
            <NodeRect
              key={node.id}
              node={node}
              isSelected={isSelected}
              isConnected={isConnected}
              isDimmed={isDimmed}
              isHovered={isHovered && !isSelected}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onNodeClick(node.id)}
            />
          )
        })}
      </svg>
    </div>
  )
}
