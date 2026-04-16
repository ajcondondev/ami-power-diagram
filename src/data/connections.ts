import type { DiagramConnection } from '../types/diagram'

export const CONNECTIONS: DiagramConnection[] = [
  // ── Power flow (amber, solid) ─────────────────────────────────────────────
  { id: 'p_gen_trans',  flow: 'power', fromId: 'generation',  toId: 'transmission', path: 'M 175 72  L 175 120' },
  { id: 'p_trans_tsub', flow: 'power', fromId: 'transmission', toId: 'trans_sub',   path: 'M 175 162 L 175 210' },
  { id: 'p_tsub_dsub',  flow: 'power', fromId: 'trans_sub',   toId: 'dist_sub',     path: 'M 175 252 L 175 300' },
  { id: 'p_dsub_xfmr',  flow: 'power', fromId: 'dist_sub',    toId: 'transformer',  path: 'M 175 342 L 175 390' },
  { id: 'p_xfmr_res',   flow: 'power', fromId: 'transformer', toId: 'res_meter',    path: 'M 175 432 L 90  500' },
  { id: 'p_xfmr_com',   flow: 'power', fromId: 'transformer', toId: 'com_meter',    path: 'M 175 432 L 240 500' },
  { id: 'p_xfmr_ind',   flow: 'power', fromId: 'transformer', toId: 'ind_meter',    path: 'M 175 432 L 390 500' },

  // ── Data flow (blue, dashed) ──────────────────────────────────────────────
  { id: 'd_res_rf',     flow: 'data',  fromId: 'res_meter',  toId: 'rf_mesh',   path: 'M 160 520 L 515 507' },
  { id: 'd_com_rf',     flow: 'data',  fromId: 'com_meter',  toId: 'rf_mesh',   path: 'M 310 520 L 515 520' },
  { id: 'd_ind_rf',     flow: 'data',  fromId: 'ind_meter',  toId: 'rf_mesh',   path: 'M 460 520 L 515 533' },
  { id: 'd_rf_coll',    flow: 'data',  fromId: 'rf_mesh',    toId: 'collector', path: 'M 590 499 L 590 431' },
  { id: 'd_coll_bkhl',  flow: 'data',  fromId: 'collector',  toId: 'backhaul',  path: 'M 590 389 L 590 341' },
  { id: 'd_bkhl_hes',   flow: 'data',  fromId: 'backhaul',   toId: 'hes',       path: 'M 590 299 L 590 251' },
  { id: 'd_hes_mdms',   flow: 'data',  fromId: 'hes',        toId: 'mdms',      path: 'M 665 230 L 722 230' },
  { id: 'd_mdms_bill',  flow: 'data',  fromId: 'mdms',       toId: 'billing',   path: 'M 878 230 L 902 165' },
  { id: 'd_mdms_oms',   flow: 'data',  fromId: 'mdms',       toId: 'oms',       path: 'M 878 230 L 902 255' },
  { id: 'd_mdms_anlt',  flow: 'data',  fromId: 'mdms',       toId: 'analytics', path: 'M 878 230 L 902 345' },
]
