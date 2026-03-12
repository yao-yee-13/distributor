import React, { useState } from 'react';
import { CheckCircle, XCircle, X, MessageCircle } from 'lucide-react';
import { mockDeals } from '../utils/mockData';

export default function ApprovalWorkflow() {
  const [requests, setRequests] = useState([
    {
      id: '1',
      customerId: 'C001',
      customerName: 'ABC Manufacturing',
      salesAgent: 'Ahmad Hassan',
      productId: '1',
      productName: 'Advanced Excel Training',
      dealAmount: 2400,
      requestedDiscount: 20,
      maxAllowedDiscount: 20,
      status: 'Pending' as const,
      justification: 'Bulk order for 5 teams',
      requestDate: '2024-02-18'
    },
    {
      id: '2',
      customerId: 'C002',
      customerName: 'XYZ Retail',
      salesAgent: 'Sarah Chen',
      productId: '2',
      productName: 'Leadership Development Package',
      dealAmount: 5000,
      requestedDiscount: 25,
      maxAllowedDiscount: 15,
      status: 'Pending' as const,
      justification: 'Corporate training program for 50 employees',
      requestDate: '2024-02-19'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | 'counter' | null>(null);
  const [counterOffer, setCounterOffer] = useState('');
  const [comments, setComments] = useState('');

  const handleApprove = () => {
    if (!selectedRequest) return;
    setRequests(requests.map(r =>
      r.id === selectedRequest.id ? { ...r, status: 'Approved' as const } : r
    ));
    alert('Discount approved!');
    setSelectedRequest(null);
    setAction(null);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    setRequests(requests.map(r =>
      r.id === selectedRequest.id ? { ...r, status: 'Rejected' as const } : r
    ));
    alert('Discount rejected!');
    setSelectedRequest(null);
    setAction(null);
  };

  const handleCounterOffer = () => {
    if (!selectedRequest || !counterOffer) return;
    setRequests(requests.map(r =>
      r.id === selectedRequest.id ? { ...r, requestedDiscount: parseFloat(counterOffer), status: 'Approved' as const } : r
    ));
    alert('Counter-offer sent!');
    setSelectedRequest(null);
    setAction(null);
    setCounterOffer('');
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 font-medium">Pending Approvals</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{pendingRequests.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 font-medium">Approved (Month)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{requests.filter(r => r.status === 'Approved').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-gray-600 font-medium">Rejected (Month)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{requests.filter(r => r.status === 'Rejected').length}</p>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Pending Discount Approvals</h3>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            <p>No pending approvals</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sales Agent</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deal Amount</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Requested</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Allowed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingRequests.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{request.salesAgent}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{request.productName}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {request.dealAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <span className={request.requestedDiscount > request.maxAllowedDiscount ? 'text-red-600 font-bold' : 'text-gray-700'}>
                        {request.requestedDiscount}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-700 font-semibold">{request.maxAllowedDiscount}%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.requestDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center text-sm">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setAction(null);
                        }}
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
        )}
      </div>

      {/* All Requests History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Request History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Requested</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Approved</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{request.productName}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{request.requestedDiscount}%</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">{request.requestedDiscount}%</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.requestDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedRequest && action === null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Discount Approval Review</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sales Agent</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.salesAgent}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-semibold text-gray-900">{selectedRequest.productName}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-gray-600">Deal Amount</p>
                  <p className="text-lg font-bold text-gray-900">RM {selectedRequest.dealAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Requested Discount</p>
                  <p className={`text-lg font-bold ${selectedRequest.requestedDiscount > selectedRequest.maxAllowedDiscount ? 'text-red-600' : 'text-blue-600'}`}>
                    {selectedRequest.requestedDiscount}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Allowed</p>
                  <p className="text-lg font-bold text-green-600">{selectedRequest.maxAllowedDiscount}%</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Agent's Justification</p>
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{selectedRequest.justification}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => setAction('approve')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Approve
                </button>
                <button
                  onClick={() => setAction('counter')}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
                >
                  Counter-Offer
                </button>
                <button
                  onClick={() => setAction('reject')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Action */}
      {selectedRequest && action === 'approve' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Approval</h3>
            <p className="text-gray-700 mb-4">Approve {selectedRequest.requestedDiscount}% discount for {selectedRequest.customerName}?</p>
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Approve
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
      )}

      {/* Counter-Offer Action */}
      {selectedRequest && action === 'counter' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Counter-Offer</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Requested: {selectedRequest.requestedDiscount}%</p>
                <p className="text-sm text-gray-600 mb-4">Maximum Allowed: {selectedRequest.maxAllowedDiscount}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Counter Offer (%)</label>
                <input
                  type="number"
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                  max={selectedRequest.maxAllowedDiscount}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder={`0 - ${selectedRequest.maxAllowedDiscount}`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCounterOffer}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
                >
                  Send Offer
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

      {/* Reject Action */}
      {selectedRequest && action === 'reject' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Required)</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  placeholder="Reason for rejection..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                >
                  Reject
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
