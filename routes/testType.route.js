const express = require("express");
const router = express.Router();
const {
  createTestType,
  getTestTypesByProject,
} = require("../controllers/testType.controller");
const { validateTestType } = require("../middlewares/testType.validator");

// Create new TestType (projectId comes from params, not body)
router.post("/:projectId/test-types", validateTestType, createTestType);

// Get all TestTypes by Project
router.get("/projects/:projectId/test-types", getTestTypesByProject);



module.exports = router;
