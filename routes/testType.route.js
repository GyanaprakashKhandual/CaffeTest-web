const express = require("express");
const router = express.Router();
const { createTestType, getTestTypesByProject, deleteTestType } = require("../controllers/testType.controller");
const { validateTestType } = require("../middlewares/testType.validator");

// Create new TestType
router.post("/test-type", validateTestType, createTestType);

// Get all TestTypes by Project
router.get("/:projectId", getTestTypesByProject);

// Delete a TestType by ID
router.delete("/:id", deleteTestType);

module.exports = router;
