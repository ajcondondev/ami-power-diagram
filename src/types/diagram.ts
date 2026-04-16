export type NodeCategory = 'power' | 'meter' | 'ami' | 'backoffice'
export type FlowType = 'power' | 'data'

export interface DiagramNode {
  id: string
  label: string
  category: NodeCategory
  x: number
  y: number
  width: number
  height: number
}

export interface DiagramConnection {
  id: string
  flow: FlowType
  path: string
  fromId: string
  toId: string
}

export interface NodeConcept {
  title: string
  content: string
}

export interface NodeContent {
  title: string
  categoryLabel: string
  description: string
  role: string
  upstream: string[]
  downstream: string[]
  whyItMatters: string
  concepts?: NodeConcept[]
}
