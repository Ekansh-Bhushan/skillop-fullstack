
// COUPAN CODE ADDITION

const Coupon = require('../../../models/coupon')
const User = require('../../../models/user')
const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");
exports.addCoupon = (req, res) => {
    try {
        const {
            code,
            discount,
            maxDiscount,
            minPurchase,
            maxUsers,
            expiryDate
        } = req.body
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
}