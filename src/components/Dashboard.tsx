import React, { useState } from 'react';
import { TrendingUp, Users, Package, DollarSign, CheckCircle, AlertCircle, X, Calendar } from 'lucide-react';
import { mockProducts, mockSalesAgents, mockPartners, mockLeads, mockDeals } from '../utils/mockData';

type LeaderboardTab = 'revenue' | 'deals' | 'conversion';
type ReportType = 'revenue' | 'customers' | 'leads' | 'conversion' | 'commission' | 'cases';

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>('revenue');
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('revenue');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });

  const totalRevenue = 187000;
  const activeCustomers = 24;
  const newLeadsToday = 3;
  const conversionRate = 28.5;
  const commissionEarned = 27400;
  const activeCases = 5;

  const getSortedAgents = (tab: LeaderboardTab) => {
    const activeAgents = mockSalesAgents.filter(agent => agent.status === 'Active');
    switch (tab) {
      case 'deals':
        return activeAgents.sort((a, b) => b.dealsClosed - a.dealsClosed);
      case 'conversion':
        return activeAgents.sort((a, b) => b.conversionRate - a.conversionRate);
      default:
        return activeAgents.sort((a, b) => b.revenue - a.revenue);
    }
  };

  const salesTeamLeaderboard = getSortedAgents(leaderboardTab).slice(0, 5);

  const activeLeads = mockLeads.filter(l => l.status !== 'Lost' && l.status !== 'Customer').length;
  const customerLeads = mockLeads.filter(l => l.status === 'Customer').length;
  const lostLeads = mockLeads.filter(l => l.status === 'Lost').length;

  const partnerUtilization = mockPartners
    .filter(p => p.status === 'Active')
    .reduce((sum, p) => sum + p.activeCases, 0);

  const openReport = (type: ReportType) => {
    setReportType(type);
    setShowReportModal(true);
  };

  const getDateRangeLabel = () => {
    switch (timePeriod) {
      case 'today': return 'Today';
      case 'yesterday': return 'Yesterday';
      case 'week': return 'This Week';
      case 'lastWeek': return 'Last Week';
      case 'month': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'quarter': return 'This Quarter';
      case 'custom': return customDateRange.start && customDateRange.end
        ? `${customDateRange.start} to ${customDateRange.end}`
        : 'Custom Range';
      default: return 'This Month';
    }
  };

  return (
    <div className="space-y-8">
      {/* Time Period & Category Filters */}
      <div className="flex gap-4 flex-wrap items-center">
        <div className="relative">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm bg-white hover:bg-gray-50 flex items-center gap-2"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Calendar size={16} />
            {getDateRangeLabel()}
          </button>
          {showDatePicker && (
            <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('today'); setShowDatePicker(false); }}>Today</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('yesterday'); setShowDatePicker(false); }}>Yesterday</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('week'); setShowDatePicker(false); }}>This Week</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('lastWeek'); setShowDatePicker(false); }}>Last Week</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('month'); setShowDatePicker(false); }}>This Month</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('lastMonth'); setShowDatePicker(false); }}>Last Month</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm" onClick={() => { setTimePeriod('quarter'); setShowDatePicker(false); }}>This Quarter</button>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Custom Range</label>
                <input
                  type="date"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                />
                <button
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  onClick={() => {
                    if (customDateRange.start && customDateRange.end) {
                      setTimePeriod('custom');
                      setShowDatePicker(false);
                    }
                  }}
                >
                  Apply Custom Range
                </button>
              </div>
            </div>
          )}
        </div>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="F&B">F&B</option>
          <option value="IT">IT</option>
          <option value="Property">Property</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Services">Services</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Retail">Retail</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => openReport('revenue')}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Total Revenue (MTD)</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 12% vs last month</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </button>

        <button
          onClick={() => openReport('customers')}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Active Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeCustomers}</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 4 new this month</p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </button>

        <button
          onClick={() => openReport('leads')}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">New Leads Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{newLeadsToday}</p>
              <p className="text-sm text-blue-600 font-medium mt-2">{activeLeads} active leads</p>
            </div>
            <AlertCircle className="text-orange-500" size={32} />
          </div>
        </button>

        <button
          onClick={() => openReport('conversion')}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{conversionRate}%</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 2.3% vs last month</p>
            </div>
            <TrendingUp className="text-teal-500" size={32} />
          </div>
        </button>

        <button
          onClick={() => openReport('commission')}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Commission Earned (MTD)</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">RM {commissionEarned.toLocaleString()}</p>
              <p className="text-sm text-green-600 font-medium mt-2">↑ 18% vs last month</p>
            </div>
            <DollarSign className="text-emerald-500" size={32} />
          </div>
        </button>

        <button
          onClick={() => openReport('cases')}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-500 hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Active Cases</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeCases}</p>
              <p className="text-sm text-gray-600 font-medium mt-2">In delivery/fulfillment</p>
            </div>
            <CheckCircle className="text-cyan-500" size={32} />
          </div>
        </button>
      </div>

      {/* Sales Team Leaderboard */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Sales Team Performance (MTD)</h3>
            <button
              onClick={() => setShowLeaderboardModal(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setLeaderboardTab('revenue')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                leaderboardTab === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              By Revenue
            </button>
            <button
              onClick={() => setLeaderboardTab('deals')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                leaderboardTab === 'deals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              By Deals Closed
            </button>
            <button
              onClick={() => setLeaderboardTab('conversion')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                leaderboardTab === 'conversion' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              By Conversion Rate
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesTeamLeaderboard.map((agent, idx) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">#{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.dealsClosed}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {agent.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">{agent.conversionRate}%</td>
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
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Pending</span>
                <span className="text-sm font-bold text-yellow-600">2 (20%)</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div className="bg-yellow-500 h-2 rounded" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">In Progress</span>
                <span className="text-sm font-bold text-blue-600">{activeCases} (50%)</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div className="bg-blue-500 h-2 rounded" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completed</span>
                <span className="text-sm font-bold text-green-600">3 (30%)</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div className="bg-green-500 h-2 rounded" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Full Sales Performance Report</h2>
                <button onClick={() => setShowLeaderboardModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setLeaderboardTab('revenue')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    leaderboardTab === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  By Revenue
                </button>
                <button
                  onClick={() => setLeaderboardTab('deals')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    leaderboardTab === 'deals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  By Deals Closed
                </button>
                <button
                  onClick={() => setLeaderboardTab('conversion')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    leaderboardTab === 'conversion' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  By Conversion Rate
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Leads Assigned</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals Closed</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Commission</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getSortedAgents(leaderboardTab).map((agent, idx) => (
                    <tr key={agent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">#{idx + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.leadsAssigned}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.dealsClosed}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {agent.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {agent.commissionEarned.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">{agent.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {reportType === 'revenue' && 'Revenue Report'}
                  {reportType === 'customers' && 'Customer Report'}
                  {reportType === 'leads' && 'Leads Report'}
                  {reportType === 'conversion' && 'Conversion Analysis'}
                  {reportType === 'commission' && 'Commission Details'}
                  {reportType === 'cases' && 'Cases Report'}
                </h2>
                <button onClick={() => setShowReportModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {reportType === 'revenue' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Revenue (MTD)</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">RM {totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Growth vs Last Month</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">+12%</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Revenue by Product Category</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">IT Services</span>
                        <span className="font-bold text-blue-600">RM 85,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Property</span>
                        <span className="font-bold text-blue-600">RM 62,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Services</span>
                        <span className="font-bold text-blue-600">RM 40,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reportType === 'customers' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Active Customers</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{activeCustomers}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">New This Month</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">4</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Avg. Customer Value</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">RM 7.8K</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Recent Customers</h3>
                    <div className="space-y-2">
                      {mockLeads.filter(l => l.status === 'Customer').slice(0, 10).map(lead => (
                        <div key={lead.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{lead.customerName}</span>
                          <span className="text-sm text-gray-600">{lead.createdDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {reportType === 'leads' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">New Today</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{newLeadsToday}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Active Leads</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{activeLeads}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Lost Leads</p>
                      <p className="text-3xl font-bold text-red-600 mt-1">{lostLeads}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Leads by Source</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Webinar</span>
                        <span className="font-bold text-blue-600">{mockLeads.filter(l => l.source === 'Webinar').length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Referral</span>
                        <span className="font-bold text-blue-600">{mockLeads.filter(l => l.source === 'Referral').length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Meta Ads</span>
                        <span className="font-bold text-blue-600">{mockLeads.filter(l => l.source === 'Meta Ads').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reportType === 'conversion' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Overall Conversion Rate</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{conversionRate}%</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Change vs Last Month</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">+2.3%</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Conversion by Sales Agent</h3>
                    <div className="space-y-2">
                      {mockSalesAgents.filter(a => a.status === 'Active').slice(0, 10).map(agent => (
                        <div key={agent.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{agent.name}</span>
                          <span className="font-bold text-blue-600">{agent.conversionRate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {reportType === 'commission' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Commission (MTD)</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">RM {commissionEarned.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Growth vs Last Month</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">+18%</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Commission by Agent</h3>
                    <div className="space-y-2">
                      {mockSalesAgents.filter(a => a.status === 'Active').map(agent => (
                        <div key={agent.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-gray-600">{agent.dealsClosed} deals closed</p>
                          </div>
                          <span className="font-bold text-green-600">RM {agent.commissionEarned.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {reportType === 'cases' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-3xl font-bold text-yellow-600 mt-1">2</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{activeCases}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">3</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Case Details</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Case #001 - John Doe</p>
                            <p className="text-sm text-gray-600 mt-1">Expected: 2024-03-20</p>
                          </div>
                          <span className="text-sm font-bold text-yellow-600">Pending</span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Case #002 - Jane Smith</p>
                            <p className="text-sm text-gray-600 mt-1">Expected: 2024-03-22</p>
                          </div>
                          <span className="text-sm font-bold text-blue-600">In Progress</span>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Case #003 - Bob Johnson</p>
                            <p className="text-sm text-gray-600 mt-1">Completed: 2024-03-10</p>
                          </div>
                          <span className="text-sm font-bold text-green-600">Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
