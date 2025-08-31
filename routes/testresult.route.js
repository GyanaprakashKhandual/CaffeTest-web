const express = require("express");
const router = express.Router();
const { storeTestResults } = require("../controllers/testresult.controller");
const protect = require("../middlewares/auth.middleware");


// POST /api/test-results
router.post("/", protect, storeTestResults);

module.exports = router;
