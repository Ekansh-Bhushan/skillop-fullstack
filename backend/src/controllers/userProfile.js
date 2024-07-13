const User = require("../models/user");
const Mentor = require("../models/mentor");


const {
    response_500,
    response_200,
    response_404,
    response_400,
} = require("../utils/responseCode.utils");

exports.getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) return response_400(res, "Please, provide username");
        const user = await User.findOne({ username: username });
        if (!user) return response_404(res, "User not found!");
        response_200(res, "User fatched successfully", user);
    } catch (error) {
        response_500(res, "Internal Server Error", err);
    }
};

exports.queryUserByUsername = async (req, res) => {
    try {
        const limit = req.query.limit || 5;
        const skip = req.query.skip || 0;
        const queryUsername = req.query.queryUsername;
        console.log(queryUsername);
        const users = await User.find({
            username: { $regex: queryUsername, $options: "i" },
        })
            .limit(limit)
            .skip(skip);
        // console.log(users);
        response_200(
            res,
            "Users fatched successfully",
            users.map((user) => {
                return {
                    _id: user._id,
                    username: user.username,
                    profilePicUrl: user.profilePicUrl,
                    firstname: user.firstname,
                    lastname: user.lastname,
                };
            })
        );
    } catch (error) {
        response_500(res, "Internal Server Error", err);
    }
};
exports.updateProfile = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ _id: req.user._id });
        let {
            email,
            firstname,
            lastname,
            skills,
            jobTitle,
            education,
            whatsappNumber,
            upiId,
            linkedinId,
            about,
            experence,
            futurePlans,
            pastExp,
            googleRefreshToken,
            username,
        } = req.body;
        // need to verify if this email is valid or not
        if (googleRefreshToken) user.googleRefreshToken = googleRefreshToken;
        if (email) {
            // check email exist or not
            const user2 = await User.findOne({ email: email });
            if (user2 && user2._id.toString() != user._id.toString())
                return response_400(res, "Email already exist");
            user.email = email;
        }
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (skills) user.skills = skills;
        if (jobTitle) user.jobTitle = jobTitle;
        if (whatsappNumber) {
            // Validate whatsappNumber
            if (!/\d{10}/.test(whatsappNumber)) {
                return res.status(400).send({
                    result: false,
                    err: "Invalid whatsapp number",
                    message: "Invalid whatsapp number",
                });
            }
            user.whatsappNumber = whatsappNumber;
        }
        if (upiId) {
            // Validate upiId
            if (!/\w+@\w+/.test(upiId)) {
                return res.status(400).send({
                    result: false,
                    err: "Invalid upi id",
                    message: "Invalid upi id",
                });
            }
            user.upiId = upiId;
        }
        if (linkedinId) {
            // Validate linkedinId
            if (
                !/https:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9]+/.test(linkedinId)
            ) {
                return res.status(400).send({
                    result: false,
                    err: "Invalid linkedin profile link",
                    message: "Invalid linkedin profile link",
                });
            }
            user.linkedinId = linkedinId;
        }
        if (about) user.about = about;
        if (experence && experence.length > 0) {
            if (!user.experence) user.experence = [];
            experence = JSON.parse(experence);
            //check the validity of the experence array
            for (let i = 0; i < experence.length; i++) {
                if (!experence[i].company || !experence[i].title) {
                    return res.status(400).send({
                        result: false,
                        err: "company and title are required",
                        message: "company and title are required",
                    });
                }
            }
            // check if this experence is already present or not in the user's experence array if present then update it else push it
            for (let i = 0; i < experence.length; i++) {
                const index = user.experence.findIndex(
                    (exp) =>
                        exp.company == experence[i].company &&
                        exp.title == experence[i].title
                );
                if (index == -1) {
                    user.experence.push(experence[i]);
                } else {
                    user.experence[index] = experence[i];
                }
            }
        }

        if (futurePlans) user.futurePlans = futurePlans;
        if (pastExp) user.pastExp = pastExp;

        if (username) {
            // Validate username
            if (!/^[a-zA-Z0-9_]{3,}$/.test(username)) {
                return res.status(400).send({
                    result: false,
                    err: "Invalid username",
                    message: "Invalid username",
                });
            }
            // Check if username is already taken or not
            const userWithThisNewUsername = await User.findOne({
                username: username,
            });
            if (userWithThisNewUsername)
                return response_400(res, "Username already taken!");

            user.username = username;
        }

        if (education && education.length > 0) {
            if (!user.education) user.education = [];
            education = JSON.parse(education);
            //check the validity of the education array
            for (let i = 0; i < education.length; i++) {
                if (
                    !education[i].institution ||
                    !education[i].degree ||
                    !education[i].endDate
                ) {
                    return res.status(400).send({
                        result: false,
                        err: "institution, degree and endDate are required",
                        message: "institution, degree and endDate are required",
                    });
                }
                if (!education[i].startDate) {
                    education[i].startDate = new Date()
                        .toISOString()
                        .slice(0, 10);
                    education[i].endDate = new Date()
                        .toISOString()
                        .slice(0, 10);
                    if (education[i].startDate >= education[i].endDate) {
                        return res.status(400).send({
                            result: false,
                            err: "Start date should be less than end date",
                            message: "Start date should be less than end date",
                        });
                    }
                }
            }

            // check if this education is already present or not in the user's education array if present then update it else push it
            for (let i = 0; i < education.length; i++) {
                const index = user.education.findIndex(
                    (edu) =>
                        edu.institution == education[i].institution &&
                        edu.degree == education[i].degree
                );
                if (index == -1) {
                    user.education.push(education[i]);
                } else {
                    user.education[index] = education[i];
                }
            }
        }

        if (req.file)
            if (req.file.fieldname == "profilePic") {
                user.profilePicUrl =
                    process.env.BASE_URL +
                    "/api/public/users/" +
                    req.file.filename;
            }

        await user.save();
        res.status(200).send({
            result: user,
            message: "Profile updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        // try getting userId from query params
        const userId = req.query.userId;
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;
        let user;
        if (!userId) {
            user = await User.findById(req.user._id);
        } else {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).send({
                    result: false,
                    err: "User not found",
                    message: "User not found",
                });
            }
        }
        const followers = [];
        let ct = 0;
        for (let i = skip * limit; i < user.followers.length; i++) {
            if (i >= limit + skip * limit) break;
            // get only name and profilePicUrl
            const follower = await User.findById(user.followers[i]).select(
                "firstname lastname profilePicUrl"
            );
            followers.push(follower);
            ct++;
        }
        return res.status(200).send({
            result: followers,
            message: "Followers fetched successfully",
            limit: ct,
            skip,
        });
    } catch (error) {
        res.status(500).send({
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.getFollowings = async (req, res) => {
    try {
        console.log(req.query);
        const userId = req.query.userId;
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;
        let user;
        if (!userId) {
            user = await User.findById(req.user._id);
        } else {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).send({
                    result: false,
                    err: "User not found",
                    message: "User not found",
                });
            }
        }

        const followings = [];
        let ct = 0;
        for (let i = skip * limit; i < user.followings.length; i++) {
            if (i >= limit + skip * limit) break;
            // get only name and profilePicUrl
            const following = await User.findById(user.followings[i]).select(
                "firstname lastname profilePicUrl"
            );
            followings.push(following);
            console.log(following.toObject());
            ct++;
        }
        return res.status(200).send({
            result: followings,
            message: "Followings fetched successfully",
            limit: ct,
            skip,
        });
    } catch (error) {
        res.status(500).send({
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.addBackgroundPic = async (req, res) => {
    try {
        console.log(req.file, "HELLO");
        if (req.file) {
            if (req.file.fieldname == "profileBackgroundPic") {
                const user = await User.findOne({ _id: req.user._id });
                user.bgPicUrl =
                    process.env.BASE_URL +
                    "/api/public/users/" +
                    req.file.filename;
                await user.save();
                res.status(200).send({
                    result: user,
                    message: "Profile background pic added successfully",
                });
            } else {
                return res.status(400).send({
                    result: false,
                    err: "No file provided",
                    message: "No file provided",
                });
            }
        } else {
            return res.status(400).send({
                result: false,
                err: "No file provided",
                message: "No file provided",
            });
        }
    } catch (error) {
        res.status(500).send({
            err: error.message,
            message: "Internal server error",
            result: false,
        });
    }
};
exports.removeAEducation = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const user = await User.findOne({ _id: req.user._id });
        // remove education based on education id
        const index = user.education.findIndex(
            (edu) => edu._id.toString() == educationId
        );
        if (index == -1) {
            return res.status(400).send({
                result: false,
                err: "No education found with this id",
                message: "No education found with this id",
            });
        }
        user.education.splice(index, 1);
        await user.save();
        res.status(200).send({
            result: true,
            message: "Education removed successfully",
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.editEducation = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const user = await User.findOne({ _id: req.user._id });
        // remove education based on education id
        const index = user.education.findIndex(
            (edu) => edu._id.toString() == educationId
        );
        if (index == -1) {
            return res.status(400).send({
                result: false,
                err: "No education found with this id",
                message: "No education found with this id",
            });
        }
        // Check if all fields are present or not
        const { institution, degree, startDate, endDate } = req.body;
        if (!institution || !degree || !startDate || !endDate) {
            return res.status(400).send({
                result: false,
                err: "institution, degree, startDate and endDate are required",
                message:
                    "institution, degree, startDate and endDate are required",
            });
        }
        // Check if startDate is less than endDate
        if (startDate >= endDate) {
            return res.status(400).send({
                result: false,
                err: "Start date should be less than end date",
                message: "Start date should be less than end date",
            });
        }

        user.education[index] = req.body;
        await user.save();
        res.status(200).send({
            result: true,
            message: "Education edited successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.removeAExperence = async (req, res) => {
    try {
        const experenceId = req.params.experenceId;
        const user = await User.findOne({ _id: req.user._id });
        // remove experence based on experence id
        const index = user.experence.findIndex(
            (exp) => exp._id.toString() == experenceId
        );
        console.log(user.experence, experenceId);
        if (index == -1) {
            return res.status(400).send({
                result: false,
                err: "No experence found with this id",
                message: "No experence found with this id",
            });
        }
        user.experence.splice(index, 1);
        await user.save();
        res.status(200).send({
            result: true,
            message: "Experence removed successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.editExperence = async (req, res) => {
    try {
        const experenceId = req.params.experenceId;
        const user = await User.findOne({ _id: req.user._id });
        // remove experence based on experence id
        const index = user.experence.findIndex(
            (exp) => exp._id.toString() == experenceId
        );
        if (index == -1) {
            return res.status(400).send({
                result: false,
                err: "No experence found with this id",
                message: "No experence found with this id",
            });
        }
        // Check if all fields are present or not
        const { company, title, startDate } = req.body;
        if (!company || !title || !startDate) {
            return res.status(400).send({
                result: false,
                err: "company, title, startDate and endDate are required",
                message: "company, title, startDate and endDate are required",
            });
        }

        // Check if startDate is less than endDate
        if (startDate >= endDate) {
            return res.status(400).send({
                result: false,
                err: "Start date should be less than end date",
                message: "Start date should be less than end date",
            });
        }

        user.experence[index] = req.body;
        await user.save();
        res.status(200).send({
            result: true,
            message: "Experence edited successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.getMyProfile = async (req, res) => {
    try {

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1]; // Get the token part after "Bearer"
        console.log('JWT Token (Profile):', token);

        const user = await User.findById(req.user._id)
            .populate("posts")
            .populate("mentor");

        res.status(200).send({
            result: user,
            message: "Profile fetched successfully",
            
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate("posts")
            .populate("mentor");
        if (!user) {
            return res.status(404).send({
                result: false,
                err: "User not found",
                message: "User not found",
            });
        }
        res.status(200).send({
            result: user,
            message: "Profile fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.getAllUsers = async (req, res) => {
    // console.log("👍")
    try {
        const users = await User.find({});
        res.status(200).send({
            result: users,
            message: "Profile fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.searchUsers = async (req, res) => {
    try {
        // console.log(":)")

        const searchTerm = req.body.searchTerm;
        // const searchTerm = req.query.searchTerm;
        if (!searchTerm) {
            return res.status(400).send({
                result: false,
                err: "No search term provided",
                message: "No search term provided",
            });
        }
        // const users = await User.find({ $text: { $search: searchTerm } });
        const users = await User.find({
            $or: [
                { firstname: { $regex: searchTerm, $options: "i" } },
                { lastname: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
                { jobTitle: { $regex: searchTerm, $options: "i" } },
                { educationInstitution: { $regex: searchTerm, $options: "i" } },
                { skills: { $regex: searchTerm, $options: "i" } },
                { about: { $regex: searchTerm, $options: "i" } },
                { pastExp: { $regex: searchTerm, $options: "i" } },
                { futurePlans: { $regex: searchTerm, $options: "i" } },
            ],
        });
        res.status(200).send({
            result: users,
            message: "Users fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.doIFollow = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(req.user._id);

        if (!user.followings.includes(userId))
            response_200(res, "You don't follow this user", false);

        response_200(res, "You follow this user", true);
    } catch (error) {
        response_500(res, "Internal Server Error", err);
    }
};
