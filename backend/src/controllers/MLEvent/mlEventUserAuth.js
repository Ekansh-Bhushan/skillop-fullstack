const mlEventUserSchema = require('../../models/MLEVENT/mlEventUsers');
const upload = require('../../middleware/uploadMiddleware'); 

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

        const newUser = new mlEventUserSchema({
            teamName,
            teamLeaderEmail,
            teamPassword,
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


exports.getAllTeams = async (req, res) => {
    try {
        const teams = await mlEventUserSchema.find({});
        res.status(200).json({ message: 'Teams fetched successfully', teams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};