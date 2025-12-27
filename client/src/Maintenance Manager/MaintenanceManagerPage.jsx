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
