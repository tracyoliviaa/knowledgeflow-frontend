

import { Header } from "../components/layout/Header"
import { Sidebar } from "../components/layout/Sidebar"
import "@/src/index.css"

export default function Page() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome to KnowledgeFlow</h1>
            <p className="text-slate-600 mb-8">
              Manage your knowledge base efficiently. Use the navigation to get started.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-2">Dashboard</h2>
                <p className="text-sm text-slate-600">View your knowledge base overview and statistics.</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-2">Items</h2>
                <p className="text-sm text-slate-600">Browse and manage all items in your knowledge base.</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-2">Search</h2>
                <p className="text-sm text-slate-600">Quickly find what you need across your knowledge base.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
