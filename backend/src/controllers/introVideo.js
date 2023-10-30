const User = require("../models/user");

exports.uploadIntroVideo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.introVideo =
            process.env.BASE_URL +
            "/api/public/introVideo/" +
            user._id.toString() +
            "/" +
            req.file.filename.replace(/ /g, "%20");
        await user.save();
        res.status(200).send({
            result: true,
            message: "Intro video updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.deleteIntroVideo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.introVideo = null;
        user.save();
        res.status(200).send({
            result: true,
            message: "Intro video deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal server error",
            error: error.message,
        })       
    }
}

