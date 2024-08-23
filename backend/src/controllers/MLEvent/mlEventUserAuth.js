// mlEventUserController.js
const mlEventUserSchema = require('../../models/MLEVENT/mlEventUsers');
// Controller function to register a new user
exports.registerUser = async (req, res) => {
    try {
        const { teamName, teamLeaderEmail, teamPassword, teamPoints, teamFinishTime, teamNumberOfHints, teamQuestionSolved, profilePicUrl } = req.body;

        // Validate input
        if (!teamName || !teamLeaderEmail || !teamPassword) {
            return res.status(400).json({ message: 'Team name, email, and password are required' });
        }

        // Create new user
        const newUser = new mlEventUserSchema({
            teamName,
            teamLeaderEmail,
            teamPassword,
            teamPoints,
            teamFinishTime,
            teamNumberOfHints,
            teamQuestionSolved,
            profilePicUrl
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
