// src/components/dashboard/AIUsageDashboard.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiService, UsageStats } from '../../services/aiService';
import { DollarSign, Zap, TrendingUp } from 'lucide-react';

export const AIUsageDashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery<UsageStats>({
    queryKey: ['ai-usage-stats'],
    queryFn: () => aiService.getUsageStats(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>Fehler beim Laden der Statistiken</p>
      </div>
    );
  }

  const currentMonth = stats?.current_month;
  const allTime = stats?.all_time;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Aktuelle Monatskosten */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Diesen Monat</h3>
          <DollarSign className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          ${currentMonth?.total_cost?.toFixed(4) || '0.0000'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          KI-Kosten im {new Date().toLocaleString('de-DE', { month: 'long' })}
        </p>
      </div>

      {/* Requests diesen Monat */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Anfragen</h3>
          <Zap className="w-6 h-6 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {currentMonth?.operations?.reduce((sum, op) => sum + parseInt(op.count), 0) || 0}
        </p>
        <p className="text-sm text-gray-500 mt-2">KI-Operationen</p>
      </div>

      {/* Gesamt-Tokens */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Alle Zeit</h3>
          <TrendingUp className="w-6 h-6 text-purple-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {allTime?.total_tokens?.toLocaleString() || 0}
        </p>
        <p className="text-sm text-gray-500 mt-2">Tokens verarbeitet</p>
      </div>

      {/* Operations Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Operations-Übersicht (Monat)</h3>
        {currentMonth?.operations && currentMonth.operations.length > 0 ? (
          <div className="space-y-3">
            {currentMonth.operations.map((op) => (
              <div key={op.operation} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {op.operation.replace(/_/g, ' ')}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{op.count}x</span>
                  <span className="font-semibold text-gray-900">
                    ${parseFloat(op.cost).toFixed(4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
              <Zap className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">Noch keine KI-Operationen in diesem Monat</p>
            <p className="text-sm text-gray-400 mt-1">
              Verwende die KI-Features, um Statistiken zu sehen
            </p>
          </div>
        )}
      </div>

      {/* All Time Stats (Optional Extra Card) */}
      {allTime && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow p-6 md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Gesamt-Statistik</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gesamt Anfragen</p>
              <p className="text-2xl font-bold text-gray-900">
                {allTime.total_requests?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Input Tokens</p>
              <p className="text-2xl font-bold text-gray-900">
                {allTime.total_input_tokens?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Output Tokens</p>
              <p className="text-2xl font-bold text-gray-900">
                {allTime.total_output_tokens?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Gesamt Kosten</p>
              <p className="text-2xl font-bold text-gray-900">
                ${allTime.total_cost?.toFixed(4) || '0.0000'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};