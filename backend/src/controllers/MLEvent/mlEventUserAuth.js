const mlEventUserSchema = require('../../models/MLEVENT/mlEventUsers');
const upload = require('../../middleware/uploadMiddleware'); 
const bcrypt = require('bcryptjs');

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

        // Check if both email and password are provided
        if (!teamLeaderEmail || !teamPassword) {
            return res.status(400).send({
                result: false,
                message: 'Email and password are required',
            });
        }

        // Find user by teamLeaderEmail
        const user = await mlEventUserSchema.findOne({ teamLeaderEmail });
        if (!user) {
            return res.status(401).send({
                result: false,
                message: 'Invalid email or password',
            });
        }

        // Debug logging
        console.log('Retrieved user:', user);
        console.log('Password provided:', teamPassword);
        console.log('Stored password hash:', user.teamPassword);

        // Ensure the user has a valid password before comparing
        if (!user.teamPassword) {
            return res.status(500).send({
                result: false,
                message: 'User password not set',
            });
        }

        // Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(teamPassword, user.teamPassword);
        if (!isPasswordValid) {
            return res.status(401).send({
                result: false,
                message: 'Invalid email or password',
            });
        }

        // Send success response if login is successful
        res.status(200).send({
            result: user,
            message: 'Login successful',
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
        const teams = await mlEventUserSchema.find({});
        res.status(200).json({ message: 'Teams fetched successfully', teams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};