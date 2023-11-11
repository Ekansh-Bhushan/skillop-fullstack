const User = require("../../models/user");


exports.beAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.isAdmin = true;
        await user.save();
        res.status(200).send({
            result: true,
            message: "You is now an admin",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
