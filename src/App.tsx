import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Diagram from './components/Diagram'
import DetailPanel from './components/DetailPanel'
import Legend from './components/Legend'

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [showPower, setShowPower] = useState(true)
  const [showData, setShowData]   = useState(true)

  const handleNodeClick = (id: string) => {
    setSelectedNodeId((prev) => (prev === id ? null : id))
  }

  const handleReset = () => {
    setSelectedNodeId(null)
    setShowPower(true)
    setShowData(true)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans overflow-hidden">
      <Header
        showPower={showPower}
        showData={showData}
        onTogglePower={() => setShowPower((v) => !v)}
        onToggleData={() => setShowData((v) => !v)}
        onReset={handleReset}
        hasSelection={selectedNodeId !== null}
      />

      <div className="flex flex-1 overflow-hidden">
        <Diagram
          selectedNodeId={selectedNodeId}
          onNodeClick={handleNodeClick}
          showPower={showPower}
          showData={showData}
        />
        <DetailPanel selectedNodeId={selectedNodeId} onClose={() => setSelectedNodeId(null)} />
      </div>

      <Legend />
    </div>
  )
}
