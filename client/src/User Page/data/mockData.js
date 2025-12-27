export const userProfile = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  id: 'USER-001',
  avatar: 'from-violet-600 to-indigo-600',
  department: 'Engineering'
};

export const initialEquipment = [
  { name: 'Laptop Dell XPS 15', id: 'EQ-001', status: 'In Use', dueDate: 'Dec 31, 2025', category: 'Electronics' },
  { name: 'Wireless Mouse', id: 'EQ-045', status: 'In Use', dueDate: 'Jan 15, 2026', category: 'Accessories' },
  { name: 'USB-C Hub', id: 'EQ-078', status: 'In Use', dueDate: 'Jan 10, 2026', category: 'Accessories' },
  { name: 'Webcam Logitech', id: 'EQ-120', status: 'Pending Return', dueDate: 'Dec 28, 2025', category: 'Electronics' }
];

export const initialRequests = [
  { id: 'REQ-001', equipment: 'MacBook Pro 16"', status: 'Pending', requestDate: '2 hours ago', priority: 'High' },
  { id: 'REQ-002', equipment: 'Standing Desk', status: 'Approved', requestDate: '1 day ago', priority: 'Medium' },
  { id: 'REQ-003', equipment: 'Office Chair', status: 'In Progress', requestDate: '2 days ago', priority: 'Low' }
];

export const initialActivities = [
  { action: 'Requested', item: 'Laptop Dell XPS 15', time: '2 hours ago', type: 'request' },
  { action: 'Returned', item: 'Wireless Keyboard', time: '1 day ago', type: 'return' },
  { action: 'Approved', item: 'Monitor 27"', time: '2 days ago', type: 'approve' },
  { action: 'Requested', item: 'USB-C Hub', time: '3 days ago', type: 'request' }
];
