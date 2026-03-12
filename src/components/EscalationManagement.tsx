import React, { useState } from 'react';
import { mockEscalations } from '../utils/mockData';
import { AlertCircle, X, CheckCircle } from 'lucide-react';

export default function EscalationManagement() {
  const [escalations, setEscalations] = useState(mockEscalations);
  const [selectedEscalation, setSelectedEscalation] = useState<typeof escalations[0] | null>(null);
  const [action, setAction] = useState<'resolve' | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const handleResolve = () => {
    if (!selectedEscalation) return;
    setEscalations(escalations.map(e =>
      e.id === selectedEscalation.id ? { ...e, status: 'Resolved' } : e
    ));
    alert('Escalation resolved!');
    setSelectedEscalation(null);
    setAction(null);
    setResolutionNotes('');
  };

  const open = escalations.filter(e => e.status === 'Open').length;
  const inProgress = escalations.filter(e => e.status === 'In Progress').length;
  const resolved = escalations.filter(e => e.status === 'Resolved').length;

  const highPriority = escalations.filter(e => e.priority === 'High' && e.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Open Escalations</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{open}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Resolved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{resolved}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-700">
          <p className="text-sm text-gray-600">High Priority</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{highPriority}</p>
        </div>
      </div>

      {/* Escalations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Escalation Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {escalations.map(esc => (
                <tr key={esc.id} className={`hover:bg-gray-50 ${esc.priority === 'High' && esc.status !== 'Resolved' ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{esc.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Customer {esc.customerId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{esc.description}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      esc.priority === 'High' ? 'bg-red-100 text-red-800' :
                      esc.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {esc.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      esc.status === 'Open' ? 'bg-red-100 text-red-800' :
                      esc.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {esc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(esc.requestDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center text-sm">
                    <button
                      onClick={() => setSelectedEscalation(esc)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-200"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedEscalation && action === null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Escalation Details</h3>
              <button onClick={() => setSelectedEscalation(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900">{selectedEscalation.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedEscalation.priority === 'High' ? 'bg-red-100 text-red-800' :
                    selectedEscalation.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedEscalation.priority}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{selectedEscalation.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold text-gray-900">Customer {selectedEscalation.customerId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Requested By</p>
                  <p className="font-semibold text-gray-900">{selectedEscalation.requestedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-gray-900">{selectedEscalation.status}</p>
                </div>
              </div>

              {selectedEscalation.status !== 'Resolved' && (
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => setAction('resolve')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} /> Resolve
                  </button>
                  <button
                    onClick={() => setSelectedEscalation(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {selectedEscalation && action === 'resolve' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resolve Escalation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Notes</label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={4}
                  placeholder="How was this escalation resolved?"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleResolve}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  Resolve
                </button>
                <button
                  onClick={() => setAction(null)}
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
