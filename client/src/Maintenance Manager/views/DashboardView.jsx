import React from 'react';
import {
  FiFileText, FiUsers, FiClock, FiCheckCircle,
  FiTool, FiBarChart2, FiAlertCircle, FiPlus,
  FiUserPlus, FiCalendar
} from 'react-icons/fi';

const DashboardView = ({ columns, technicians }) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Requests', value: Object.values(columns).flat().length, icon: FiFileText, gradient: 'from-violet-600 to-indigo-600', subtitle: `${columns.new.length} new` },
          { title: 'Active Technicians', value: technicians.filter(t => t.available).length, icon: FiUsers, gradient: 'from-blue-600 to-blue-700', subtitle: `${technicians.length} total` },
          { title: 'In Progress', value: columns.progress.length, icon: FiClock, gradient: 'from-yellow-600 to-yellow-700', subtitle: 'Currently working' },
          { title: 'Completed Today', value: technicians.reduce((sum, t) => sum + t.completedToday, 0), icon: FiCheckCircle, gradient: 'from-green-600 to-green-700', subtitle: 'Tasks finished' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
            Recent Requests
          </h3>
          <div className="space-y-3">
            {Object.values(columns).flat().slice(0, 5).map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-violet-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                      <FiTool className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{request.title}</h4>
                      <p className="text-xs text-gray-500">{request.equipment} • {request.location}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    request.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    request.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {request.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-3">
              {[
                { label: 'Avg Response Time', value: '2.2h', icon: FiClock, color: 'text-blue-600' },
                { label: 'Completion Rate', value: '87%', icon: FiBarChart2, color: 'text-violet-600' },
                { label: 'Overdue Items', value: columns.overdue.length, icon: FiAlertCircle, color: 'text-red-600' }
              ].map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <div className="flex items-center space-x-3">
                    <metric.icon className={`${metric.color} text-xl`} />
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Create Request', icon: FiPlus },
                { label: 'Assign Technician', icon: FiUserPlus },
                { label: 'Schedule PM', icon: FiCalendar }
              ].map((action, idx) => (
                <button key={idx} className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-lg transition-all text-white">
                  <action.icon className="text-lg" />
                  <span className="font-semibold text-sm">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
