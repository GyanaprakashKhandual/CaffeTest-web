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

    // format response with testType_id
    res.status(201).json({
      success: true,
      data: {
        testType_id: newTestType._id,
        user: newTestType.user,
        project: newTestType.project,
        testTypeName: newTestType.testTypeName,
        testTypeDesc: newTestType.testTypeDesc,
        testFramework: newTestType.testFramework,
        createdAt: newTestType.createdAt,
        updatedAt: newTestType.updatedAt,
      },
    });
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
      .populate("project", "projectName")
      .lean(); // returns plain JS objects instead of Mongoose docs

    // add testType_id field for each test type
    const formattedTestTypes = testTypes.map((t) => ({
      testType_id: t._id,
      ...t,
    }));

    res.status(200).json({
      success: true,
      count: formattedTestTypes.length,
      data: formattedTestTypes,
    });
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

    res.status(200).json({
      success: true,
      message: "Test Type deleted successfully",
      deletedTestType: {
        testType_id: testType._id,
        testTypeName: testType.testTypeName,
        project: testType.project,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
