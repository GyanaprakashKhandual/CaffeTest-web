const { validationResult } = require("express-validator");
const TestType = require("../models/testType.model");

// @desc    Create new TestType
// @route   POST /api/test-types
exports.createTestType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { user, project, testTypeName, testTypeDesc, testFramework } = req.body;

    const newTestType = await TestType.create({
      user,
      project,
      testTypeName,
      testTypeDesc,
      testFramework,
    });

    res.status(201).json({ success: true, data: newTestType });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all TestTypes for a project
// @route   GET /api/test-types/:projectId
exports.getTestTypesByProject = async (req, res) => {
  try {
    const testTypes = await TestType.find({ project: req.params.projectId })
      .populate("user", "name email")
      .populate("project", "projectName");

    res.status(200).json({ success: true, count: testTypes.length, data: testTypes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a TestType
// @route   DELETE /api/test-types/:id
exports.deleteTestType = async (req, res) => {
  try {
    const testType = await TestType.findByIdAndDelete(req.params.id);

    if (!testType) {
      return res.status(404).json({ success: false, message: "Test Type not found" });
    }

    res.status(200).json({ success: true, message: "Test Type deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
