import React from "react";
import { AIUsageDashboard } from "../components/dashboard/AIUsageDashboard";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Welcome to KnowledgeFlow
      </h1>
      <p className="text-slate-600 mb-8">
        Manage your knowledge base efficiently.
      </p>

      {/* AI Usage Statistics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          KI-Nutzungsstatistik
        </h2>
        <AIUsageDashboard />
      </div>

      {/* Quick Actions Grid */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Schnellzugriff
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/items"
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Items</h2>
            </div>
            <p className="text-slate-600 text-sm">
              Browse and manage all items in your knowledge base.
            </p>
          </a>

          <a
            href="/search"
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Search</h2>
            </div>
            <p className="text-slate-600 text-sm">
              Quickly find what you need across your knowledge base.
            </p>
          </a>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                KI-Features
              </h2>
            </div>
            <p className="text-slate-600 text-sm">
              Use AI to summarize, create flashcards, and extract insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;