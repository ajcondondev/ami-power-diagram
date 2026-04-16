import type { DiagramNode } from '../types/diagram'

// ViewBox: 0 0 1100 575
// Power column center x=175 (w=160, h=42)
// Meter row y=500 (h=40)
// AMI column center x=590 (w=150, h=42)
// Back-office right section (w=156, h=40)

export const NODES: DiagramNode[] = [
  // ── Power infrastructure ────────────────────────────────────────────────────
  { id: 'generation',   label: 'Generation',       category: 'power',      x: 95,  y: 30,  width: 160, height: 42 },
  { id: 'transmission', label: 'Transmission',      category: 'power',      x: 95,  y: 120, width: 160, height: 42 },
  { id: 'trans_sub',    label: 'Trans. Substation', category: 'power',      x: 95,  y: 210, width: 160, height: 42 },
  { id: 'dist_sub',     label: 'Dist. Substation',  category: 'power',      x: 95,  y: 300, width: 160, height: 42 },
  { id: 'transformer',  label: 'Transformer',       category: 'power',      x: 95,  y: 390, width: 160, height: 42 },

  // ── Smart meters ────────────────────────────────────────────────────────────
  { id: 'res_meter',    label: 'Residential Meter', category: 'meter',      x: 20,  y: 500, width: 140, height: 40 },
  { id: 'com_meter',    label: 'Commercial Meter',  category: 'meter',      x: 170, y: 500, width: 140, height: 40 },
  { id: 'ind_meter',    label: 'Industrial Meter',  category: 'meter',      x: 320, y: 500, width: 140, height: 40 },

  // ── AMI network ─────────────────────────────────────────────────────────────
  { id: 'rf_mesh',      label: 'RF Mesh',           category: 'ami',        x: 515, y: 499, width: 150, height: 42 },
  { id: 'collector',    label: 'Collector / DCU',   category: 'ami',        x: 515, y: 389, width: 150, height: 42 },
  { id: 'backhaul',     label: 'Backhaul',          category: 'ami',        x: 515, y: 299, width: 150, height: 42 },
  { id: 'hes',          label: 'HES',               category: 'ami',        x: 515, y: 209, width: 150, height: 42 },

  // ── Back-office systems ──────────────────────────────────────────────────────
  { id: 'mdms',         label: 'MDMS',              category: 'backoffice', x: 722, y: 210, width: 156, height: 40 },
  { id: 'billing',      label: 'Billing',           category: 'backoffice', x: 902, y: 145, width: 156, height: 40 },
  { id: 'oms',          label: 'Outage Management', category: 'backoffice', x: 902, y: 235, width: 156, height: 40 },
  { id: 'analytics',    label: 'Analytics',         category: 'backoffice', x: 902, y: 325, width: 156, height: 40 },
]
