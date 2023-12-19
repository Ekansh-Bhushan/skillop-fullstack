const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    __created: {
        type: Date,
        default: Date.now(),
    },
    __lastEdited: {
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    minPerchage: {
        type: Number,
        required: true,
    },
    maxDiscount: {
        type: Number,
        required: true,
    },
    maxUsers: {
        type: Number,
        required: true,
    },
    users: [
        {
            used: {
                type: Boolean,
                default: false,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
            index: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    usedBy: {
        type: Number,
        required: true,
        default: 0,
    },
    validFrom: {
        type: Date,
        required: true,
    },
    validTill: {
        type: Date,
        required: true,
    },
});

CouponSchema.pre("save", function (next) {
    this.code = this.code.toUpperCase();
    this.usedBy = this.users.length;
    next();
});

CouponSchema.methods.isActive = function (perchageValue) {
    if (Date.now() > this.validTill && this.validFrom > Date.now())
        return { status: false, message: "Coupon is not valid today!" };
    
    const currentlyUsedBy = this.users.filter((user) => user.used).length;
    if (currentlyUsedBy >= this.maxUsers)
        return { status: false, message: "Coupon is not valid anymore!" };
    if (perchageValue < this.minPerchage)
        return {
            status: false,
            message: `Coupon is not valid for perchage less than ${this.minPerchage}`,
        };
    return { status: true };
};

CouponSchema.methods.isUsedBy = function (user) {
    return this.users.filter((u) => u.user.toString() === user._id.toString()).length;
};

CouponSchema.methods.use = function (user) {
    const index = this.users.findIndex((u) => u.user.toString() === user._id.toString());
    if (index === -1) {
        this.users.push({ user: user._id });
    } else {
        this.users[index].used = true;
    }
    this.usedBy = this.users.filter((u) => u.used).length;
};
module.exports = mongoose.model("coupons", CouponSchema);
