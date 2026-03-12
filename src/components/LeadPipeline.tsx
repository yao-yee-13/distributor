import React, { useState } from 'react';
import { mockLeads, mockSalesAgents } from '../utils/mockData';
import { Plus, X } from 'lucide-react';

export default function LeadPipeline() {
  const [leads, setLeads] = useState(mockLeads);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');

  const leadsByStatus = {
    'New': leads.filter(l => l.status === 'New').length,
    'Contacted': leads.filter(l => l.status === 'Contacted').length,
    'Qualified': leads.filter(l => l.status === 'Qualified').length,
    'Customer': leads.filter(l => l.status === 'Customer').length,
    'Lost': leads.filter(l => l.status === 'Lost').length
  };

  const leadsBySource = {};
  leads.forEach(l => {
    leadsBySource[l.source] = (leadsBySource[l.source] || 0) + 1;
  });

  const leadsByAgent = {};
  leads.forEach(l => {
    leadsByAgent[l.assignedAgent] = (leadsByAgent[l.assignedAgent] || 0) + 1;
  });

  const activeLeads = leads.filter(l => l.status !== 'Lost' && l.status !== 'Customer').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Active Leads</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{activeLeads}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">New</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{leadsByStatus['New']}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Contacted</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{leadsByStatus['Contacted']}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Qualified</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{leadsByStatus['Qualified']}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Customers</p>
          <p className="text-3xl font-bold text-green-700 mt-2">{leadsByStatus['Customer']}</p>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">By Status</h3>
          <div className="space-y-3">
            {Object.entries(leadsByStatus).map(([status, count]) => (
              <div key={status}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{status}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / leads.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">By Source</h3>
          <div className="space-y-3">
            {Object.entries(leadsBySource).sort((a, b) => b[1] - a[1]).map(([source, count]) => (
              <div key={source}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{source}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(count / leads.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Load */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">By Agent</h3>
          <div className="space-y-3">
            {mockSalesAgents.filter(a => a.status === 'Active').map(agent => {
              const count = leadsByAgent[agent.id] || 0;
              return (
                <div key={agent.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{agent.name}</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${(count / Math.max(...Object.values(leadsByAgent))) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">All Leads</h3>
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} /> Assign Leads
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Source</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Assigned Agent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map(lead => {
                const agent = mockSalesAgents.find(a => a.id === lead.assignedAgent);
                return (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{lead.source}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'Contacted' ? 'bg-orange-100 text-orange-800' :
                        lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                        lead.status === 'Customer' ? 'bg-green-200 text-green-900' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{agent?.name || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(lead.createdDate).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Auto-Assign Leads</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">Unassigned leads: {leads.filter(l => !l.assignedAgent).length}</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Round-Robin (Equal Distribution)</option>
                  <option>Least Loaded Agent</option>
                  <option>By Specialization (if applicable)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  Auto-Assign
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
