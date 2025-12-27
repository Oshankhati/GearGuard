const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in correct order due to foreign keys)
  await prisma.maintenanceLog.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.technician.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.maintenanceTeam.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  console.log('✅ Cleared existing data');

  // 1. Create Roles
  const roles = await Promise.all([
    prisma.role.create({ data: { name: 'ADMIN' } }),
    prisma.role.create({ data: { name: 'MANAGER' } }),
    prisma.role.create({ data: { name: 'TECHNICIAN' } }),
    prisma.role.create({ data: { name: 'REQUESTER' } }),
  ]);
  console.log('✅ Created 4 roles');

  // 2. Create Users
  const users = await Promise.all([
    // Admin
    prisma.user.create({
      data: {
        name: 'John Admin',
        email: 'admin@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV', // hashed: admin123
        roleId: roles[0].id,
      },
    }),
    // Manager
    prisma.user.create({
      data: {
        name: 'Sarah Manager',
        email: 'sarah.manager@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV', // hashed: manager123
        roleId: roles[1].id,
      },
    }),
    // Technicians
    prisma.user.create({
      data: {
        name: 'Mike Technician',
        email: 'mike.tech@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV', // hashed: tech123
        roleId: roles[2].id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Lisa Technician',
        email: 'lisa.tech@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV',
        roleId: roles[2].id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'David Technician',
        email: 'david.tech@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV',
        roleId: roles[2].id,
      },
    }),
    // Requesters (Employees)
    prisma.user.create({
      data: {
        name: 'Emily Johnson',
        email: 'emily.johnson@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV',
        roleId: roles[3].id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Robert Smith',
        email: 'robert.smith@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV',
        roleId: roles[3].id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Anna Williams',
        email: 'anna.williams@gearguard.com',
        password: '$2a$10$rQ8kKVVxR7KmPxFBKJKYdOQYZKZ9N.9qYvGvQxKVxK5KxKVxKVxKV',
        roleId: roles[3].id,
      },
    }),
  ]);
  console.log('✅ Created 8 users');

  // 3. Create Departments
  const departments = await Promise.all([
    prisma.department.create({ data: { name: 'IT Department' } }),
    prisma.department.create({ data: { name: 'Facilities Management' } }),
    prisma.department.create({ data: { name: 'Production' } }),
    prisma.department.create({ data: { name: 'Logistics' } }),
  ]);
  console.log('✅ Created 4 departments');

  // 4. Create Employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        userId: users[5].id, // Emily Johnson
        departmentId: departments[0].id, // IT
      },
    }),
    prisma.employee.create({
      data: {
        userId: users[6].id, // Robert Smith
        departmentId: departments[2].id, // Production
      },
    }),
    prisma.employee.create({
      data: {
        userId: users[7].id, // Anna Williams
        departmentId: departments[1].id, // Facilities
      },
    }),
  ]);
  console.log('✅ Created 3 employees');

  // 5. Create Maintenance Teams
  const teams = await Promise.all([
    prisma.maintenanceTeam.create({ data: { name: 'Electrical Team' } }),
    prisma.maintenanceTeam.create({ data: { name: 'Mechanical Team' } }),
    prisma.maintenanceTeam.create({ data: { name: 'IT Support Team' } }),
  ]);
  console.log('✅ Created 3 maintenance teams');

  // 6. Create Technicians
  const technicians = await Promise.all([
    prisma.technician.create({
      data: {
        userId: users[2].id, // Mike Technician
        teamId: teams[0].id, // Electrical Team
      },
    }),
    prisma.technician.create({
      data: {
        userId: users[3].id, // Lisa Technician
        teamId: teams[1].id, // Mechanical Team
      },
    }),
    prisma.technician.create({
      data: {
        userId: users[4].id, // David Technician
        teamId: teams[2].id, // IT Support Team
      },
    }),
  ]);
  console.log('✅ Created 3 technicians');

  // 7. Create Equipment
  const equipment = await Promise.all([
    prisma.equipment.create({
      data: {
        name: 'CNC Machine Model X1',
        serialNumber: 'CNC-2023-001',
        purchaseDate: new Date('2023-01-15'),
        warrantyExpiry: new Date('2026-01-15'),
        location: 'Production Floor - Section A',
        departmentId: departments[2].id, // Production
        employeeId: employees[1].id, // Robert Smith
        teamId: teams[1].id, // Mechanical Team
        technicianId: technicians[1].id, // Lisa
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'HVAC Unit - North Wing',
        serialNumber: 'HVAC-2022-045',
        purchaseDate: new Date('2022-06-10'),
        warrantyExpiry: new Date('2025-06-10'),
        location: 'North Wing - 2nd Floor',
        departmentId: departments[1].id, // Facilities
        employeeId: employees[2].id, // Anna Williams
        teamId: teams[0].id, // Electrical Team
        technicianId: technicians[0].id, // Mike
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Server Rack SR-101',
        serialNumber: 'SERVER-2024-010',
        purchaseDate: new Date('2024-03-20'),
        warrantyExpiry: new Date('2027-03-20'),
        location: 'Data Center - Room 1',
        departmentId: departments[0].id, // IT
        employeeId: employees[0].id, // Emily Johnson
        teamId: teams[2].id, // IT Support Team
        technicianId: technicians[2].id, // David
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Forklift FL-205',
        serialNumber: 'FORK-2021-305',
        purchaseDate: new Date('2021-08-05'),
        warrantyExpiry: new Date('2024-08-05'),
        location: 'Warehouse - Bay 3',
        departmentId: departments[3].id, // Logistics
        employeeId: null,
        teamId: teams[1].id, // Mechanical Team
        technicianId: technicians[1].id, // Lisa
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Generator GEN-500',
        serialNumber: 'GEN-2020-112',
        purchaseDate: new Date('2020-11-12'),
        warrantyExpiry: new Date('2023-11-12'),
        location: 'Building Basement',
        isScrapped: true,
        departmentId: departments[1].id, // Facilities
        employeeId: null,
        teamId: teams[0].id, // Electrical Team
        technicianId: technicians[0].id, // Mike
      },
    }),
  ]);
  console.log('✅ Created 5 equipment items');

  // 8. Create Maintenance Requests
  const requests = await Promise.all([
    // NEW Request
    prisma.maintenanceRequest.create({
      data: {
        subject: 'CNC Machine making unusual noise',
        type: 'CORRECTIVE',
        status: 'NEW',
        equipmentId: equipment[0].id,
        teamId: teams[1].id,
        technicianId: null,
        createdById: users[6].id, // Robert Smith
      },
    }),
    // IN_PROGRESS Request
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Quarterly HVAC maintenance',
        type: 'PREVENTIVE',
        status: 'IN_PROGRESS',
        scheduledDate: new Date('2025-01-15'),
        hoursSpent: 2.5,
        equipmentId: equipment[1].id,
        teamId: teams[0].id,
        technicianId: technicians[0].id,
        createdById: users[1].id, // Sarah Manager
      },
    }),
    // REPAIRED Request
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Server cooling fan replacement',
        type: 'CORRECTIVE',
        status: 'REPAIRED',
        hoursSpent: 1.5,
        equipmentId: equipment[2].id,
        teamId: teams[2].id,
        technicianId: technicians[2].id,
        createdById: users[5].id, // Emily Johnson
      },
    }),
    // SCRAP Request
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Generator beyond repair - recommend scrap',
        type: 'CORRECTIVE',
        status: 'SCRAP',
        hoursSpent: 3.0,
        equipmentId: equipment[4].id,
        teamId: teams[0].id,
        technicianId: technicians[0].id,
        createdById: users[7].id, // Anna Williams
      },
    }),
    // Preventive scheduled for future
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Monthly forklift inspection',
        type: 'PREVENTIVE',
        status: 'NEW',
        scheduledDate: new Date('2025-02-01'),
        equipmentId: equipment[3].id,
        teamId: teams[1].id,
        technicianId: null,
        createdById: users[1].id, // Sarah Manager
      },
    }),
  ]);
  console.log('✅ Created 5 maintenance requests');

  // 9. Create Maintenance Logs
  await Promise.all([
    // Logs for IN_PROGRESS request
    prisma.maintenanceLog.create({
      data: {
        action: 'STATUS_CHANGED',
        oldValue: 'NEW',
        newValue: 'IN_PROGRESS',
        requestId: requests[1].id,
        userId: users[1].id, // Sarah Manager
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        action: 'ASSIGNED',
        oldValue: null,
        newValue: 'Mike Technician',
        requestId: requests[1].id,
        userId: users[1].id,
      },
    }),
    // Logs for REPAIRED request
    prisma.maintenanceLog.create({
      data: {
        action: 'STATUS_CHANGED',
        oldValue: 'NEW',
        newValue: 'IN_PROGRESS',
        requestId: requests[2].id,
        userId: users[4].id, // David Technician
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        action: 'STATUS_CHANGED',
        oldValue: 'IN_PROGRESS',
        newValue: 'REPAIRED',
        requestId: requests[2].id,
        userId: users[4].id,
      },
    }),
    // Logs for SCRAP request
    prisma.maintenanceLog.create({
      data: {
        action: 'STATUS_CHANGED',
        oldValue: 'IN_PROGRESS',
        newValue: 'SCRAP',
        requestId: requests[3].id,
        userId: users[1].id, // Sarah Manager
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        action: 'SCRAPPED',
        oldValue: null,
        newValue: 'Equipment marked as scrapped - beyond economical repair',
        requestId: requests[3].id,
        userId: users[1].id,
      },
    }),
  ]);
  console.log('✅ Created 6 maintenance logs');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('- 4 Roles (ADMIN, MANAGER, TECHNICIAN, REQUESTER)');
  console.log('- 8 Users');
  console.log('- 4 Departments');
  console.log('- 3 Employees');
  console.log('- 3 Maintenance Teams');
  console.log('- 3 Technicians');
  console.log('- 5 Equipment items (1 scrapped)');
  console.log('- 5 Maintenance Requests (across all statuses)');
  console.log('- 6 Maintenance Logs');
  console.log('\n🔐 Test Credentials:');
  console.log('Admin: admin@gearguard.com');
  console.log('Manager: sarah.manager@gearguard.com');
  console.log('Technician: mike.tech@gearguard.com');
  console.log('Requester: emily.johnson@gearguard.com');
  console.log('Password for all: (needs bcrypt hashing - placeholder used)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
