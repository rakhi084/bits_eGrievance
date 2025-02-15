const express = require('express');

// Import GrievanceController (or whatever controller handles grievances)
const {
    createGrievance,
    getGrievance,
    getGrievances,
    deleteGrievance,
    updateGrievance,
    updateGrievanceStatusAndReply
} = require("../controllers/grievanceController");

// Require authentication for all grievance routes
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// GET all Grievances
router.get('/', getGrievances);

// GET a single Grievance
router.get('/:id', getGrievance);

// POST a new Grievance
router.post('/', createGrievance);

// DELETE a Grievance
router.delete('/:id', deleteGrievance);

// UPDATE a Grievance
router.patch('/:id', updateGrievance);

router.post('/:id/update', updateGrievanceStatusAndReply);

module.exports = router;
