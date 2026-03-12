import React, { useState } from 'react';
import { mockSalesAgents, mockProducts } from '../utils/mockData';

export default function SalesTargets() {
  const [viewType, setViewType] = useState<'team' | 'product' | 'individual'>('team');

  const teamTarget = 250000;
  const teamActual = 187000;
  const teamProgress = (teamActual / teamTarget) * 100;

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewType('team')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'team' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          Team Target
        </button>
        <button
          onClick={() => setViewType('product')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'product' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          Product Goals
        </button>
        <button
          onClick={() => setViewType('individual')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'individual' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          Individual KPIs
        </button>
      </div>

      {/* Team Target */}
      {viewType === 'team' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Team Revenue Target (This Month)</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Target</p>
                  <p className="text-2xl font-bold text-gray-900">RM {(teamTarget / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Actual</p>
                  <p className="text-2xl font-bold text-blue-600">RM {(teamActual / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining</p>
                  <p className="text-2xl font-bold text-orange-600">RM {((teamTarget - teamActual) / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-gray-900">{teamProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${Math.min(teamProgress, 100)}%` }}
                  />
                </div>
              </div>

              <p className={`text-sm font-medium ${teamProgress >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                {teamProgress >= 100
                  ? `✓ Target achieved! ${(teamActual - teamTarget).toLocaleString()} ahead`
                  : `${((teamTarget - teamActual) / teamTarget * 100).toFixed(1)}% below target`
                }
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Team Members Target Progress</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Agent</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Target</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actual</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Progress</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockSalesAgents.filter(a => a.status === 'Active').map(agent => {
                    const target = agent.monthlyTarget || 50000;
                    const progress = (agent.revenue / target) * 100;
                    return (
                      <tr key={agent.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {target.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">RM {agent.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">{progress.toFixed(1)}%</td>
                        <td className="px-6 py-4 text-sm text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            progress >= 100 ? 'bg-green-100 text-green-800' :
                            progress >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {progress >= 100 ? 'Achieved' : progress >= 80 ? 'On Track' : 'Behind'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Product Goals */}
      {viewType === 'product' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Product Sales Goals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Target Units</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actual Units</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">% Achieved</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Target Revenue</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actual Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockProducts.map(product => {
                  const targetUnits = 20;
                  const actualUnits = Math.floor(Math.random() * 20) + 5;
                  const targetRevenue = targetUnits * product.yourPrice;
                  const actualRevenue = actualUnits * product.yourPrice;
                  const progress = (actualUnits / targetUnits) * 100;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{targetUnits}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">{actualUnits}</td>
                      <td className="px-6 py-4 text-sm text-right">
                        <span className={`font-semibold ${progress >= 100 ? 'text-green-600' : progress >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {progress.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">RM {targetRevenue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">RM {actualRevenue.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Individual KPIs */}
      {viewType === 'individual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockSalesAgents.filter(a => a.status === 'Active').map(agent => {
            const target = agent.monthlyTarget || 50000;
            const progress = (agent.revenue / target) * 100;
            return (
              <div key={agent.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{agent.name}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Revenue Target</p>
                      <p className="text-2xl font-bold text-gray-900">RM {(target / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">RM {(agent.revenue / 1000).toFixed(0)}K</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-gray-900">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm text-gray-600">Deals Closed</p>
                      <p className="text-lg font-bold text-gray-900">{agent.dealsClosed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-lg font-bold text-green-600">{agent.conversionRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
