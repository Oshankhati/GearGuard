import React, { useState } from 'react';
import { 
  FiHome, FiUsers, FiFileText, FiCalendar, FiBarChart2,
  FiSettings, FiLogOut, FiSearch, FiBell, FiShield,
  FiChevronRight, FiChevronLeft
} from 'react-icons/fi';

// Import views
import DashboardView from './views/DashboardView';
import KanbanView from './views/KanbanView';
import TechniciansView from './views/TechniciansView';
import PreventiveView from './views/PreventiveView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';

// Import data
import { managerProfile as initialManagerProfile, initialColumns, techniciansList, maintenanceSchedules } from './data/mockData';

const MaintenanceManagerPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Manager profile
  const managerProfile = initialManagerProfile;

  const [columns, setColumns] = useState(initialColumns);

  // Technicians data
  const [technicians] = useState(techniciansList);

  // Preventive Maintenance Schedules
  const [schedules] = useState(maintenanceSchedules);

  const handleDragStart = (e, item, src) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("src", src);
  };

  const handleDrop = (e, dest) => {
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const src = e.dataTransfer.getData("src");

    if (src === dest) return;

    setColumns(prev => {
      return {
        ...prev,
        [src]: prev[src].filter(r => r.id !== item.id),
        [dest]: [...prev[dest], item],
      };
    });
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
                  <p className="text-xs text-gray-500">Manager Portal</p>
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
              { id: 'kanban', label: 'Requests Kanban', icon: FiFileText, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'technicians', label: 'Technicians', icon: FiUsers, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'preventive', label: 'Preventive Maintenance', icon: FiCalendar, gradient: 'from-violet-600 to-indigo-600' },
              { id: 'reports', label: 'Reports & Analytics', icon: FiBarChart2, gradient: 'from-violet-600 to-indigo-600' },
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

        {/* Manager Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 cursor-pointer hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${managerProfile.avatar} flex items-center justify-center ring-2 ring-violet-200`}>
                <span className="text-white font-bold text-sm">SJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{managerProfile.name}</p>
                <p className="text-xs text-gray-500 truncate">{managerProfile.role}</p>
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
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'kanban' && 'Requests Kanban Board'}
              {activeTab === 'technicians' && 'Technician Management'}
              {activeTab === 'preventive' && 'Preventive Maintenance'}
              {activeTab === 'reports' && 'Reports & Analytics'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Manager
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
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <DashboardView columns={columns} technicians={technicians} />
          )}

          {/* Kanban View */}
          {activeTab === 'kanban' && (
            <KanbanView columns={columns} handleDrop={handleDrop} handleDragStart={handleDragStart} />
          )}

          {/* Technicians View */}
          {activeTab === 'technicians' && (
            <TechniciansView technicians={technicians} />
          )}

          {/* Preventive Maintenance View */}
          {activeTab === 'preventive' && (
            <PreventiveView schedules={schedules} />
          )}

          {/* Reports & Analytics View */}
          {activeTab === 'reports' && (
            <ReportsView />
          )}

          {/* Settings View */}
          {activeTab === 'settings' && (
            <SettingsView managerProfile={managerProfile} />
          )}
        </main>
      </div>
    </div>
  );
};

export default MaintenanceManagerPage;
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
          )}

          {/* Kanban Board View */}
          {activeTab === 'kanban' && (
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'New Requests', value: columns.new.length, icon: FiFileText, gradient: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50' },
                  { title: 'In Progress', value: columns.progress.length, icon: FiClock, gradient: 'from-yellow-600 to-yellow-700', bgColor: 'bg-yellow-50' },
                  { title: 'Repaired', value: columns.repaired.length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700', bgColor: 'bg-green-50' },
                  { title: 'Overdue', value: columns.overdue.length, icon: FiAlertCircle, gradient: 'from-red-600 to-red-700', bgColor: 'bg-red-50' }
                ].map((stat, idx) => (
                  <div key={idx} className={`${stat.bgColor} rounded-2xl border-2 border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="text-white text-2xl" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Info Banner */}
              <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-4">
                <div className="flex items-center space-x-3">
                  <FiAlertCircle className="text-violet-600 text-xl flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Drag & Drop:</span> Move request cards between columns to update their status. 
                    <span className="font-semibold ml-2">New</span> → <span className="font-semibold">In Progress</span> → <span className="font-semibold">Repaired</span>
                  </p>
                </div>
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Column title="New" type="new" onDrop={handleDrop}>
                  {columns.new.map(item => (
                    <Card key={item.id} item={item} onDragStart={handleDragStart} type="new" />
                  ))}
                </Column>

                <Column title="In Progress" type="progress" onDrop={handleDrop}>
                  {columns.progress.map(item => (
                    <Card key={item.id} item={item} onDragStart={handleDragStart} type="progress" />
                  ))}
                </Column>

                <Column title="Repaired" type="repaired" onDrop={handleDrop}>
                  {columns.repaired.map(item => (
                    <Card key={item.id} item={item} onDragStart={handleDragStart} type="repaired" />
                  ))}
                </Column>

                <Column title="Overdue" type="overdue" onDrop={handleDrop}>
                  {columns.overdue.map(item => (
                    <Card key={item.id} item={item} onDragStart={handleDragStart} type="overdue" />
                  ))}
                </Column>
              </div>
            </div>
          )}

          {/* Technicians View */}
          {activeTab === 'technicians' && (
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
          )}

          {/* Preventive Maintenance View */}
          {activeTab === 'preventive' && (
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
          )}

          {/* Reports & Analytics View */}
          {activeTab === 'reports' && (
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
          )}

          {/* Settings View */}
          {activeTab === 'settings' && (
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
          )}
        </main>
      </div>
    </div>
  );
};

export default MaintenanceManagerPage;
