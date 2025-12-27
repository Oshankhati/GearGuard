import React from 'react';
import { FiCheckCircle, FiClock, FiMonitor, FiZap } from 'react-icons/fi';

const CompletedView = ({ requests, getStatusColor, getPriorityColor }) => {
  const completedRequests = requests.filter(req => req.status === 'Repaired');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center mb-6">
          <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
          Completed Requests
        </h3>

        <div className="space-y-4">
          {completedRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-md flex-shrink-0">
                  {request.category === 'IT Support' ? (
                    <FiMonitor className="text-white text-xl" />
                  ) : (
                    <FiZap className="text-white text-xl" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{request.equipment}</h4>
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
                      <span className="font-semibold text-gray-700">Completed:</span> {request.assignedDate}
                    </div>
                    {request.hoursSpent && (
                      <div className="flex items-center space-x-1">
                        <FiClock className="text-violet-600" />
                        <span className="font-semibold text-gray-700">Hours:</span>
                        <span className="text-violet-600 font-bold">{request.hoursSpent}h</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {completedRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 font-semibold">No completed requests yet</p>
            <p className="text-sm text-gray-400 mt-1">Completed work will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedView;
