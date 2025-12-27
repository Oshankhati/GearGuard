const express = require('express');
const equipmentController = require('../controllers/equipments');

const router = express.Router();

// GET all equipments
router.get('/', equipmentController.getAllEquipments);

// GET single equipment by ID
router.get('/:id', equipmentController.getEquipmentById);

// POST create new equipment
router.post('/', equipmentController.createEquipment);

// DELETE equipment
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;