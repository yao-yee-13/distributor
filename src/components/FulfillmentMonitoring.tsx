import React, { useState } from 'react';
import { mockDeliveryCases } from '../utils/mockData';
import { CheckCircle, X } from 'lucide-react';

export default function FulfillmentMonitoring() {
  const [cases, setCases] = useState(mockDeliveryCases);
  const [showMarkDeliveredModal, setShowMarkDeliveredModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const pending = cases.filter(c => c.status === 'Pending').length;
  const inProgress = cases.filter(c => c.status === 'In Progress').length;
  const completed = cases.filter(c => c.status === 'Completed').length;
  const overdue = cases.filter(c => c.status === 'Overdue').length;

  const avgDeliveryTime = 14;
  const avgSatisfaction = 4.5;

  const handleMarkDelivered = () => {
    if (!selectedCase) return;
    setCases(cases.map(c =>
      c.id === selectedCase.id ? { ...c, status: 'Completed', satisfactionRating: 5 } : c
    ));
    setShowMarkDeliveredModal(false);
    setSelectedCase(null);
    alert('Case marked as delivered!');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Avg Time (days)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{avgDeliveryTime}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Satisfaction</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">{avgSatisfaction} ⭐</p>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Delivery Cases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Partner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Expected Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Days Since Payment</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cases.map(c => {
                const daysSincePayment = Math.floor((new Date().getTime() - new Date(c.paymentDate).getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={c.id} className={`hover:bg-gray-50 ${c.status === 'Overdue' ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Customer {c.customerId}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Product {c.productId}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        c.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        c.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.assignedPartner || 'TBD'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(c.expectedDeliveryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{daysSincePayment}</td>
                    <td className="px-6 py-4 text-center text-sm">
                      {c.status !== 'Completed' && (
                        <button
                          onClick={() => {
                            setSelectedCase(c);
                            setShowMarkDeliveredModal(true);
                          }}
                          className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-medium hover:bg-green-200"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {c.status === 'Completed' && (
                        <span className="text-green-600 font-semibold">✓ Done</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mark Delivered Modal */}
      {showMarkDeliveredModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Mark as Delivered</h3>
              <button onClick={() => setShowMarkDeliveredModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Delivery Date</p>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Delivery notes..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleMarkDelivered}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Mark Delivered
                </button>
                <button
                  onClick={() => setShowMarkDeliveredModal(false)}
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
