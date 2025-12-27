// Manager Profile
export const managerProfile = {
  name: 'Sarah Johnson',
  role: 'Maintenance Manager',
  id: 'MGR-001',
  avatar: 'from-violet-600 to-indigo-600',
  department: 'Maintenance Department'
};

// Initial Columns for Kanban Board
export const initialColumns = {
  new: [
    { id: 1, title: "Laptop not booting", equipment: "Dell XPS 15", location: "Floor 2, Room 205", priority: "Critical", assignedTo: null },
    { id: 2, title: "Air conditioner noise", equipment: "HVAC Unit #3", location: "Floor 3", priority: "Medium", assignedTo: null },
  ],
  progress: [
    { id: 3, title: "Generator inspection", equipment: "Backup Generator", location: "Basement", priority: "High", assignedTo: "John Smith" }
  ],
  repaired: [
    { id: 4, title: "Printer fixed", equipment: "HP LaserJet", location: "Floor 1, Room 101", priority: "Low", assignedTo: "Mike Chen" }
  ],
  overdue: [
    { id: 5, title: "Server overheating", equipment: "Dell PowerEdge", location: "Server Room", priority: "Critical", assignedTo: "David Brown" }
  ],
};

// Technicians Data
export const techniciansList = [
  { id: 'TECH-001', name: 'John Smith', specialty: 'IT Support', available: true, activeRequests: 2, completedToday: 3, avgResponseTime: '1.5h' },
  { id: 'TECH-002', name: 'Mike Chen', specialty: 'Electronics', available: true, activeRequests: 1, completedToday: 5, avgResponseTime: '2.1h' },
  { id: 'TECH-003', name: 'David Brown', specialty: 'Mechanical', available: false, activeRequests: 4, completedToday: 2, avgResponseTime: '3.2h' },
  { id: 'TECH-004', name: 'Emma Wilson', specialty: 'Electrical', available: true, activeRequests: 3, completedToday: 4, avgResponseTime: '1.8h' }
];

// Preventive Maintenance Schedules
export const maintenanceSchedules = [
  { id: 'PM-001', equipment: 'Air Conditioning Units', frequency: 'Monthly', nextDate: 'Jan 5, 2026', assignedTo: 'David Brown', status: 'Scheduled' },
  { id: 'PM-002', equipment: 'Fire Safety Systems', frequency: 'Quarterly', nextDate: 'Feb 15, 2026', assignedTo: 'Emma Wilson', status: 'Scheduled' },
  { id: 'PM-003', equipment: 'Backup Generators', frequency: 'Weekly', nextDate: 'Jan 2, 2026', assignedTo: 'Mike Chen', status: 'Due Soon' },
  { id: 'PM-004', equipment: 'Server Room Cooling', frequency: 'Bi-weekly', nextDate: 'Jan 8, 2026', assignedTo: 'John Smith', status: 'Scheduled' },
  { id: 'PM-005', equipment: 'Elevator Systems', frequency: 'Monthly', nextDate: 'Jan 15, 2026', assignedTo: 'David Brown', status: 'Scheduled' }
];
