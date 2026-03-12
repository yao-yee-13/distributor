import React from 'react';
import { mockDeals } from '../utils/mockData';

export default function PipelineHealth() {
  const deals = mockDeals.map(d => ({
    ...d,
    daysInStage: Math.floor(Math.random() * 20) + 2
  }));

  const stageStats = {
    'Lead': { count: deals.filter(d => d.stage === 'Lead').length, value: 0, avgDays: 3 },
    'Qualification': { count: deals.filter(d => d.stage === 'Qualification').length, value: 2650, avgDays: 5 },
    'Proposal': { count: deals.filter(d => d.stage === 'Proposal').length, value: 3500, avgDays: 7 },
    'Negotiation': { count: deals.filter(d => d.stage === 'Negotiation').length, value: 4900, avgDays: 6 },
    'Closed Won': { count: deals.filter(d => d.stage === 'Closed Won').length, value: 10400, avgDays: 0 }
  };

  const totalValue = Object.values(stageStats).reduce((sum, s) => sum + (s.value * s.count), 0);
  const weightedRevenue = Object.values(stageStats).reduce((sum, s) => sum + (s.value * s.count * (s.count / (deals.length || 1))), 0);

  return (
    <div className="space-y-6">
      {/* Kanban-style Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {Object.entries(stageStats).map(([stage, stats]) => (
          <div key={stage} className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{stage}</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Deals</p>
                <p className="text-2xl font-bold text-blue-600">{stats.count}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Value</p>
                <p className="text-lg font-bold text-green-600">RM {(stats.value * stats.count / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Avg Days</p>
                <p className="text-lg font-bold text-gray-900">{stats.avgDays}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Total Pipeline Value</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">RM {(totalValue / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Weighted Revenue (Best Case)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">RM {(weightedRevenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Stalled Deals</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{deals.filter(d => d.stage === 'Qualification' || d.stage === 'Proposal').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Avg Stage Duration</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">5.2 days</p>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Active Deals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Deal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stage</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Value</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Probability</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Expected Close</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sales Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Deal {deal.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {deal.value.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700 font-semibold">{deal.probability}%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(deal.expectedCloseDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Agent {deal.salesAgent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
