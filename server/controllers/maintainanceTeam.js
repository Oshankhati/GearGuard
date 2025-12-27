const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all maintenance teams
const getAllMaintenanceTeams = async (req, res) => {
    try {
        const teams = await prisma.maintenanceTeam.findMany({
            include: {
                members: true,
            },
        });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get maintenance team by ID
const getMaintenanceTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await prisma.maintenanceTeam.findUnique({
            where: { id: parseInt(id) },
            include: {
                members: true,
            },
        });
        
        if (!team) {
            return res.status(404).json({ error: 'Maintenance team not found' });
        }
        
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new maintenance team
const createMaintenanceTeam = async (req, res) => {
    try {
        const team = await prisma.maintenanceTeam.create({
            data: req.body,
        });
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update maintenance team
const updateMaintenanceTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await prisma.maintenanceTeam.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete maintenance team
const deleteMaintenanceTeam = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.maintenanceTeam.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Maintenance team deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add technician to maintenance team
const addTechnicianToTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { technicianId } = req.body;
        
        const team = await prisma.maintenanceTeam.update({
            where: { id: parseInt(id) },
            data: {
                members: {
                    connect: { id: parseInt(technicianId) },
                },
            },
            include: {
                members: true,
            },
        });
        
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove technician from maintenance team
const removeTechnicianFromTeam = async (req, res) => {
    try {
        const { id, technicianId } = req.params;
        
        const team = await prisma.maintenanceTeam.update({
            where: { id: parseInt(id) },
            data: {
                members: {
                    disconnect: { id: parseInt(technicianId) },
                },
            },
            include: {
                members: true,
            },
        });
        
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTeams: getAllMaintenanceTeams,
    getTeamById: getMaintenanceTeamById,
    createTeam: createMaintenanceTeam,
    updateTeam: updateMaintenanceTeam,
    deleteTeam: deleteMaintenanceTeam,
    addTechnician: addTechnicianToTeam,
    removeTechnician: removeTechnicianFromTeam
};