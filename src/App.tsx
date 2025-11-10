import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/layout/Header"
import { Sidebar } from "./components/layout/Sidebar"
import Dashboard from "./pages/Dashboard"
import Items from "./pages/Items"
import Search from "./pages/Search"

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto">
            <div className="p-8">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/items" element={<Items />} />
                <Route path="/search" element={<Search />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
