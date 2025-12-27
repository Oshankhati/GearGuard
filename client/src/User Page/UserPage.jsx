import React, { useState } from 'react';
import { 
  FiHome, FiPackage, FiFileText, FiClock, FiUser, 
  FiSettings, FiLogOut, FiSearch, FiBell, FiShield,
  FiChevronRight, FiChevronLeft, FiPlus, FiCheckCircle,
  FiAlertCircle, FiCalendar, FiMonitor, FiBox, FiTool
} from 'react-icons/fi';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // User profile
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    id: 'USER-001',
    avatar: 'from-violet-600 to-indigo-600',
    department: 'Engineering'
  };

  // Equipment state
  const [equipment] = useState([
    { name: 'Laptop Dell XPS 15', id: 'EQ-001', status: 'In Use', dueDate: 'Dec 31, 2025', category: 'Electronics', icon: FiMonitor },
    { name: 'Wireless Mouse', id: 'EQ-045', status: 'In Use', dueDate: 'Jan 15, 2026', category: 'Accessories', icon: FiBox },
    { name: 'USB-C Hub', id: 'EQ-078', status: 'In Use', dueDate: 'Jan 10, 2026', category: 'Accessories', icon: FiBox },
    { name: 'Webcam Logitech', id: 'EQ-120', status: 'Pending Return', dueDate: 'Dec 28, 2025', category: 'Electronics', icon: FiMonitor }
  ]);

  // Requests state
  const [requests] = useState([
    { id: 'REQ-001', equipment: 'MacBook Pro 16"', status: 'Pending', requestDate: '2 hours ago', priority: 'High' },
    { id: 'REQ-002', equipment: 'Standing Desk', status: 'Approved', requestDate: '1 day ago', priority: 'Medium' },
    { id: 'REQ-003', equipment: 'Office Chair', status: 'In Progress', requestDate: '2 days ago', priority: 'Low' }
  ]);

  // Recent activity
  const [activities] = useState([
    { action: 'Requested', item: 'Laptop Dell XPS 15', time: '2 hours ago', type: 'request', icon: FiFileText },
    { action: 'Returned', item: 'Wireless Keyboard', time: '1 day ago', type: 'return', icon: FiCheckCircle },
    { action: 'Approved', item: 'Monitor 27"', time: '2 days ago', type: 'approve', icon: FiCheckCircle },
    { action: 'Requested', item: 'USB-C Hub', time: '3 days ago', type: 'request', icon: FiFileText }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Use': return 'bg-green-100 text-green-700';
      case 'Pending Return': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-blue-100 text-blue-700';
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-orange-100 text-orange-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-300';
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
                  <FiShield className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    GearGuard
                  </h1>
                  <p className="text-xs text-gray-500">Employee Portal</p>
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
              { id: 'dashboard', label: 'Dashboard', icon: FiHome, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'equipment', label: 'My Equipment', icon: FiPackage, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'requests', label: 'My Requests', icon: FiFileText, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'history', label: 'History', icon: FiClock, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'profile', label: 'Profile', icon: FiUser, gradient: 'from-violet-600 to-indigo-600' },
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

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 cursor-pointer hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${userProfile.avatar} flex items-center justify-center ring-2 ring-violet-200`}>
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{userProfile.name}</p>
                <p className="text-xs text-gray-500 truncate">{userProfile.department}</p>
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
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'equipment' && 'My Equipment'}
              {activeTab === 'requests' && 'My Requests'}
              {activeTab === 'history' && 'History'}
              {activeTab === 'profile' && 'Profile'}
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
                placeholder="Search equipment..."
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
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Total Equipment', 
                  value: equipment.length, 
                  icon: FiPackage, 
                  gradient: 'from-violet-600 to-indigo-600',
                  subtitle: `${equipment.filter(e => e.status === 'In Use').length} currently in use`
                },
                { 
                  title: 'Active Requests', 
                  value: requests.filter(r => r.status === 'Pending' || r.status === 'In Progress').length, 
                  icon: FiFileText, 
                  gradient: 'from-violet-600 to-indigo-600',
                  subtitle: 'Awaiting response'
                },
                { 
                  title: 'Pending Returns', 
                  value: equipment.filter(e => e.status === 'Pending Return').length, 
                  icon: FiAlertCircle, 
                  gradient: 'from-violet-600 to-indigo-600',
                  subtitle: 'Items to return'
                },
                { 
                  title: 'Approved Items', 
                  value: requests.filter(r => r.status === 'Approved').length, 
                  icon: FiCheckCircle, 
                  gradient: 'from-violet-600 to-indigo-600',
                  subtitle: 'Ready for pickup'
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

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* My Equipment Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                      My Equipment
                    </h3>
                    <button 
                      onClick={() => setShowRequestModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold flex items-center space-x-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      <span>Request New</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {equipment.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-violet-300">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                            <item.icon className="text-white text-xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">ID: {item.id}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                          <div className="flex items-center text-gray-500">
                            <FiCalendar className="w-4 h-4 mr-1" />
                            <span className="text-xs">Due: {item.dueDate}</span>
                          </div>
                          <button className="text-violet-600 hover:text-violet-700 font-semibold text-xs flex items-center">
                            Details
                            <FiChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Requests Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                      My Requests
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {requests.map((request, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-violet-300">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{request.equipment}</h4>
                              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                              <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Request ID: {request.id}</span>
                              <span>• {request.requestDate}</span>
                            </div>
                          </div>
                          <button className="text-violet-600 hover:text-violet-700 font-semibold text-sm">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <activity.icon className="text-white text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {activity.action} <span className="text-gray-600">{activity.item}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Request Equipment', icon: FiPlus },
                      { label: 'Return Item', icon: FiCheckCircle },
                      { label: 'Report Issue', icon: FiAlertCircle },
                      { label: 'View Catalog', icon: FiPackage }
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        className="w-full flex items-center space-x-3 px-4 py-3 bg-white hover:bg-gray-50 rounded-xl transition-all text-left border border-gray-200 hover:border-violet-300"
                      >
                        <action.icon className="text-violet-600 text-xl" />
                        <span className="font-semibold text-gray-700 text-sm">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* My Equipment View */}
          {activeTab === 'equipment' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">My Equipment</h3>
                <button 
                  onClick={() => setShowRequestModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  + Request Equipment
                </button>
              </div>

              {/* Equipment Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Items', value: equipment.length, icon: FiPackage, gradient: 'from-violet-600 to-indigo-600' },
                  { title: 'In Use', value: equipment.filter(e => e.status === 'In Use').length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700' },
                  { title: 'Pending Return', value: equipment.filter(e => e.status === 'Pending Return').length, icon: FiClock, gradient: 'from-yellow-600 to-yellow-700' },
                  { title: 'Categories', value: new Set(equipment.map(e => e.category)).size, icon: FiBox, gradient: 'from-blue-600 to-blue-700' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md mb-3`}>
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipment.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                        <item.icon className="text-white text-3xl" />
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span className="font-semibold">ID:</span>
                        <span>{item.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Category:</span>
                        <span>{item.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Due Date:</span>
                        <span>{item.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 py-2 border-2 border-violet-300 text-violet-600 rounded-xl hover:bg-violet-50 transition-all font-semibold text-sm">
                        Return
                      </button>
                      <button className="flex-1 py-2 bg-violet-100 text-violet-700 rounded-xl hover:bg-violet-200 transition-all font-semibold text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Requests View */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">My Requests</h3>
                <button 
                  onClick={() => setShowRequestModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  + New Request
                </button>
              </div>

              {/* Request Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[
                  { title: 'Total Requests', value: requests.length, icon: FiFileText, gradient: 'from-violet-600 to-indigo-600' },
                  { title: 'Pending', value: requests.filter(r => r.status === 'Pending').length, icon: FiClock, gradient: 'from-yellow-600 to-yellow-700' },
                  { title: 'Approved', value: requests.filter(r => r.status === 'Approved').length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700' },
                  { title: 'In Progress', value: requests.filter(r => r.status === 'In Progress').length, icon: FiAlertCircle, gradient: 'from-blue-600 to-blue-700' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md mb-3`}>
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Requests List */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="space-y-4">
                  {requests.map((request, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-violet-300 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                            <FiFileText className="text-white text-2xl" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-bold text-gray-900">{request.equipment}</h4>
                              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                request.priority === 'High' ? 'bg-red-100 text-red-700' :
                                request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {request.priority}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><span className="font-semibold">Request ID:</span> {request.id}</span>
                              <span><span className="font-semibold">Submitted:</span> {request.requestDate}</span>
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-all font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History View */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Activity History</h3>

              {/* Timeline Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[
                  { title: 'Total Activities', value: activities.length, icon: FiClock, gradient: 'from-violet-600 to-indigo-600' },
                  { title: 'Requests Made', value: activities.filter(a => a.type === 'request').length, icon: FiFileText, gradient: 'from-blue-600 to-blue-700' },
                  { title: 'Items Returned', value: activities.filter(a => a.type === 'return').length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700' },
                  { title: 'Approvals', value: activities.filter(a => a.type === 'approve').length, icon: FiCheckCircle, gradient: 'from-purple-600 to-purple-700' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md mb-3`}>
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Activity Timeline */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
                  Recent Activity
                </h4>
                <div className="space-y-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-violet-300 hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                        <activity.icon className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-gray-900">{activity.action}</p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold ${
                          activity.type === 'request' ? 'bg-blue-100 text-blue-700' :
                          activity.type === 'return' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border-2 border-violet-200 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">This Month Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Equipment Requested</span>
                      <span className="text-2xl font-bold text-violet-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Items Returned</span>
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Pending Actions</span>
                      <span className="text-2xl font-bold text-yellow-600">1</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average Response Time</span>
                      <span className="text-2xl font-bold text-blue-600">2.5h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Approval Rate</span>
                      <span className="text-2xl font-bold text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Active Since</span>
                      <span className="text-lg font-bold text-gray-700">Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FiPlus className="text-violet-600" />
                Request Equipment
              </h3>
              <button 
                onClick={() => setShowRequestModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Name</label>
                <input
                  type="text"
                  placeholder="Enter equipment name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                  <option>Electronics</option>
                  <option>Tools</option>
                  <option>Safety Equipment</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
                <textarea
                  placeholder="Why do you need this equipment?"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowRequestModal(false)} 
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all font-semibold"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;