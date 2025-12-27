export const technicianProfile = {
  name: 'John Smith',
  role: 'IT Support Staff',
  id: 'TECH-001',
  avatar: 'from-violet-600 to-indigo-600',
  specialty: 'Electronics & IT'
};

export const initialRequests = [
  { 
    id: 'REQ-001', 
    equipment: 'HP LaserJet Printer', 
    issue: 'Paper jam and printing quality issues',
    location: 'Floor 3, Room 301',
    priority: 'High', 
    status: 'New',
    assignedDate: '2 hours ago',
    requestedBy: 'Sarah Johnson',
    estimatedTime: '2-3 hours',
    category: 'Electronics'
  },
  { 
    id: 'REQ-002', 
    equipment: 'Dell Desktop PC', 
    issue: 'System not booting, blue screen error',
    location: 'Floor 2, Room 205',
    priority: 'Critical', 
    status: 'In Progress',
    assignedDate: '5 hours ago',
    requestedBy: 'Mike Chen',
    estimatedTime: '4-5 hours',
    category: 'IT Support',
    hoursSpent: 2.5
  },
  { 
    id: 'REQ-003', 
    equipment: 'Conference Room Projector', 
    issue: 'No display output',
    location: 'Floor 4, Conference Room A',
    priority: 'Medium', 
    status: 'New',
    assignedDate: '1 day ago',
    requestedBy: 'Tom Wilson',
    estimatedTime: '1-2 hours',
    category: 'Electronics'
  },
  { 
    id: 'REQ-004', 
    equipment: 'Network Router', 
    issue: 'Intermittent connection drops',
    location: 'Server Room',
    priority: 'High', 
    status: 'In Progress',
    assignedDate: '3 hours ago',
    requestedBy: 'Admin',
    estimatedTime: '3-4 hours',
    category: 'IT Support',
    hoursSpent: 1
  }
];
