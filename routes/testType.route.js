const express = require("express");
const router = express.Router();
const { createTestType, getTestTypesByProject, deleteTestType } = require("../controllers/testTypeController");
const { validateTestType } = require("../validators/testTypeValidator");

// Create new TestType
router.post("/test-type", validateTestType, createTestType);

// Get all TestTypes by Project
router.get("/:projectId", getTestTypesByProject);

// Delete a TestType by ID
router.delete("/:id", deleteTestType);

module.exports = router;
