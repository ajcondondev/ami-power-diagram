import './App.css'
import Header from './components/Header'
import Diagram from './components/Diagram'
import DetailPanel from './components/DetailPanel'
import Legend from './components/Legend'

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Diagram />
        <DetailPanel />
      </div>

      <Legend />
    </div>
  )
}
