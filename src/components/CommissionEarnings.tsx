import React, { useState } from 'react';
import { Download, TrendingUp } from 'lucide-react';
import { mockSalesAgents, mockPartners, mockProducts } from '../utils/mockData';

export default function CommissionEarnings() {
  const [viewType, setViewType] = useState<'summary' | 'product' | 'agent' | 'partner'>('summary');

  const totalEarned = 27400;
  const totalPending = 12300;
  const totalProjected = 18500;

  const productCommissions = [
    { product: 'Advanced Excel Training', earned: 7200, pending: 2400, projected: 3600 },
    { product: 'Leadership Development', earned: 12000, pending: 5000, projected: 8000 },
    { product: 'Property Investment', earned: 6300, pending: 3200, projected: 4500 },
    { product: 'Digital Marketing', earned: 1900, pending: 1700, projected: 2400 }
  ];

  const agentCommissions = mockSalesAgents
    .filter(a => a.status === 'Active')
    .map(a => ({
      name: a.name,
      deals: a.dealsClosed,
      revenue: a.revenue,
      earned: a.commissionEarned,
      pending: Math.round(a.revenue * 0.1),
      projected: Math.round(a.revenue * 0.15)
    }))
    .sort((a, b) => b.earned - a.earned);

  const partnerCommissions = mockPartners
    .filter(p => p.status === 'Active')
    .map(p => ({
      name: p.name,
      cases: p.completedCases,
      earned: p.completedCases * 250,
      pending: p.activeCases * 200,
      projected: (p.completedCases + p.activeCases) * 150
    }))
    .sort((a, b) => b.earned - a.earned);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Commission Earned</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {totalEarned.toLocaleString()}</p>
              <p className="text-sm text-green-600 font-medium mt-2">Paid + Completed</p>
            </div>
            <div className="text-4xl font-bold text-green-600">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Commission Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {totalPending.toLocaleString()}</p>
              <p className="text-sm text-orange-600 font-medium mt-2">Awaiting payment</p>
            </div>
            <div className="text-4xl font-bold text-orange-600">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Projected Commission</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {totalProjected.toLocaleString()}</p>
              <p className="text-sm text-blue-600 font-medium mt-2">From active deals</p>
            </div>
            <div className="text-4xl font-bold text-blue-600">📈</div>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setViewType('summary')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'summary' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          Summary
        </button>
        <button
          onClick={() => setViewType('product')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'product' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          By Product
        </button>
        <button
          onClick={() => setViewType('agent')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'agent' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          By Sales Agent
        </button>
        <button
          onClick={() => setViewType('partner')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${viewType === 'partner' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
        >
          By Partner
        </button>
      </div>

      {/* Summary View */}
      {viewType === 'summary' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Commission Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Current Month Revenue</p>
                <p className="text-2xl font-bold text-gray-900">RM 187,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Average Commission Rate</p>
                <p className="text-2xl font-bold text-blue-600">14.6%</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Vs Last Month</p>
                <p className="text-2xl font-bold text-green-600">↑ 18%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Vs Same Period Last Year</p>
                <p className="text-2xl font-bold text-green-600">↑ 34%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* By Product View */}
      {viewType === 'product' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Commission by Product</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Earned</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Pending</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Projected</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productCommissions.map(item => (
                  <tr key={item.product} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.product}</td>
                    <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {item.earned}</td>
                    <td className="px-6 py-4 text-sm text-right text-orange-600 font-semibold">RM {item.pending}</td>
                    <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">RM {item.projected}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-bold">RM {item.earned + item.pending + item.projected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* By Agent View */}
      {viewType === 'agent' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Commission by Sales Agent</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Agent</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Earned</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Pending</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {agentCommissions.map(item => (
                  <tr key={item.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-700">{item.deals}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {item.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {item.earned}</td>
                    <td className="px-6 py-4 text-sm text-right text-orange-600 font-semibold">RM {item.pending}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-bold">RM {item.earned + item.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* By Partner View */}
      {viewType === 'partner' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Commission by Partner</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Partner</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Cases</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Earned</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Pending</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Projected</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partnerCommissions.map(item => (
                  <tr key={item.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-700">{item.cases}</td>
                    <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {item.earned}</td>
                    <td className="px-6 py-4 text-sm text-right text-orange-600 font-semibold">RM {item.pending}</td>
                    <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">RM {item.projected}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-bold">RM {item.earned + item.pending + item.projected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2">
          <Download size={18} /> Export as Excel
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2">
          <Download size={18} /> Export as PDF
        </button>
      </div>
    </div>
  );
}
