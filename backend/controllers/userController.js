const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' });
}

// Login user for the Grievance Forum
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        console.log(`Logged in user: ${user.email}, Role: ${user.role}`);

        // Create a token for the Grievance Forum user
        const token = createToken(user._id, user.role);

        res.status(200).json({ email, token, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Signup user for the Grievance Forum
const signupUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.signup(email, password, role);

        // Create a token for the Grievance Forum user
        const token = createToken(user._id, user.role);

        res.status(200).json({ email, token, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };
