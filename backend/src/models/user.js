const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { MENTOR_STATUS } = require("../enums/mentorStatus");
const getHashTags = require("../utils/getHashTags");
const Hashtags = require("./hashtags");

const UserSchema = new mongoose.Schema({
    // Auto Created each time a user is created
    __created: {
        type: Date,
        default: Date.now,
    },

    __lastVisited: {
        type: Date,
        default: Date.now,
    },

    // Required Info
    firstname: {
        type: String,
        required: [true, "first name is required"],
        // validate: {
        //     validator: function (v) {
        //         return /^[a-zA-Z ]+$/.test(v); // Basic name format validation
        //     },
        //     message: (name) => `${name.value} is not a valid name!`,
        // },
    },
    lastname: {
        type: String,
        required: [true, "last name is required"],
        // validate: {
        //     validator: function (v) {
        //         return /^[a-zA-Z ]+$/.test(v); // Basic name format validation
        //     },
        //     message: (name) => `${name.value} is not a valid name!`,
        // },
    },
    email: {
        type: String,
        default: false,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"],
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v); // Basic email format validation
            },
            message: (email) => `${email.value} is not a valid email address!`,
        },
    },
    username: {
        type: String,
    },
    hashtags: {
        type: [String],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "Password must be atleast 6 character"],
    },

    // Stores all the created posts
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    ],
    becomingMentorStatus: {
        type: String,
        enum: MENTOR_STATUS,
        default: MENTOR_STATUS.NOT_APPLIED,
    },

    connects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],

    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],

    postViewed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    ],

    postLiked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    ],

    // postImpressed: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "posts",
    //     },
    // ],

    profilePicUrl: { type: String },
    profilePicBackgroundUrl: { type: String },
    bgPicUrl: { type: String },
    introVideo: { type: String },

    isMentor: { type: Boolean, default: false, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSocietyMember: { type: Boolean, default: false, required: true }, // added society part 

    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mentors",
        // required: function () {
        //     return this.isMentor;
        // },
        default: null,
    },

    skills: [
        {
            type: String,
        },
    ],

    jobTitle: { type: String, default: "student" },

    // educationInstitution: { type: String },
    // // startYear: {
    // //     type: Number,
    // //     validate: {
    // //         validator: Number.isInteger,
    // //         message: "{VALUE} is not an integer value",
    // //     },
    // // },
    // endYear: {
    //     type: Number,
    //     validate: {
    //         validator: Number.isInteger,
    //         message: "{VALUE} is not an integer value",
    //     },
    // },

    // education
    education: [
        {
            institution: String,
            degree: String,
            fieldOfStudy: String,
            startDate: Date,
            endDate: {
                type: Date,
                default: null, // Set the default value to null to represent ongoing experience
            },
            country: String,
            state: String,
            city: String,
        },
    ],

    // validate a phone number
    whatsappNumber: {
        type: String,
        // validate: {
        //     validator: function (v) { return /\d{10}/.test(v); },
        //     message: '{VALUE} is not a valid phone number!'
        // },
        default: "",
    },
    // validate upiId
    upiId: {
        type: String,
        default: "",
    },

    // validate linkedinId
    linkedinId: {
        type: String,
        default: "",
        // validate: {
        //     validator: function (v) {
        //         return /https:\/\/www.linkedin.com\/in\/[a-zA-Z0-9]+/.test(v);
        //     },
        //     message: "{VALUE} is not a valid linkedin profile link!",
        // },
    },
    about: { type: String, default: "" },
    pastExp: { type: String, default: "" },
    experence: [
        {
            title: String,
            company: String,
            location: String,
            startDate: Date,
            endDate: {
                type: Date,
                default: null, // Set the default value to null to represent ongoing experience
            },
            description: String,
        },
    ],
    futurePlans: { type: String, default: "" },
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "notifications",
        },
    ],
    // for resetting password
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    meetScheduled: String,
    googleRefreshToken: {
        type: String,
        default: null,
    },
    zoomRefreshToken: {
        type: String,
        default: null,
    },

    googleID: {
        type: String,
        default: null,
    },
});

// Reset password token generation
UserSchema.methods.generatePasswordReset = function () {
    const token = crypto.randomBytes(20).toString("hex");
    // console.log(token);
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    // console.log(
    //     Date.now() + process.env.PASSWORD_RESET_LINK_EXPIRY * 60 * 1000
    // );
    this.resetPasswordExpires =
        Date.now() + process.env.PASSWORD_RESET_LINK_EXPIRY * 60 * 1000;
    return token;
};

// Password Hashing
UserSchema.pre("save", async function (next) {
    if (this.isModified("about")) {
        this.hashtags = getHashTags(this.about);
        console.log(this.hashtags); 
        for (let i = 0; i < this.hashtags.length; i++) {
            const hashtag = await Hashtags.findOne({
                hashtag: this.hashtags[i],
            });
            if (hashtag) {
                hashtag.users.push(this._id);
                await hashtag.save();
            } else {
                const newHashtag = new Hashtags({
                    hashtag: this.hashtags[i],
                    users: [this._id],
                });
                await newHashtag.save();
            }
        }
        return next();
    }
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password Compare
UserSchema.methods.comparePassword = async function (password) {
    // console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
};

// Generate Token
UserSchema.methods.generateToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
    });
};

module.exports = mongoose.model("users", UserSchema);
