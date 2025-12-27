import React from 'react';
import {
  FiUsers, FiCheckCircle, FiClock, FiFileText, FiEdit2
} from 'react-icons/fi';

const TechniciansView = ({ technicians }) => {
  return (
    <div className="space-y-6">
      {/* Technicians Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Technicians', value: technicians.length, icon: FiUsers, gradient: 'from-violet-600 to-indigo-600' },
          { title: 'Available', value: technicians.filter(t => t.available).length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700' },
          { title: 'Busy', value: technicians.filter(t => !t.available).length, icon: FiClock, gradient: 'from-red-600 to-red-700' },
          { title: 'Active Tasks', value: technicians.reduce((sum, t) => sum + t.activeRequests, 0), icon: FiFileText, gradient: 'from-blue-600 to-blue-700' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technicians.map((tech) => (
          <div key={tech.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{tech.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-500">{tech.id} • {tech.specialty}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold ${tech.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {tech.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiEdit2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{tech.activeRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Active Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{tech.completedToday}</p>
                <p className="text-xs text-gray-500 mt-1">Completed Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{tech.avgResponseTime}</p>
                <p className="text-xs text-gray-500 mt-1">Avg Response</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechniciansView;
