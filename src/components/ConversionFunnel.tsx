import React from 'react';
import { mockLeads, mockSalesAgents } from '../utils/mockData';

export default function ConversionFunnel() {
  const leads = mockLeads.length;
  const webinarAttendees = mockLeads.filter(l => ['New', 'Contacted', 'Qualified'].includes(l.status)).length;
  const appointments = mockLeads.filter(l => l.status === 'Qualified').length;
  const payments = mockLeads.filter(l => l.status === 'Customer').length;

  const leadToWebinar = (webinarAttendees / leads) * 100;
  const webinarToAppt = (appointments / webinarAttendees) * 100 || 0;
  const apptToPayment = (payments / appointments) * 100 || 0;
  const overallConversion = (payments / leads) * 100;

  return (
    <div className="space-y-6">
      {/* Funnel Visualization */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {/* Stage 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Leads</span>
              <span className="text-2xl font-bold text-blue-600">{leads}</span>
            </div>
            <div className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 text-center text-sm font-medium">
              {leads} Total Leads
            </div>
          </div>

          {/* Arrow */}
          <div className="text-center text-gray-400">↓</div>

          {/* Stage 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Webinar Attendees</span>
              <span className="text-2xl font-bold text-blue-500">{webinarAttendees}</span>
            </div>
            <div style={{ width: `${Math.max(30, leadToWebinar)}%` }} className="bg-blue-500 text-white rounded-lg py-3 px-4 text-center text-sm font-medium">
              {webinarAttendees} ({leadToWebinar.toFixed(1)}%)
            </div>
            <p className="text-xs text-gray-600 mt-1">Conversion from leads: {leadToWebinar.toFixed(1)}%</p>
          </div>

          {/* Arrow */}
          <div className="text-center text-gray-400">↓</div>

          {/* Stage 3 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Appointments Booked</span>
              <span className="text-2xl font-bold text-green-600">{appointments}</span>
            </div>
            <div style={{ width: `${Math.max(20, webinarToAppt)}%` }} className="bg-green-600 text-white rounded-lg py-3 px-4 text-center text-sm font-medium">
              {appointments} ({webinarToAppt.toFixed(1)}%)
            </div>
            <p className="text-xs text-gray-600 mt-1">Conversion from webinar: {webinarToAppt.toFixed(1)}%</p>
          </div>

          {/* Arrow */}
          <div className="text-center text-gray-400">↓</div>

          {/* Stage 4 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Payments Completed</span>
              <span className="text-2xl font-bold text-green-700">{payments}</span>
            </div>
            <div style={{ width: `${Math.max(15, apptToPayment)}%` }} className="bg-green-700 text-white rounded-lg py-3 px-4 text-center text-sm font-medium">
              {payments} ({apptToPayment.toFixed(1)}%)
            </div>
            <p className="text-xs text-gray-600 mt-1">Conversion from appointment: {apptToPayment.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Lead → Webinar</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{leadToWebinar.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Webinar → Appointment</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{webinarToAppt.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Appointment → Payment</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{apptToPayment.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Overall Funnel</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{overallConversion.toFixed(1)}%</p>
        </div>
      </div>

      {/* Agent Comparison */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Conversion by Sales Agent</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Agent</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Leads</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Conversion %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSalesAgents.filter(a => a.status === 'Active').map(agent => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{agent.leadsAssigned}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">{agent.dealsClosed}</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold">{agent.conversionRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
