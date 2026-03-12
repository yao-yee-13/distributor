import React, { useState } from 'react';
import { TrendingUp, Users, Package, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { mockProducts, mockSalesAgents, mockPartners, mockLeads, mockDeals } from '../utils/mockData';

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalRevenue = 187000;
  const activeCustomers = 24;
  const newLeadsToday = 3;
  const conversionRate = 28.5;
  const commissionEarned = 27400;
  const activeCases = 5;

  const salesTeamLeaderboard = mockSalesAgents
    .filter(agent => agent.status === 'Active')
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const activeLeads = mockLeads.filter(l => l.status !== 'Lost' && l.status !== 'Customer').length;
  const customerLeads = mockLeads.filter(l => l.status === 'Customer').length;
  const lostLeads = mockLeads.filter(l => l.status === 'Lost').length;

  const partnerUtilization = mockPartners
    .filter(p => p.status === 'Active')
    .reduce((sum, p) => sum + p.activeCases, 0);

  return (
    <div className="space-y-8">
      {/* Time Period & Category Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-lg font-medium text-sm transition ${timePeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`} onClick={() => setTimePeriod('week')}>This Week</button>
          <button className={`px-4 py-2 rounded-lg font-medium text-sm transition ${timePeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`} onClick={() => setTimePeriod('month')}>This Month</button>
          <button className={`px-4 py-2 rounded-lg font-medium text-sm transition ${timePeriod === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`} onClick={() => setTimePeriod('quarter')}>This Quarter</button>
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="it">IT</option>
          <option value="services">Services</option>
          <option value="property">Property</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Total Revenue (MTD)</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 12% vs last month</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Active Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeCustomers}</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 4 new this month</p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">New Leads Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{newLeadsToday}</p>
              <p className="text-sm text-blue-600 font-medium mt-2">{activeLeads} active leads</p>
            </div>
            <AlertCircle className="text-orange-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{conversionRate}%</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 2.3% vs last month</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Commission Earned (MTD)</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {commissionEarned.toLocaleString()}</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 18% vs last month</p>
            </div>
            <DollarSign className="text-indigo-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Active Cases</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeCases}</p>
              <p className="text-sm text-gray-600 font-medium mt-2">In delivery/fulfillment</p>
            </div>
            <CheckCircle className="text-cyan-500" size={32} />
          </div>
        </div>
      </div>

      {/* Sales Team Leaderboard */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Sales Team Performance (MTD)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesTeamLeaderboard.map((agent, idx) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">#{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.dealsClosed}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {agent.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {agent.commissionEarned.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads & Partners Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Leads Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Leads</span>
              <span className="text-2xl font-bold text-blue-600">{activeLeads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Converted to Customer</span>
              <span className="text-2xl font-bold text-green-600">{customerLeads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lost Leads</span>
              <span className="text-2xl font-bold text-red-600">{lostLeads}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Partner Network</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Partners</span>
              <span className="text-2xl font-bold text-blue-600">{mockPartners.filter(p => p.status === 'Active').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cases in Progress</span>
              <span className="text-2xl font-bold text-orange-600">{partnerUtilization}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Completion Rate</span>
              <span className="text-2xl font-bold text-green-600">96%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Case Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="text-2xl font-bold text-yellow-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In Progress</span>
              <span className="text-2xl font-bold text-blue-600">{activeCases}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed</span>
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
