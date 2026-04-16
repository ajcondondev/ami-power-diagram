import './App.css'
import Header from './components/Header'
import DiagramPlaceholder from './components/DiagramPlaceholder'
import DetailPanel from './components/DetailPanel'
import Legend from './components/Legend'

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <DiagramPlaceholder />
        <DetailPanel />
      </div>

      <Legend />
    </div>
  )
}
