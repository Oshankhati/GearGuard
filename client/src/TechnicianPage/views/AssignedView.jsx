import React from 'react';
import { 
  FiFileText, FiPlay, FiCheckCircle, FiClock, 
  FiMonitor, FiZap, FiEdit2, FiAlertCircle, FiFilter
} from 'react-icons/fi';

const AssignedView = ({ requests, openModal, getStatusColor, getPriorityColor }) => {
  const filteredRequests = requests.filter(req => req.status === 'New' || req.status === 'In Progress');

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Pending Requests', 
            value: requests.filter(r => r.status === 'New').length, 
            icon: FiFileText, 
            gradient: 'from-violet-600 to-indigo-600',
            subtitle: 'Awaiting action'
          },
          { 
            title: 'In Progress', 
            value: requests.filter(r => r.status === 'In Progress').length, 
            icon: FiPlay, 
            gradient: 'from-violet-600 to-indigo-600',
            subtitle: 'Currently working'
          },
          { 
            title: 'Completed Today', 
            value: requests.filter(r => r.status === 'Repaired').length, 
            icon: FiCheckCircle, 
            gradient: 'from-violet-600 to-indigo-600',
            subtitle: 'Tasks finished'
          },
          { 
            title: 'Hours Logged', 
            value: requests.reduce((sum, r) => sum + (r.hoursSpent || 0), 0).toFixed(1), 
            icon: FiClock, 
            gradient: 'from-violet-600 to-indigo-600',
            subtitle: 'This week'
          }
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

      {/* Quick Info Panel */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <FiAlertCircle className="text-white text-2xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Responsibilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-violet-700 mb-1">✔ You Can:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• View assigned requests</li>
                  <li>• Change status (New → In Progress → Repaired)</li>
                  <li>• Enter hours spent</li>
                  <li>• Add work notes</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-red-700 mb-1">❌ You Cannot:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Delete requests</li>
                  <li>• Assign other technicians</li>
                  <li>• Modify equipment details</li>
                  <li>• Change priority levels</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-indigo-700 mb-1">🛠 Workflow:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>1. Accept assigned request</li>
                  <li>2. Perform repair/service</li>
                  <li>3. Update status & duration</li>
                  <li>4. Mark as repaired</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
            Active Requests
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm font-semibold text-gray-700">
            <FiFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-violet-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                    {request.category === 'IT Support' ? (
                      <FiMonitor className="text-white text-xl" />
                    ) : (
                      <FiZap className="text-white text-xl" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{request.equipment}</h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{request.issue}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                      <div>
                        <span className="font-semibold text-gray-700">Request ID:</span> {request.id}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Location:</span> {request.location}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Requested by:</span> {request.requestedBy}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Assigned:</span> {request.assignedDate}
                      </div>
                    </div>
                    {request.hoursSpent && (
                      <div className="mt-3 flex items-center space-x-2 text-sm">
                        <FiClock className="text-violet-600" />
                        <span className="font-semibold text-gray-700">Hours Logged:</span>
                        <span className="text-violet-600 font-bold">{request.hoursSpent}h</span>
                        <span className="text-gray-400">/ Est. {request.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => openModal(request)}
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold flex items-center space-x-2"
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Update</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 font-semibold">No requests found</p>
            <p className="text-sm text-gray-400 mt-1">All caught up! Great work.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedView;
