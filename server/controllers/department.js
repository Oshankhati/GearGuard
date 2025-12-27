const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if department already exists
        const existingDepartment = await prisma.department.findUnique({ 
            where: { name } 
        });
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department already exists' });
        }

        const department = await prisma.department.create({
            data: {
                name
            }
        });

        res.status(201).json({
            message: 'Department created successfully',
            department
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all departments
exports.getAllDepartments = async (_req, res) => {
    try {
        const departments = await prisma.department.findMany();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await prisma.department.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update department
exports.updateDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        const department = await prisma.department.update({
            where: { id: parseInt(req.params.id) },
            data: { name }
        });

        res.status(200).json({
            message: 'Department updated successfully',
            department
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
    try {
        await prisma.department.delete({
            where: { id: parseInt(req.params.id) }
        });

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Assign users to department
exports.assignUsersToDepartment = async (req, res) => {
    try {
        const { userId, departmentId } = req.body;

        // Check if department exists
        const department = await prisma.department.findUnique({
            where: { id: parseInt(departmentId) }
        });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if employee record exists for this user
        const employee = await prisma.employee.findUnique({
            where: { userId: parseInt(userId) }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee record not found for this user' });
        }

        // Update employee's department
        const updatedEmployee = await prisma.employee.update({
            where: { userId: parseInt(userId) },
            data: { departmentId: parseInt(departmentId) },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                department: true
            }
        });

        res.status(200).json({
            message: 'User assigned to department successfully',
            employee: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};