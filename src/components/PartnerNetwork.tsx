import React, { useState } from 'react';
import { Plus, X, Phone, Mail } from 'lucide-react';
import { mockPartners } from '../utils/mockData';
import { Partner } from '../types';

export default function PartnerNetwork() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [newPartner, setNewPartner] = useState({
    name: '',
    email: '',
    phone: '',
    specializations: [] as string[]
  });

  const specs = ['F&B', 'IT', 'Property', 'Manufacturing', 'Services', 'Education', 'Healthcare'];

  const handleInvite = () => {
    if (!newPartner.name || !newPartner.email) {
      alert('Please fill in all required fields');
      return;
    }

    const partner: Partner = {
      id: `p${Date.now()}`,
      name: newPartner.name,
      email: newPartner.email,
      specializations: newPartner.specializations,
      status: 'Pending',
      activeCases: 0,
      completedCases: 0,
      performanceRating: 0,
      completionRate: 0
    };

    setPartners([...partners, partner]);
    setShowInviteModal(false);
    setNewPartner({ name: '', email: '', phone: '', specializations: [] });
    alert(`Invitation sent to ${newPartner.name}!`);
  };

  const handleSpecToggle = (spec: string) => {
    setNewPartner(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Invite Partner
        </button>
        <span className="text-sm text-gray-600">Total: {partners.length} partners</span>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(partner => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedPartner(partner)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                partner.status === 'Active' ? 'bg-green-100 text-green-800' :
                partner.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {partner.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={16} />
                <span className="text-sm">{partner.email}</span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {partner.specializations.map(spec => (
                    <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-blue-600">{partner.activeCases}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{partner.completedCases}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-600">Rating</p>
                <p className="text-lg font-bold text-gray-900">{partner.performanceRating.toFixed(1)} ⭐</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Partner Profile - {selectedPartner.name}</h3>
              <button onClick={() => setSelectedPartner(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-semibold text-gray-900">{selectedPartner.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedPartner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedPartner.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gray-600" />
                    <a href={`mailto:${selectedPartner.email}`} className="text-blue-600 hover:underline">
                      {selectedPartner.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.specializations.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedPartner.activeCases}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Cases</p>
                  <p className="text-2xl font-bold text-green-600">{selectedPartner.completedCases}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-amber-600">{selectedPartner.performanceRating.toFixed(1)} ⭐</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Completion Rate</p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-600 h-full rounded-full"
                    style={{ width: `${selectedPartner.completionRate}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-2">{selectedPartner.completionRate}%</p>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  View Cases
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300">
                  Set Commission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Invite Partner</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newPartner.email}
                  onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="contact@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="+60 123 456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Specializations</label>
                <div className="grid grid-cols-2 gap-2">
                  {specs.map(spec => (
                    <label key={spec} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPartner.specializations.includes(spec)}
                        onChange={() => handleSpecToggle(spec)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleInvite}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Send Invitation
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
    </div>
  );
}
