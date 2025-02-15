// Import grievance model
const Grievance = require('../models/grievanceModel');

const mongoose = require('mongoose');

// GET all Grievances
const getGrievances = async (req, res) => {
    try {
        let query = {};
        
        // Check if the user is an admin
        if (req.user && req.headers['x-user-role'] === 'admin') {
            // If the user is an admin, fetch all grievances
            query = {};
        } else if (req.user) {
            // If the user is not an admin, fetch only their grievances
            query = { user_id: req.user._id };
        } else {
            // If there is no user (not logged in), handle it accordingly
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // { createdAt: -1 } => show the database in descending order, which means showing the latest grievances first
        const grievances = await Grievance.find(query).sort({ createdAt: -1 });

        res.status(200).json(grievances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// GET a single Grievance
const getGrievance = async (req, res) => {
    // It gives the ID in the address bar (grievances.js)
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    const grievance = await Grievance.findById(id);

    if (!grievance) {
        // If not found, stop this function using return
        return res.status(404).json({ error: "No such Grievance" });
    }

    res.status(200).json(grievance);
}


// POST (create) a new Grievance
const createGrievance = async (req, res) => {
    const { title, description, userType, department, category, status, reply } = req.body;

    // Validate required fields
    const requiredFields = ['title', 'description', 'userType', 'department', 'category'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Please fill out the following fields: ${missingFields.join(', ')}` });
    }

    try {
        const user_id = req.user._id;
        const grievance = await Grievance.create({
            title,
            description,
            userType,
            department,
            category,
            user_id,
            status, // Add the status property to the new grievance
            reply, // Add the reply property to the new grievance
        });
        res.status(200).json(grievance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// DELETE a Grievance
const deleteGrievance = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    const grievance = await Grievance.findOneAndDelete({ _id: id });

    if (!grievance) {
        // If not found, stop this function using return
        return res.status(404).json({ error: "No such Grievance" });
    }

    res.status(200).json(grievance);
}

// UPDATE a Grievance
const updateGrievance = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    const grievance = await Grievance.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!grievance) {
        // If not found, stop this function using return
        return res.status(404).json({ error: "No such Grievance" });
    }

    res.status(200).json(grievance);
}

// POST (update) a Grievance with status and reply
const updateGrievanceStatusAndReply = async (req, res) => {
    const { id } = req.params;
    const { status, reply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Grievance" });
    }

    try {
        const grievance = await Grievance.findByIdAndUpdate(id, { status, reply }, { new: true });

        if (!grievance) {
            return res.status(404).json({ error: "No such Grievance" });
        }

        res.status(200).json(grievance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getGrievance,
    getGrievances,
    createGrievance,
    deleteGrievance,
    updateGrievance,
    updateGrievanceStatusAndReply
}
