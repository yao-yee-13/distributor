import { Product, SalesAgent, Partner, PromoCampaign, Lead, Deal, DeliveryCase, Escalation } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Advanced Excel Training',
    category: 'IT',
    type: 'Single Course',
    basePrice: 2400,
    yourPrice: 2400,
    maxDiscount: 20,
    defaultCommission: 15,
    status: 'Active',
    description: 'Comprehensive Excel training for business professionals',
    deliveryRequirements: 'Online course, 8 weeks, 2 hours per week'
  },
  {
    id: '2',
    name: 'Leadership Development Package',
    category: 'Services',
    type: 'Package',
    basePrice: 5000,
    yourPrice: 4900,
    maxDiscount: 15,
    defaultCommission: 12,
    status: 'Active',
    description: 'Complete leadership skills development program',
    deliveryRequirements: 'In-person + online, 12 weeks'
  },
  {
    id: '3',
    name: 'Property Investment Consulting',
    category: 'Property',
    type: 'Consulting',
    basePrice: 3500,
    yourPrice: 3500,
    maxDiscount: 10,
    defaultCommission: 18,
    status: 'Active',
    description: 'One-on-one property investment consultation',
    deliveryRequirements: '1-on-1 consultation, flexible scheduling'
  },
  {
    id: '4',
    name: 'Digital Marketing Masterclass',
    category: 'IT',
    type: 'Package',
    basePrice: 2800,
    yourPrice: 2650,
    maxDiscount: 25,
    defaultCommission: 14,
    status: 'Active',
    description: 'Complete digital marketing course',
    deliveryRequirements: 'Online, 6 weeks, self-paced'
  },
  {
    id: '5',
    name: 'Healthcare Management System',
    category: 'Healthcare',
    type: 'Package',
    basePrice: 8000,
    yourPrice: 8000,
    maxDiscount: 12,
    defaultCommission: 10,
    status: 'Active',
    description: 'Cloud-based healthcare management platform',
    deliveryRequirements: 'Deployment + training, 4 weeks'
  },
  {
    id: '6',
    name: 'F&B Operations Course',
    category: 'F&B',
    type: 'Single Course',
    basePrice: 1500,
    yourPrice: 1500,
    maxDiscount: 30,
    defaultCommission: 16,
    status: 'Active',
    description: 'Food and beverage operations fundamentals',
    deliveryRequirements: 'Online, 4 weeks'
  }
];

export const mockSalesAgents: SalesAgent[] = [
  {
    id: 's1',
    name: 'Ahmad Hassan',
    email: 'ahmad@example.com',
    status: 'Active',
    leadsAssigned: 45,
    dealsClosed: 12,
    revenue: 48000,
    commissionEarned: 7200,
    conversionRate: 26.7,
    monthlyTarget: 50000
  },
  {
    id: 's2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    status: 'Active',
    leadsAssigned: 38,
    dealsClosed: 15,
    revenue: 62000,
    commissionEarned: 8900,
    conversionRate: 39.5,
    monthlyTarget: 50000
  },
  {
    id: 's3',
    name: 'Raj Patel',
    email: 'raj@example.com',
    status: 'Active',
    leadsAssigned: 52,
    dealsClosed: 8,
    revenue: 35000,
    commissionEarned: 4200,
    conversionRate: 15.4,
    monthlyTarget: 50000
  },
  {
    id: 's4',
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    status: 'Active',
    leadsAssigned: 28,
    dealsClosed: 10,
    revenue: 42000,
    commissionEarned: 6300,
    conversionRate: 35.7,
    monthlyTarget: 50000
  },
  {
    id: 's5',
    name: 'Michael Tan',
    email: 'michael@example.com',
    status: 'Inactive',
    leadsAssigned: 0,
    dealsClosed: 5,
    revenue: 18000,
    commissionEarned: 2700,
    conversionRate: 18.5,
    monthlyTarget: 50000
  }
];

export const mockPartners: Partner[] = [
  {
    id: 'p1',
    name: 'Tech Training Hub',
    email: 'contact@techtraining.com',
    specializations: ['IT', 'Healthcare'],
    status: 'Active',
    activeCases: 8,
    completedCases: 24,
    performanceRating: 4.8,
    completionRate: 96
  },
  {
    id: 'p2',
    name: 'Business Consultants Malaysia',
    email: 'info@bcm.com',
    specializations: ['Services', 'Finance'],
    status: 'Active',
    activeCases: 5,
    completedCases: 18,
    performanceRating: 4.5,
    completionRate: 90
  },
  {
    id: 'p3',
    name: 'Property Expert Group',
    email: 'hello@propertyexperts.com',
    specializations: ['Property', 'Finance'],
    status: 'Active',
    activeCases: 3,
    completedCases: 12,
    performanceRating: 4.9,
    completionRate: 100
  },
  {
    id: 'p4',
    name: 'F&B Solutions Ltd',
    email: 'support@fbsolutions.com',
    specializations: ['F&B', 'Services'],
    status: 'Pending',
    activeCases: 0,
    completedCases: 0,
    performanceRating: 0,
    completionRate: 0
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'l1',
    customerName: 'ABC Manufacturing',
    source: 'Webinar',
    status: 'Qualified',
    assignedAgent: 's1',
    createdDate: '2024-02-10'
  },
  {
    id: 'l2',
    customerName: 'XYZ Retail',
    source: 'Referral',
    status: 'Contacted',
    assignedAgent: 's2',
    createdDate: '2024-02-15'
  },
  {
    id: 'l3',
    customerName: 'Tech Startup Inc',
    source: 'Meta Ads',
    status: 'Customer',
    assignedAgent: 's2',
    createdDate: '2024-01-20'
  },
  {
    id: 'l4',
    customerName: 'Global Corp',
    source: 'Direct',
    status: 'New',
    assignedAgent: 's3',
    createdDate: '2024-02-18'
  },
  {
    id: 'l5',
    customerName: 'Finance Plus',
    source: 'Webinar',
    status: 'Qualified',
    assignedAgent: 's1',
    createdDate: '2024-02-12'
  },
  {
    id: 'l6',
    customerName: 'Healthcare Solutions',
    source: 'Referral',
    status: 'Lost',
    assignedAgent: 's4',
    createdDate: '2024-01-15'
  },
  {
    id: 'l7',
    customerName: 'Education Plus',
    source: 'Instagram',
    status: 'New',
    assignedAgent: 's2',
    createdDate: '2024-02-19'
  },
  {
    id: 'l8',
    customerName: 'Restaurant Group',
    source: 'TikTok',
    status: 'Contacted',
    assignedAgent: 's1',
    createdDate: '2024-02-14'
  }
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    customerId: 'c1',
    productId: '1',
    value: 2400,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-02-01',
    salesAgent: 's2',
    createdDate: '2024-01-15'
  },
  {
    id: 'd2',
    customerId: 'c2',
    productId: '2',
    value: 4900,
    stage: 'Negotiation',
    probability: 75,
    expectedCloseDate: '2024-02-25',
    salesAgent: 's1',
    createdDate: '2024-02-01'
  },
  {
    id: 'd3',
    customerId: 'c3',
    productId: '3',
    value: 3500,
    stage: 'Proposal',
    probability: 60,
    expectedCloseDate: '2024-03-05',
    salesAgent: 's2',
    createdDate: '2024-01-25'
  },
  {
    id: 'd4',
    customerId: 'c4',
    productId: '4',
    value: 2650,
    stage: 'Qualification',
    probability: 40,
    expectedCloseDate: '2024-03-15',
    salesAgent: 's3',
    createdDate: '2024-02-05'
  },
  {
    id: 'd5',
    customerId: 'c5',
    productId: '5',
    value: 8000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-01-28',
    salesAgent: 's2',
    createdDate: '2024-01-10'
  }
];

export const mockDeliveryCases: DeliveryCase[] = [
  {
    id: 'del1',
    customerId: 'c1',
    productId: '1',
    status: 'Completed',
    paymentDate: '2024-02-01',
    expectedDeliveryDate: '2024-02-15',
    assignedPartner: 'p1',
    satisfactionRating: 5
  },
  {
    id: 'del2',
    customerId: 'c3',
    productId: '3',
    status: 'In Progress',
    paymentDate: '2024-02-10',
    expectedDeliveryDate: '2024-03-05',
    assignedPartner: 'p3'
  },
  {
    id: 'del3',
    customerId: 'c5',
    productId: '5',
    status: 'Completed',
    paymentDate: '2024-01-28',
    expectedDeliveryDate: '2024-02-15',
    assignedPartner: 'p1',
    satisfactionRating: 4
  }
];

export const mockEscalations: Escalation[] = [
  {
    id: 'e1',
    type: 'Discount',
    customerId: 'c2',
    description: 'Request 30% discount for bulk purchase',
    priority: 'High',
    status: 'Open',
    requestDate: '2024-02-18',
    requestedBy: 's1'
  },
  {
    id: 'e2',
    type: 'Complaint',
    customerId: 'c1',
    description: 'Delivery delayed by 2 days',
    priority: 'Medium',
    status: 'In Progress',
    requestDate: '2024-02-15',
    requestedBy: 'system'
  }
];
