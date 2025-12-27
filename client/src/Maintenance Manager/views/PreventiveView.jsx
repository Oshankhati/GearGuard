import React from 'react';
import {
  FiCalendar, FiAlertCircle, FiCheckCircle, FiClock, FiPlus, FiEdit2
} from 'react-icons/fi';

const PreventiveView = ({ schedules }) => {
  return (
    <div className="space-y-6">
      {/* PM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Schedules', value: schedules.length, icon: FiCalendar, gradient: 'from-violet-600 to-indigo-600' },
          { title: 'Due Soon', value: schedules.filter(s => s.status === 'Due Soon').length, icon: FiAlertCircle, gradient: 'from-yellow-600 to-yellow-700' },
          { title: 'Scheduled', value: schedules.filter(s => s.status === 'Scheduled').length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700' },
          { title: 'This Month', value: 3, icon: FiClock, gradient: 'from-blue-600 to-blue-700' }
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

      {/* Add Schedule Button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
          <FiPlus className="w-5 h-5" />
          <span>Add New Schedule</span>
        </button>
      </div>

      {/* Schedules List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
          Maintenance Schedules
        </h3>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all hover:border-violet-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                    <FiCalendar className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{schedule.equipment}</h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        schedule.status === 'Due Soon' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {schedule.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-700">Frequency:</span> {schedule.frequency}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Next Date:</span> {schedule.nextDate}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Assigned:</span> {schedule.assignedTo}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiEdit2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreventiveView;
