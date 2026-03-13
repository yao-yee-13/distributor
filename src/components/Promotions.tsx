import React, { useState } from 'react';
import { Plus, X, Zap, Code, Users, Package } from 'lucide-react';
import { mockPromoCampaigns, mockProducts } from '../utils/mockData';
import { PromoCampaign, PromoCode } from '../types';

export default function Promotions() {
  const [campaigns, setCampaigns] = useState<PromoCampaign[]>(mockPromoCampaigns);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<PromoCampaign | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const [codeForm, setCodeForm] = useState({
    type: 'single' as 'single' | 'bulk',
    customCode: '',
    quantity: 1,
    prefix: '',
    discountType: 'Percentage' as 'Percentage' | 'Fixed',
    discountValue: '',
    usageLimitPerCustomer: 1,
    totalUsageCap: 100,
    applicableProducts: [] as string[],
    customerSegment: 'All' as 'All' | 'New' | 'VIP' | 'Webinar'
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const campaign: PromoCampaign = {
      id: `c${Date.now()}`,
      name: newCampaign.name,
      description: newCampaign.description,
      status: 'Draft' as const,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      codes: [],
      totalCodes: 0,
      timesRedeemed: 0,
      revenueGenerated: 0
    };

    setCampaigns([...campaigns, campaign]);
    setShowCreateModal(false);
    setNewCampaign({ name: '', description: '', startDate: '', endDate: '' });
    alert('Campaign created successfully!');
  };

  const generateRandomCode = (length: number, prefix: string = '') => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = prefix;
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerateCodes = () => {
    if (!selectedCampaign) return;

    const discountValue = parseFloat(codeForm.discountValue);
    if (!discountValue || discountValue <= 0) {
      alert('Please enter a valid discount value');
      return;
    }

    // Validate discount against product limits
    if (codeForm.discountType === 'Percentage' && codeForm.applicableProducts.length > 0) {
      const selectedProducts = mockProducts.filter(p => codeForm.applicableProducts.includes(p.id));
      const maxProductDiscount = Math.max(...selectedProducts.map(p => p.maxDiscount));
      if (discountValue > maxProductDiscount) {
        alert(`Discount value cannot exceed ${maxProductDiscount}% (max discount for selected products)`);
        return;
      }
    }

    const newCodes: PromoCode[] = [];
    const quantity = codeForm.type === 'single' ? 1 : codeForm.quantity;

    for (let i = 0; i < quantity; i++) {
      const code: PromoCode = {
        id: `code${Date.now()}_${i}`,
        code: codeForm.type === 'single'
          ? codeForm.customCode.toUpperCase()
          : generateRandomCode(8 - codeForm.prefix.length, codeForm.prefix.toUpperCase()),
        discountType: codeForm.discountType,
        discountValue: discountValue,
        redemptions: 0,
        usageLimit: codeForm.totalUsageCap
      };
      newCodes.push(code);
    }

    setCampaigns(campaigns.map(c => {
      if (c.id === selectedCampaign.id) {
        return {
          ...c,
          codes: [...(c.codes || []), ...newCodes],
          totalCodes: (c.totalCodes || 0) + newCodes.length
        };
      }
      return c;
    }));

    setShowGenerateCodeModal(false);
    setCodeForm({
      type: 'single',
      customCode: '',
      quantity: 1,
      prefix: '',
      discountType: 'Percentage',
      discountValue: '',
      usageLimitPerCustomer: 1,
      totalUsageCap: 100,
      applicableProducts: [],
      customerSegment: 'All'
    });
    alert(`${newCodes.length} code(s) generated successfully!`);
  };

  const handleActivateCampaign = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id ? { ...c, status: 'Active' as const } : c
    ));
  };

  const handleDeactivateCampaign = (id: string) => {
    if (confirm('Deactivate this campaign? Codes will no longer be redeemable.')) {
      setCampaigns(campaigns.map(c =>
        c.id === id ? { ...c, status: 'Ended' as const } : c
      ));
    }
  };

  const getConversionRate = (campaign: PromoCampaign) => {
    if (campaign.totalCodes === 0) return 0;
    return ((campaign.timesRedeemed / campaign.totalCodes) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Create Campaign
        </button>
        <span className="text-sm text-gray-600">Total: {campaigns.length} campaigns</span>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedCampaign(campaign)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Period:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Codes Generated:</span>
                <span className="text-sm font-bold text-blue-600">{campaign.totalCodes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Redemptions:</span>
                <span className="text-sm font-bold text-green-600">{campaign.timesRedeemed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversion Rate:</span>
                <span className="text-sm font-bold text-purple-600">{getConversionRate(campaign)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue Generated:</span>
                <span className="text-sm font-bold text-green-600">RM {campaign.revenueGenerated.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-2">
              {campaign.status === 'Draft' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivateCampaign(campaign.id);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Activate
                </button>
              )}
              {campaign.status === 'Active' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeactivateCampaign(campaign.id);
                  }}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Deactivate
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCampaign(campaign);
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-300"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Create Campaign</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Valentine's Day 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  placeholder="Special discount for Valentine's Day"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleCreateCampaign}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {selectedCampaign && !showGenerateCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Campaign Details - {selectedCampaign.name}</h3>
              <button onClick={() => setSelectedCampaign(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-semibold text-gray-900">{selectedCampaign.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedCampaign.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Discount Codes</h4>
                  {selectedCampaign.status !== 'Ended' && (
                    <button
                      onClick={() => setShowGenerateCodeModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Code size={16} /> Generate Codes
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {selectedCampaign.codes && selectedCampaign.codes.length > 0 ? (
                    selectedCampaign.codes.slice(0, 10).map(code => (
                      <div key={code.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600">Code</p>
                            <p className="font-bold text-gray-900 text-lg font-mono">{code.code}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {code.discountType === 'Percentage' ? `${code.discountValue}% off` : `RM ${code.discountValue} off`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Redemptions</p>
                            <p className="font-bold text-blue-600 text-lg">{code.redemptions}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                          <span>Usage Limit: {code.usageLimit}</span>
                          <span>Rate: {((code.redemptions / code.usageLimit) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 py-4 text-center">No codes generated yet. Click "Generate Codes" to create discount codes.</p>
                  )}
                  {selectedCampaign.codes && selectedCampaign.codes.length > 10 && (
                    <p className="text-sm text-gray-600 text-center pt-2">
                      Showing top 10 codes. Total: {selectedCampaign.codes.length}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Codes</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCampaign.totalCodes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Redemptions</p>
                  <p className="text-2xl font-bold text-green-600">{selectedCampaign.timesRedeemed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{getConversionRate(selectedCampaign)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">RM {(selectedCampaign.revenueGenerated / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Codes Modal */}
      {showGenerateCodeModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Generate Discount Codes</h3>
              <button onClick={() => setShowGenerateCodeModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Code Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={codeForm.type === 'single'}
                      onChange={() => setCodeForm({ ...codeForm, type: 'single' })}
                      className="mr-2"
                    />
                    <span className="text-sm">Single Code</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={codeForm.type === 'bulk'}
                      onChange={() => setCodeForm({ ...codeForm, type: 'bulk' })}
                      className="mr-2"
                    />
                    <span className="text-sm">Bulk Generate</span>
                  </label>
                </div>
              </div>

              {codeForm.type === 'single' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Code</label>
                  <input
                    type="text"
                    value={codeForm.customCode}
                    onChange={(e) => setCodeForm({ ...codeForm, customCode: e.target.value })}
                    placeholder="WELCOME10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Codes</label>
                      <input
                        type="number"
                        value={codeForm.quantity}
                        onChange={(e) => setCodeForm({ ...codeForm, quantity: parseInt(e.target.value) || 1 })}
                        min="1"
                        max="1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prefix (Optional)</label>
                      <input
                        type="text"
                        value={codeForm.prefix}
                        onChange={(e) => setCodeForm({ ...codeForm, prefix: e.target.value.slice(0, 4) })}
                        placeholder="VIP"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Discount Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                    <select
                      value={codeForm.discountType}
                      onChange={(e) => setCodeForm({ ...codeForm, discountType: e.target.value as 'Percentage' | 'Fixed' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="Fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Value {codeForm.discountType === 'Percentage' ? '(%)' : '(RM)'}
                    </label>
                    <input
                      type="number"
                      value={codeForm.discountValue}
                      onChange={(e) => setCodeForm({ ...codeForm, discountValue: e.target.value })}
                      placeholder="10"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Usage Limits</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Per Customer</label>
                    <input
                      type="number"
                      value={codeForm.usageLimitPerCustomer}
                      onChange={(e) => setCodeForm({ ...codeForm, usageLimitPerCustomer: parseInt(e.target.value) || 1 })}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Usage Cap</label>
                    <input
                      type="number"
                      value={codeForm.totalUsageCap}
                      onChange={(e) => setCodeForm({ ...codeForm, totalUsageCap: parseInt(e.target.value) || 1 })}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Package size={16} /> Restrictions
                </h4>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Applicable Products</label>
                  <select
                    multiple
                    value={codeForm.applicableProducts}
                    onChange={(e) => setCodeForm({
                      ...codeForm,
                      applicableProducts: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    size={5}
                  >
                    <option value="">All Products</option>
                    {mockProducts.slice(0, 10).map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Max: {p.maxDiscount}%)</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple. Leave empty for all products.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Users size={16} /> Customer Segment
                  </label>
                  <select
                    value={codeForm.customerSegment}
                    onChange={(e) => setCodeForm({ ...codeForm, customerSegment: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="All">All Customers</option>
                    <option value="New">New Customers</option>
                    <option value="VIP">VIP Customers</option>
                    <option value="Webinar">Webinar Attendees</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={handleGenerateCodes}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Generate {codeForm.type === 'bulk' ? `${codeForm.quantity} Codes` : 'Code'}
                </button>
                <button
                  onClick={() => setShowGenerateCodeModal(false)}
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
