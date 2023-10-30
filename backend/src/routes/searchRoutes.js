const express = require("express");
const { isAuthorised } = require("../middleware/auth");
const { searchFilterV2 } = require("../controllers/searchFilterController");

const router = express.Router();

router.route("/search").get(isAuthorised, searchFilterV2);

module.exports = router;
