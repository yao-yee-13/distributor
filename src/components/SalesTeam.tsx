import React, { useState } from 'react';
import { Plus, Trash2, X, Mail } from 'lucide-react';
import { mockSalesAgents } from '../utils/mockData';
import { SalesAgent } from '../types';

export default function SalesTeam() {
  const [agents, setAgents] = useState<SalesAgent[]>(mockSalesAgents);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<SalesAgent | null>(null);
  const [emails, setEmails] = useState('');
  const [targets, setTargets] = useState({ revenueTarget: '', dealsTarget: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAgents = agents.filter(a =>
    statusFilter === 'all' || a.status === statusFilter
  );

  const handleInvite = () => {
    const emailList = emails.split(',').filter(e => e.trim());
    setShowInviteModal(false);
    setEmails('');
    alert(`Invitations sent to ${emailList.length} sales agents!`);
  };

  const handleSetTarget = () => {
    if (!selectedAgent) return;
    setAgents(agents.map(a =>
      a.id === selectedAgent.id
        ? { ...a, monthlyTarget: parseFloat(targets.revenueTarget) || 50000 }
        : a
    ));
    setShowTargetModal(false);
    setTargets({ revenueTarget: '', dealsTarget: '' });
    alert('Target set successfully!');
  };

  const handleDeactivate = (agentId: string) => {
    if (confirm('Are you sure? Their leads will be reassigned.')) {
      setAgents(agents.map(a =>
        a.id === agentId ? { ...a, status: 'Inactive' } : a
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} /> Invite Sales
          </button>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium"
          >
            <option value="all">All Agents</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>
        <span className="text-sm text-gray-600">Total: {filteredAgents.length} agents</span>
      </div>

      {/* Sales Team Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Sales Team Members</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Leads</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue (MTD)</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Commission (MTD)</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Conversion</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAgents.map(agent => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{agent.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.leadsAssigned}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.dealsClosed}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {agent.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">RM {agent.commissionEarned.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.conversionRate.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-center text-sm">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedAgent(agent);
                          setShowTargetModal(true);
                          setTargets({ revenueTarget: agent.monthlyTarget?.toString() || '50000', dealsTarget: '10' });
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-200"
                      >
                        Target
                      </button>
                      {agent.status === 'Active' && (
                        <button
                          onClick={() => handleDeactivate(agent.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Invite Sales Team</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address(es)</label>
                <textarea
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="name@example.com, another@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={4}
                />
                <p className="text-xs text-gray-600 mt-2">Comma-separated email addresses</p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleInvite}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Mail size={16} /> Send Invitations
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Modal */}
      {showTargetModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Set Target - {selectedAgent.name}</h3>
              <button onClick={() => setShowTargetModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>This Month</option>
                  <option>This Quarter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Target (RM)</label>
                <input
                  type="number"
                  value={targets.revenueTarget}
                  onChange={(e) => setTargets({ ...targets, revenueTarget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deals Target (Count)</label>
                <input
                  type="number"
                  value={targets.dealsTarget}
                  onChange={(e) => setTargets({ ...targets, dealsTarget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSetTarget}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Target
                </button>
                <button
                  onClick={() => setShowTargetModal(false)}
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
