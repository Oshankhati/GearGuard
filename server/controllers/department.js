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

// Assign employee to department
exports.assignEmployeeToDepartment = async (req, res) => {
    try {
        const { userId } = req.body;
        const departmentId = parseInt(req.params.id);

        // Check if department exists
        const department = await prisma.department.findUnique({
            where: { id: departmentId }
        });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Check if employee exists
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId }
        });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update employee's department
        const updatedEmployee = await prisma.employee.update({
            where: { id: employeeId },
            data: { departmentId: departmentId }
        });

        res.status(200).json({
            message: 'Employee assigned to department successfully',
            employee: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};