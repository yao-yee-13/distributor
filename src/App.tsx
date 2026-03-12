import React, { useState } from 'react';
import { BarChart3, Users, Package, Zap, TrendingUp, CheckSquare, DollarSign, AlertCircle, Settings, Home } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProductCatalog from './components/ProductCatalog';
import SalesTeam from './components/SalesTeam';
import PartnerNetwork from './components/PartnerNetwork';
import Promotions from './components/Promotions';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import CommissionStructure from './components/CommissionStructure';
import CommissionEarnings from './components/CommissionEarnings';
import LeadPipeline from './components/LeadPipeline';
import SalesTargets from './components/SalesTargets';
import ConversionFunnel from './components/ConversionFunnel';
import ProductSalesAnalysis from './components/ProductSalesAnalysis';
import UpsellTracking from './components/UpsellTracking';
import FulfillmentMonitoring from './components/FulfillmentMonitoring';
import PipelineHealth from './components/PipelineHealth';
import EscalationManagement from './components/EscalationManagement';

type MenuSection = 'dashboard' | 'catalog' | 'sales' | 'partners' | 'promotions' | 'approvals' | 'commission' | 'leads' | 'targets' | 'funnel' | 'products' | 'upsell' | 'fulfillment' | 'pipeline' | 'escalation';

const menuItems = [
  { id: 'dashboard', label: 'Territory Dashboard', icon: Home },
  { id: 'catalog', label: 'Product Catalog', icon: Package },
  { id: 'sales', label: 'Sales Team', icon: Users },
  { id: 'partners', label: 'Partners', icon: Zap },
  { id: 'promotions', label: 'Promotions', icon: TrendingUp },
  { id: 'approvals', label: 'Approvals', icon: CheckSquare },
  { id: 'commission', label: 'Commission', icon: DollarSign },
  { id: 'leads', label: 'Leads', icon: BarChart3 },
  { id: 'targets', label: 'Targets', icon: TrendingUp },
  { id: 'funnel', label: 'Funnel', icon: BarChart3 },
  { id: 'products', label: 'Product Sales', icon: Package },
  { id: 'upsell', label: 'Upsell', icon: TrendingUp },
  { id: 'fulfillment', label: 'Fulfillment', icon: CheckSquare },
  { id: 'pipeline', label: 'Pipeline', icon: BarChart3 },
  { id: 'escalation', label: 'Escalations', icon: AlertCircle },
];

function App() {
  const [activeSection, setActiveSection] = useState<MenuSection>('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <ProductCatalog />;
      case 'sales':
        return <SalesTeam />;
      case 'partners':
        return <PartnerNetwork />;
      case 'promotions':
        return <Promotions />;
      case 'approvals':
        return <ApprovalWorkflow />;
      case 'commission':
        return <CommissionEarnings />;
      case 'leads':
        return <LeadPipeline />;
      case 'targets':
        return <SalesTargets />;
      case 'funnel':
        return <ConversionFunnel />;
      case 'products':
        return <ProductSalesAnalysis />;
      case 'upsell':
        return <UpsellTracking />;
      case 'fulfillment':
        return <FulfillmentMonitoring />;
      case 'pipeline':
        return <PipelineHealth />;
      case 'escalation':
        return <EscalationManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-y-auto">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">Distributor</h1>
          <p className="text-sm text-slate-400 mt-1">Territory Management</p>
        </div>
        <nav className="p-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as MenuSection)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {menuItems.find(m => m.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Manage your territory operations</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
