import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Diagram from './components/Diagram'
import DetailPanel from './components/DetailPanel'
import Legend from './components/Legend'

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const handleNodeClick = (id: string) => {
    setSelectedNodeId((prev) => (prev === id ? null : id))
  }

  const handleClose = () => setSelectedNodeId(null)

  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Diagram selectedNodeId={selectedNodeId} onNodeClick={handleNodeClick} />
        <DetailPanel selectedNodeId={selectedNodeId} onClose={handleClose} />
      </div>

      <Legend />
    </div>
  )
}
