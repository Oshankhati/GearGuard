const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new maintenance request
const createMaintenanceRequest = async (req, res) => {
    try {
        const { subject, type, scheduledDate, equipmentId, createdById } = req.body;

        // Validate required fields
        if (!subject || !type || !equipmentId || !createdById) {
            return res.status(400).json({
                error:
                    "Missing required fields: subject, type, equipmentId, createdById",
            });
        }

        // Validate type enum
        if (!["CORRECTIVE", "PREVENTIVE"].includes(type)) {
            return res.status(400).json({
                error: "Invalid type. Must be CORRECTIVE or PREVENTIVE",
            });
        }

        // Preventive maintenance requires scheduled date
        if (type === "PREVENTIVE" && !scheduledDate) {
            return res.status(400).json({
                error: "Scheduled date is required for preventive maintenance",
            });
        }

        // Fetch equipment with team and technician for auto-fill
        const equipment = await prisma.equipment.findUnique({
            where: { id: parseInt(equipmentId) },
            include: {
                team: true,
            },
        });

        if (!equipment) {
            return res.status(404).json({ error: "Equipment not found" });
        }

        if (equipment.isScrapped) {
            return res.status(400).json({
                error: "Cannot create request for scrapped equipment",
            });
        }

        // Verify creator exists
        const creator = await prisma.user.findUnique({
            where: { id: parseInt(createdById) },
        });

        if (!creator) {
            return res.status(404).json({ error: "Creator user not found" });
        }

        // Create maintenance request and log entry in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const maintenanceRequest = await tx.maintenanceRequest.create({
                data: {
                    subject,
                    type,
                    status: "NEW",
                    scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
                    equipmentId: parseInt(equipmentId),
                    teamId: equipment.teamId,
                    technicianId: null,
                    createdById: parseInt(createdById),
                },
                include: {
                    equipment: {
                        include: {
                            department: true,
                            team: true,
                            technician: {
                                include: {
                                    user: {
                                        select: {
                                            name: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    team: {
                        include: {
                            technicians: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        },
                    },
                },
            });

            // Create maintenance log entry
            await tx.maintenanceLog.create({
                data: {
                    equipmentId: parseInt(equipmentId),
                    maintenanceType: type,
                    description: `Maintenance request created: ${subject}`,
                    performedBy: creator.name,
                    maintenanceDate: new Date(),
                },
            });

            return maintenanceRequest;
        });

        res.status(201).json({
            message: `${
                type === "PREVENTIVE" ? "Preventive maintenance" : "Breakdown"
            } request created successfully`,
            request: result,
            autoFilled: {
                teamId: equipment.teamId,
                teamName: equipment.team.name,
            },
        });
    } catch (error) {
        console.error("Error creating maintenance request:", error);
        res.status(500).json({
            error: "Failed to create maintenance request",
            details: error.message,
        });
    }
};

// Get all unassigned maintenance requests
const getUnassignedRequests = async (req, res) => {
    try {
        const unassignedRequests = await prisma.maintenanceRequest.findMany({
            where: {
                technicianId: null,
                status: {
                    notIn: ["COMPLETED", "CANCELLED"],
                },
            },
            include: {
                equipment: {
                    include: {
                        department: true,
                        team: true,
                    },
                },
                team: {
                    include: {
                        technicians: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            message: "Unassigned requests fetched successfully",
            count: unassignedRequests.length,
            requests: unassignedRequests,
        });
    } catch (error) {
        console.error("Error fetching unassigned requests:", error);
        res.status(500).json({
            error: "Failed to fetch unassigned requests",
            details: error.message,
        });
    }
};

const acceptMaintenanceRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { technicianId } = req.body;

        if (!technicianId) {
            return res.status(400).json({
                error: "Technician ID is required",
            });
        }

        // Check if request exists
        const request = await prisma.maintenanceRequest.findUnique({
            where: { id: parseInt(requestId) },
            include: { team: true },
        });

        if (!request) {
            return res.status(404).json({ error: "Maintenance request not found" });
        }

        if (request.technicianId) {
            return res.status(400).json({
                error: "Request already assigned to a technician",
            });
        }

        if (["COMPLETED", "CANCELLED"].includes(request.status)) {
            return res.status(400).json({
                error: "Cannot accept completed or cancelled request",
            });
        }

        // Verify technician exists and belongs to the team
        const technician = await prisma.technician.findUnique({
            where: { id: parseInt(technicianId) },
            include: { user: true },
        });

        if (!technician) {
            return res.status(404).json({ error: "Technician not found" });
        }

        if (technician.teamId !== request.teamId) {
            return res.status(403).json({
                error: "Technician does not belong to the assigned team",
            });
        }

        // Accept the request and create log entry in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const updatedRequest = await tx.maintenanceRequest.update({
                where: { id: parseInt(requestId) },
                data: {
                    technicianId: parseInt(technicianId),
                    status: "ASSIGNED",
                },
                include: {
                    equipment: {
                        include: {
                            department: true,
                            team: true,
                        },
                    },
                    team: true,
                    technician: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        },
                    },
                },
            });

            // Create maintenance log entry
            await tx.maintenanceLog.create({
                data: {
                    equipmentId: request.equipmentId,
                    maintenanceType: request.type,
                    description: `Request assigned to technician: ${technician.user.name}`,
                    performedBy: technician.user.name,
                    maintenanceDate: new Date(),
                },
            });

            return updatedRequest;
        });

        res.status(200).json({
            message: "Request accepted successfully",
            request: result,
        });
    } catch (error) {
        console.error("Error accepting maintenance request:", error);
        res.status(500).json({
            error: "Failed to accept maintenance request",
            details: error.message,
        });
    }
};

// Update maintenance request status
const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = [
            "NEW",
            "ASSIGNED",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
        ];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }

        // Check if request exists
        const request = await prisma.maintenanceRequest.findUnique({
            where: { id: parseInt(requestId) },
            include: {
                technician: {
                    include: {
                        user: true,
                    },
                },
                createdBy: true,
            },
        });

        if (!request) {
            return res.status(404).json({ error: "Maintenance request not found" });
        }

        // Update the status and create log entry in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const updatedRequest = await tx.maintenanceRequest.update({
                where: { id: parseInt(requestId) },
                data: { status },
                include: {
                    equipment: {
                        include: {
                            department: true,
                            team: true,
                        },
                    },
                    team: true,
                    technician: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        },
                    },
                },
            });

            // Determine who performed the action
            const performedBy = request.technician
                ? request.technician.user.name
                : request.createdBy.name;

            // Create maintenance log entry
            await tx.maintenanceLog.create({
                data: {
                    equipmentId: request.equipmentId,
                    maintenanceType: request.type,
                    description: `Request status changed to: ${status}`,
                    performedBy: performedBy,
                    maintenanceDate: new Date(),
                },
            });

            return updatedRequest;
        });

        res.status(200).json({
            message: "Request status updated successfully",
            request: result,
        });
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({
            error: "Failed to update request status",
            details: error.message,
        });
    }
};

module.exports = {
    createMaintenanceRequest,
    getUnassignedRequests,
    acceptMaintenanceRequest,
    updateRequestStatus,
    getAllMaintenanceRequests: getUnassignedRequests, // Alias
    getMaintenanceRequestById: async (req, res) => {
        try {
            const { id } = req.params;
            const request = await prisma.maintenanceRequest.findUnique({
                where: { id: parseInt(id) },
                include: {
                    equipment: {
                        include: {
                            department: true,
                            team: true,
                        }
                    },
                    team: true,
                    technician: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    createdBy: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });

            if (!request) {
                return res.status(404).json({ error: 'Maintenance request not found' });
            }

            res.json(request);
        } catch (error) {
            console.error('Error fetching request:', error);
            res.status(500).json({ error: 'Failed to fetch request' });
        }
    },
    updateMaintenanceRequest: async (req, res) => {
        try {
            const { id } = req.params;
            const { subject, type, scheduledDate, hoursSpent } = req.body;

            const updateData = {};
            if (subject) updateData.subject = subject;
            if (type) updateData.type = type;
            if (scheduledDate !== undefined) updateData.scheduledDate = scheduledDate ? new Date(scheduledDate) : null;
            if (hoursSpent !== undefined) updateData.hoursSpent = hoursSpent;

            const request = await prisma.maintenanceRequest.update({
                where: { id: parseInt(id) },
                data: updateData,
                include: {
                    equipment: true,
                    team: true,
                    technician: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });

            res.json({
                message: 'Request updated successfully',
                request
            });
        } catch (error) {
            console.error('Error updating request:', error);
            res.status(500).json({ error: 'Failed to update request' });
        }
    },
    deleteMaintenanceRequest: async (req, res) => {
        try {
            const { id } = req.params;

            await prisma.maintenanceRequest.delete({
                where: { id: parseInt(id) }
            });

            res.json({ message: 'Request deleted successfully' });
        } catch (error) {
            console.error('Error deleting request:', error);
            res.status(500).json({ error: 'Failed to delete request' });
        }
    },
    updateMaintenanceStatus: updateRequestStatus // Alias
};
