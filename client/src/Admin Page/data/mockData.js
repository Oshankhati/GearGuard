export const adminProfile = {
  name: 'Admin User',
  email: 'admin@gearguard.com',
  role: 'System Administrator'
};

export const initialUsers = [
  { name: 'John Doe', email: 'john@example.com', role: 'Technician', team: 'IT Support', status: 'Active', avatar: 'from-violet-600 to-indigo-600' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Technician', team: 'Mechanical', status: 'Active', avatar: 'from-violet-600 to-indigo-600' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'User', team: 'None', status: 'Active', avatar: 'from-violet-600 to-indigo-600' },
  { name: 'Sarah Williams', email: 'sarah@example.com', role: 'Manager', team: 'IT Support', status: 'Active', avatar: 'from-violet-600 to-indigo-600' },
  { name: 'Tom Brown', email: 'tom@example.com', role: 'User', team: 'None', status: 'Inactive', avatar: 'from-gray-400 to-gray-500' }
];

export const initialTeams = [
  { name: 'IT Support', members: 24, gradient: 'from-violet-600 to-indigo-600' },
  { name: 'Mechanical', members: 18, gradient: 'from-violet-600 to-indigo-600' },
  { name: 'Electrical', members: 15, gradient: 'from-violet-600 to-indigo-600' },
  { name: 'Network', members: 12, gradient: 'from-violet-600 to-indigo-600' }
];

export const recentActivity = [
  { action: 'User Created', detail: 'John added to IT Support', time: '5m', gradient: 'from-violet-600 to-indigo-600' },
  { action: 'Role Updated', detail: 'Permissions modified', time: '15m', gradient: 'from-violet-600 to-indigo-600' },
  { action: 'Team Created', detail: 'Network Admin team', time: '1h', gradient: 'from-violet-600 to-indigo-600' },
  { action: 'Equipment Added', detail: '50 new items', time: '2h', gradient: 'from-violet-600 to-indigo-600' },
  { action: 'Settings Changed', detail: 'Workflow updated', time: '3h', gradient: 'from-violet-600 to-indigo-600' }
];
