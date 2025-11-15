// src/components/dashboard/AIUsageDashboard.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiService } from '../../services/aiService';
import { DollarSign, Zap, TrendingUp } from 'lucide-react';

export const AIUsageDashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['ai-usage-stats'],
    queryFn: () => aiService.getUsageStats(),
  });

  if (isLoading) {
    return <div>Lade Statistiken...</div>;
  }

  const currentMonth = stats?.current_month || {};
  const allTime = stats?.all_time || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Aktuelle Monatskosten */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Diesen Monat</h3>
          <DollarSign className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          ${currentMonth.total_cost?.toFixed(4) || '0.00'}
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
          {currentMonth.operations?.reduce((sum: number, op: any) => sum + parseInt(op.count), 0) || 0}
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
          {allTime.total_tokens?.toLocaleString() || 0}
        </p>
        <p className="text-sm text-gray-500 mt-2">Tokens verarbeitet</p>
      </div>

      {/* Operations Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Operations-Übersicht (Monat)</h3>
        <div className="space-y-3">
          {currentMonth.operations?.map((op: any) => (
            <div key={op.operation} className="flex items-center justify-between">
              <span className="text-gray-700 capitalize">{op.operation.replace('_', ' ')}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{op.count}x</span>
                <span className="font-semibold text-gray-900">
                  ${parseFloat(op.cost).toFixed(4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};