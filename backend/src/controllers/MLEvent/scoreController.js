// controllers/scoreController.js
const mlEventUserSchema = require('../../models/MLEVENT/mlEventUsers');
// src/controllers/MLEvent/scoreController.js

// Function to get user's current points
exports.getUserPoints = async (req, res) => {
    try {
        console.log('Request user:', req.user); // Debug log

        const user = await mlEventUserSchema.findOne({ teamLeaderEmail: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ points: user.teamPoints });
    } catch (error) {
        console.error('Error fetching points:', error);
        res.status(500).json({ message: 'Error fetching points', error: error.message });
    }
};

// Function to add points
exports.addPoints = async (req, res) => {
    const { points } = req.body;
    try {
        // Check if req.user is defined and has the email property
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        // Find the user by their email
        const user = await mlEventUserSchema.findOne({ teamLeaderEmail: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Add points to the user's teamPoints
        user.teamPoints += points;
        await user.save();

        res.status(200).json({ message: 'Points added', points: user.teamPoints });
    } catch (error) {
        console.error('Error adding points:', error);
        res.status(500).json({ message: 'Error adding points', error: error.message });
    }
};


// Function to deduct points
exports.deductPoints = async (req, res) => {
    try {
        // Check if req.user is defined and has the email property
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        // Find the user by their email
        const user = await mlEventUserSchema.findOne({ teamLeaderEmail: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.hintUsed) {
            return res.status(400).json({ message: 'Hint already used' });
        }

        // Deduct 2 points and mark hint as used
        user.teamPoints = Math.max(0, user.teamPoints - 2); // Ensure points don't go below 0
        user.hintUsed = true; // Mark that the hint has been used
        await user.save();

        res.status(200).json({ message: 'Points deducted for hint', points: user.teamPoints });
    } catch (error) {
        console.error('Error deducting points:', error);
        res.status(500).json({ message: 'Error deducting points', error: error.message });
    }
};
