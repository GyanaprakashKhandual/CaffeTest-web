const { validationResult } = require("express-validator");
const TestType = require("../models/testType.model");

// @desc    Create new TestType
// @route   POST /api/projects/:projectId/test-types
exports.createTestType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { user, testTypeName, testTypeDesc, testFramework } = req.body;
    const { projectId } = req.params;

    const newTestType = await TestType.create({
      user,
      project: projectId, // use projectId from URL
      testTypeName,
      testTypeDesc,
      testFramework,
    });

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
// @route   GET /api/projects/:projectId/test-types
exports.getTestTypesByProject = async (req, res) => {
  try {
    const testTypes = await TestType.find({ project: req.params.projectId })
      .populate("user", "name email")
      .populate("project", "projectName")
      .lean();

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
