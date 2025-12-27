import React from 'react';
import {
  FiEdit2, FiAlertCircle, FiFileText, FiPackage
} from 'react-icons/fi';

const SettingsView = ({ managerProfile }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Categories */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
              General Settings
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Auto-assign requests', description: 'Automatically assign new requests to available technicians', enabled: true },
                { label: 'Email notifications', description: 'Send email alerts for critical updates', enabled: true },
                { label: 'SMS alerts', description: 'Enable SMS notifications for urgent issues', enabled: false },
                { label: 'Weekly reports', description: 'Generate and send weekly performance reports', enabled: true }
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-violet-300 transition-all">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{setting.label}</p>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-violet-600' : 'bg-gray-300'} relative cursor-pointer transition-colors`}>
                    <div className={`absolute top-1 ${setting.enabled ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
              Priority Levels
            </h3>
            <div className="space-y-3">
              {[
                { level: 'Critical', color: 'bg-red-500', response: '< 1 hour' },
                { level: 'High', color: 'bg-orange-500', response: '< 4 hours' },
                { level: 'Medium', color: 'bg-yellow-500', response: '< 1 day' },
                { level: 'Low', color: 'bg-green-500', response: '< 3 days' }
              ].map((priority, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 ${priority.color} rounded-full`}></div>
                    <div>
                      <p className="font-semibold text-gray-900">{priority.level}</p>
                      <p className="text-sm text-gray-500">Response time: {priority.response}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiEdit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${managerProfile.avatar} flex items-center justify-center shadow-lg ring-4 ring-violet-200`}>
                  <span className="text-white font-bold text-3xl">SJ</span>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">{managerProfile.name}</p>
                <p className="text-sm text-gray-600">{managerProfile.role}</p>
                <p className="text-xs text-gray-500 mt-1">{managerProfile.id}</p>
              </div>
              <button className="w-full py-2 px-4 bg-white border-2 border-violet-300 text-violet-600 rounded-xl hover:bg-violet-50 transition-all font-semibold">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: 'Help Center', icon: FiAlertCircle },
                { label: 'System Logs', icon: FiFileText },
                { label: 'Backup Data', icon: FiPackage }
              ].map((link, idx) => (
                <button key={idx} className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left">
                  <link.icon className="text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
