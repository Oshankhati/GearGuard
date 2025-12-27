import React from 'react';
import {
  FiZap, FiMonitor, FiClock, FiBarChart2, FiPackage
} from 'react-icons/fi';

const ReportsView = () => {
  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Maintenance Cost', value: '$12,450', icon: FiZap, gradient: 'from-violet-600 to-indigo-600', change: '+12%' },
          { title: 'Equipment Uptime', value: '96.5%', icon: FiMonitor, gradient: 'from-green-600 to-green-700', change: '+2.3%' },
          { title: 'Response Time', value: '2.2h', icon: FiClock, gradient: 'from-blue-600 to-blue-700', change: '-15%' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">{stat.change}</span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
            Monthly Requests Trend
          </h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl">
            <div className="text-center">
              <FiBarChart2 className="w-16 h-16 text-violet-400 mx-auto mb-3" />
              <p className="text-gray-500">Chart visualization area</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
            Request Distribution
          </h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl">
            <div className="text-center">
              <FiBarChart2 className="w-16 h-16 text-indigo-400 mx-auto mb-3" />
              <p className="text-gray-500">Pie chart visualization area</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Reports */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Weekly Report', 'Monthly Summary', 'Technician Performance', 'Cost Analysis'].map((report, idx) => (
            <button key={idx} className="p-4 border-2 border-gray-200 rounded-xl hover:border-violet-500 hover:bg-violet-50 transition-all group">
              <FiPackage className="w-8 h-8 text-violet-600 mb-2 mx-auto" />
              <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-600">{report}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
