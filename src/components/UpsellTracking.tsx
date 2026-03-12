import React from 'react';
import { mockSalesAgents, mockProducts } from '../utils/mockData';

export default function UpsellTracking() {
  const upsellConversion = 34.5;
  const upsellRevenue = 18600;
  const aovWithoutUpsell = 2800;
  const aovWithUpsell = 3600;
  const uplift = ((aovWithUpsell - aovWithoutUpsell) / aovWithoutUpsell) * 100;

  const upsoldProducts = [
    { product: 'Leadership Development', times: 8, revenue: 8000 },
    { product: 'Advanced Excel Training', times: 12, revenue: 4800 },
    { product: 'Digital Marketing', times: 5, revenue: 3200 },
    { product: 'Property Investment Consulting', times: 3, revenue: 2600 }
  ];

  const agentUpsells = mockSalesAgents.filter(a => a.status === 'Active').map(a => ({
    name: a.name,
    dealsWithUpsell: Math.floor(a.dealsClosed * (Math.random() * 0.4 + 0.2)),
    upsellRevenue: Math.floor(Math.random() * 4000 + 1000),
    upsellRate: (Math.random() * 40 + 20).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Upsell Conversion Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{upsellConversion}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Upsell Revenue (MTD)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">RM {(upsellRevenue / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">AOV without Upsell</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">RM {aovWithoutUpsell}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">AOV Uplift</p>
          <p className="text-3xl font-bold text-green-600 mt-2">↑ {uplift.toFixed(1)}%</p>
        </div>
      </div>

      {/* Upsold Products */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Top Upsold Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Times Upsold</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Upsell Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {upsoldProducts.map(item => (
                <tr key={item.product} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.product}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700 font-semibold">{item.times}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upsell by Agent */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Upsell Performance by Sales Agent</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Agent</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals with Upsell</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Upsell Revenue</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Upsell Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agentUpsells.sort((a, b) => parseFloat(b.upsellRate) - parseFloat(a.upsellRate)).map(item => (
                <tr key={item.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700 font-semibold">{item.dealsWithUpsell}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {item.upsellRevenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600">{item.upsellRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
