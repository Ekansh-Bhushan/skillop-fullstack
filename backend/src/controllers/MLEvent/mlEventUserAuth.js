const mlEventUserSchema = require('../../models/MLEVENT/mlEventUsers');
const upload = require('../../middleware/uploadMiddleware'); 
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/MLEVENT/tokenGenerator');

exports.registerUser = async (req, res) => {
    try {
        console.log(req.body, "Received Body");
        console.log(req.file, "Received File");

        const { teamName, teamLeaderEmail, teamPassword, teamNumberOfHints } = req.body;

        if (!teamName || !teamLeaderEmail || !teamPassword) {
            return res.status(400).send({
                result: false,
                message: 'Team name, email, and password are required'
            });
        }

        let profilePicUrl = '';
        if (req.file && req.file.fieldname === "profilePic") {
            profilePicUrl = process.env.BASE_URL + "/api/public/users/" + req.file.filename;
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(teamPassword, 10);

        const newUser = new mlEventUserSchema({
            teamName,
            teamLeaderEmail,
            teamPassword: hashedPassword,
            teamNumberOfHints,
            profilePicUrl,
        });

        await newUser.save();

        res.status(201).send({
            result: newUser,
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            err: error.message,
            message: 'Internal server error',
            result: false,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { teamLeaderEmail, teamPassword } = req.body;

        if (!teamLeaderEmail || !teamPassword) {
            return res.status(400).send({
                result: false,
                message: 'Email and password are required',
            });
        }

        const user = await mlEventUserSchema.findOne({ teamLeaderEmail });
        if (!user) {
            return res.status(401).send({
                result: false,
                message: 'Invalid email or password',
            });
        }

        if (!user.teamPassword) {
            return res.status(500).send({
                result: false,
                message: 'User password not set',
            });
        }

        const isPasswordValid = await bcrypt.compare(teamPassword, user.teamPassword);
        if (!isPasswordValid) {
            return res.status(401).send({
                result: false,
                message: 'Invalid email or password',
            });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).send({
            result: user,
            message: 'Login successful',
            token, // Send token in response
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            err: error.message,
            message: 'Internal server error',
            result: false,
        });
    }
};


exports.getAllTeams = async (req, res) => {
    try {
        // Fetch all teams and sort by points (descending) and finish time (ascending)
        const teams = await mlEventUserSchema.find({})
            .sort({ teamPoints: -1, teamFinishTime: 1 });
        
        res.status(200).json({ message: 'Teams fetched successfully', teams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getLeaderboard = async (req, res) => {
    try {
        // Fetch all teams
        const teams = await mlEventUserSchema.find({});

        // Sort teams by points and finish time
        teams.sort((a, b) => {
            if (b.teamPoints !== a.teamPoints) {
                return b.teamPoints - a.teamPoints; // Sort by points in descending order
            }
            // If points are the same, sort by finish time in ascending order
            return new Date(a.teamFinishTime) - new Date(b.teamFinishTime);
        });

        res.status(200).json({
            message: 'Leaderboard fetched successfully',
            teams
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updatePoints = async (req, res) => {
    try {
        const { teamLeaderEmail, pointsToAdd } = req.body;
        const user = await MlEventUser.findOne({ teamLeaderEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.teamPoints += pointsToAdd;
        user.teamQuestionSolved += 1;
        await user.save();

        res.status(200).json({ message: "Points updated successfully", teamPoints: user.teamPoints });
    } catch (error) {
        res.status(500).json({ message: "Error updating points", error });
    }
};

// Controller to deduct hint and decrease points
exports.useHint = async (req, res) => {
    try {
        const { teamLeaderEmail } = req.body;
        const user = await MlEventUser.findOne({ teamLeaderEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.teamNumberOfHints > 0) {
            user.teamNumberOfHints -= 1;
            user.teamPoints = Math.max(0, user.teamPoints - 2); // Deduct 2 points
            await user.save();

            res.status(200).json({ message: "Hint used successfully", teamPoints: user.teamPoints });
        } else {
            res.status(400).json({ message: "No hints remaining" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error using hint", error });
    }
};