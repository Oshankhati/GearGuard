const express = require('express');
const maintenanceController = require('../controllers/maintainanceRequest');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Create a new maintenance request
router.post('/', authMiddleware, maintenanceController.createMaintenanceRequest);

// Get all maintenance requests
router.get('/', authMiddleware, maintenanceController.getAllMaintenanceRequests);

// Get a specific maintenance request by ID
router.get('/:id', authMiddleware, maintenanceController.getMaintenanceRequestById);

// Update a maintenance request
router.put('/:id', authMiddleware, maintenanceController.updateMaintenanceRequest);

// Delete a maintenance request
router.delete('/:id', authMiddleware, maintenanceController.deleteMaintenanceRequest);

// Update maintenance request status
router.patch('/:id/status', authMiddleware, maintenanceController.updateMaintenanceStatus);

module.exports = router;