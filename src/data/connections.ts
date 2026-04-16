import type { DiagramConnection } from '../types/diagram'

// All paths derived from node boundaries in the 1100×575 viewBox.
// Power nodes: cx=175, bottom = y+42
// AMI nodes:   cx=590, top/bottom = y and y+42
// Meters:      centers at (90,520), (240,520), (390,520)

export const CONNECTIONS: DiagramConnection[] = [
  // ── Power flow (amber, solid) ─────────────────────────────────────────────
  // Generation bottom (175,72) → Transmission top (175,120)
  { id: 'p_gen_trans',   flow: 'power', path: 'M 175 72  L 175 120' },
  // Transmission bottom (175,162) → Trans.Sub top (175,210)
  { id: 'p_trans_tsub',  flow: 'power', path: 'M 175 162 L 175 210' },
  // Trans.Sub bottom (175,252) → Dist.Sub top (175,300)
  { id: 'p_tsub_dsub',   flow: 'power', path: 'M 175 252 L 175 300' },
  // Dist.Sub bottom (175,342) → Transformer top (175,390)
  { id: 'p_dsub_xfmr',   flow: 'power', path: 'M 175 342 L 175 390' },
  // Transformer bottom (175,432) → Residential top-center (90,500)
  { id: 'p_xfmr_res',    flow: 'power', path: 'M 175 432 L 90  500' },
  // Transformer bottom → Commercial top-center (240,500)
  { id: 'p_xfmr_com',    flow: 'power', path: 'M 175 432 L 240 500' },
  // Transformer bottom → Industrial top-center (390,500)
  { id: 'p_xfmr_ind',    flow: 'power', path: 'M 175 432 L 390 500' },

  // ── Data flow (blue, dashed) ──────────────────────────────────────────────
  // Meters → RF Mesh: fan into top/mid/bottom of left edge (x=515)
  // Residential right-center (160,520) → RF Mesh upper-left (515,507)
  { id: 'd_res_rf',      flow: 'data',  path: 'M 160 520 L 515 507' },
  // Commercial right-center (310,520) → RF Mesh mid-left (515,520)
  { id: 'd_com_rf',      flow: 'data',  path: 'M 310 520 L 515 520' },
  // Industrial right-center (460,520) → RF Mesh lower-left (515,533)
  { id: 'd_ind_rf',      flow: 'data',  path: 'M 460 520 L 515 533' },
  // RF Mesh top (590,499) → Collector bottom (590,431)
  { id: 'd_rf_coll',     flow: 'data',  path: 'M 590 499 L 590 431' },
  // Collector top (590,389) → Backhaul bottom (590,341)
  { id: 'd_coll_bkhl',   flow: 'data',  path: 'M 590 389 L 590 341' },
  // Backhaul top (590,299) → HES bottom (590,251)
  { id: 'd_bkhl_hes',    flow: 'data',  path: 'M 590 299 L 590 251' },
  // HES right (665,230) → MDMS left (722,230)
  { id: 'd_hes_mdms',    flow: 'data',  path: 'M 665 230 L 722 230' },
  // MDMS right (878,230) → Billing left-center (902,165)
  { id: 'd_mdms_bill',   flow: 'data',  path: 'M 878 230 L 902 165' },
  // MDMS right (878,230) → OMS left-center (902,255)
  { id: 'd_mdms_oms',    flow: 'data',  path: 'M 878 230 L 902 255' },
  // MDMS right (878,230) → Analytics left-center (902,345)
  { id: 'd_mdms_anlt',   flow: 'data',  path: 'M 878 230 L 902 345' },
]
