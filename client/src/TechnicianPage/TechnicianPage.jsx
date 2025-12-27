import React, { useState } from 'react';
import { 
  FiHome, FiFileText, FiClock, FiCheckCircle, FiTool, 
  FiUser, FiSettings, FiLogOut, FiSearch, FiBell,
  FiChevronRight, FiChevronLeft, FiEdit2
} from 'react-icons/fi';
import AssignedView from './views/AssignedView';
import CompletedView from './views/CompletedView';
import HistoryView from './views/HistoryView';
import { technicianProfile as profileData, initialRequests } from './data/mockData';

const TechnicianPage = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const technicianProfile = profileData;
  const [requests, setRequests] = useState(initialRequests);

  // Form data for updating requests
  const [formData, setFormData] = useState({
    status: 'New',
    hoursSpent: '',
    notes: '',
    completionNotes: ''
  });

  const openModal = (request) => {
    setSelectedRequest(request);
    setFormData({
      status: request.status,
      hoursSpent: request.hoursSpent || '',
      notes: '',
      completionNotes: ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateRequest = () => {
    setRequests(requests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: formData.status, hoursSpent: parseFloat(formData.hoursSpent) || req.hoursSpent }
        : req
    ));
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-orange-100 text-orange-700';
      case 'Repaired': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <FiTool className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    GearGuard
                  </h1>
                  <p className="text-xs text-gray-500">Technician Portal</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mx-auto"
            >
              <FiChevronRight className="w-6 h-6 text-gray-500" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {[
              { id: 'assigned', label: 'Assigned Requests', icon: FiFileText, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'completed', label: 'Completed', icon: FiCheckCircle, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'history', label: 'Work History', icon: FiClock, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'profile', label: 'My Profile', icon: FiUser, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'settings', label: 'Settings', icon: FiSettings, gradient: 'from-violet-600 to-indigo-600' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <item.icon className="text-xl" />
                {sidebarOpen && (
                  <>
                    <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
                    {activeTab === item.id && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Technician Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 cursor-pointer hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${technicianProfile.avatar} flex items-center justify-center ring-2 ring-violet-200`}>
                <span className="text-white font-bold text-sm">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{technicianProfile.name}</p>
                <p className="text-xs text-gray-500 truncate">{technicianProfile.role}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === 'assigned' && 'Assigned Requests'}
              {activeTab === 'completed' && 'Completed Work'}
              {activeTab === 'history' && 'Work History'}
              {activeTab === 'profile' && 'My Profile'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Active
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
                className="w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              />
              <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <FiBell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'assigned' && (
            <AssignedView 
              requests={requests} 
              openModal={openModal} 
              getStatusColor={getStatusColor} 
              getPriorityColor={getPriorityColor} 
            />
          )}
          
          {activeTab === 'completed' && (
            <CompletedView 
              requests={requests} 
              getStatusColor={getStatusColor} 
              getPriorityColor={getPriorityColor} 
            />
          )}
          
          {activeTab === 'history' && (
            <HistoryView 
              requests={requests} 
              getStatusColor={getStatusColor} 
              getPriorityColor={getPriorityColor} 
            />
          )}
        </main>
      </div>

      {/* Update Request Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FiEdit2 className="text-violet-600" />
                Update Request: {selectedRequest.id}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Request Details Summary */}
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-violet-200">
              <h4 className="font-bold text-gray-900 mb-2">{selectedRequest.equipment}</h4>
              <p className="text-sm text-gray-600 mb-2">{selectedRequest.issue}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>📍 {selectedRequest.location}</span>
                <span>👤 {selectedRequest.requestedBy}</span>
                <span>⏱ Est. {selectedRequest.estimatedTime}</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Status Update */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Update Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="New">New - Not Started</option>
                  <option value="In Progress">In Progress - Working On It</option>
                  <option value="Repaired">Repaired - Completed</option>
                </select>
              </div>

              {/* Hours Spent */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hours Spent <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="hoursSpent"
                  value={formData.hoursSpent}
                  onChange={handleInputChange}
                  placeholder="Enter hours (e.g., 2.5)"
                  step="0.5"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {/* Work Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Describe work performed, parts used, issues encountered..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Completion Notes (only if status is Repaired) */}
              {formData.status === 'Repaired' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Completion Notes
                  </label>
                  <textarea
                    name="completionNotes"
                    value={formData.completionNotes}
                    onChange={handleInputChange}
                    placeholder="Final notes, recommendations, or follow-up actions..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowModal(false)} 
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateRequest}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all font-semibold"
              >
                Update Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianPage;