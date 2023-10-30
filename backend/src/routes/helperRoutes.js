const express = require("express");
const { getInfo } = require("../controllers/helperController");

const router = express.Router();

router.route("/info").get(getInfo)

module.exports = router;