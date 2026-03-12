import React from 'react';
import { mockProducts } from '../utils/mockData';

export default function ProductSalesAnalysis() {
  const products = mockProducts.map(p => ({
    ...p,
    unitsSold: Math.floor(Math.random() * 30) + 5,
    conversionRate: (Math.random() * 30 + 15).toFixed(1)
  }));

  const totalRevenue = products.reduce((sum, p) => sum + (p.unitsSold * p.yourPrice), 0);

  const sorted = [...products].sort((a, b) => (b.unitsSold * b.yourPrice) - (a.unitsSold * a.yourPrice));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">RM {(totalRevenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Total Units Sold</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{products.reduce((s, p) => s + p.unitsSold, 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Top Product</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{sorted[0]?.name || 'N/A'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Avg Conversion</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">{(products.reduce((s, p) => s + parseFloat(p.conversionRate), 0) / products.length).toFixed(1)}%</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Product Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Units Sold</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Unit Price</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">% of Total</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sorted.map(product => {
                const revenue = product.unitsSold * product.yourPrice;
                const percentage = (revenue / totalRevenue) * 100;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-700 font-semibold">{product.unitsSold}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-700">RM {product.yourPrice}</td>
                    <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">RM {revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-700 font-semibold">{percentage.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">{product.conversionRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bundle Opportunities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Bought Together</h3>
        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900">Excel + Leadership Package</span>
            <span className="text-green-600 font-bold">5 times</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900">Digital Marketing + Excel</span>
            <span className="text-green-600 font-bold">3 times</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900">Property + Finance Consulting</span>
            <span className="text-green-600 font-bold">2 times</span>
          </div>
        </div>
      </div>
    </div>
  );
}
