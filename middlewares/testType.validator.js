const { body } = require("express-validator");

exports.validateTestType = [
  body("user")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID"),

  body("testTypeName")
    .notEmpty().withMessage("Test Type Name is required")
    .isLength({ min: 3 }).withMessage("Test Type Name must be at least 3 characters long"),

  body("testTypeDesc")
    .optional()
    .isString().withMessage("Test Type Description must be a string"),

  body("testFramework")
    .notEmpty().withMessage("Test Framework is required")
    .isIn(["Selenium", "Cypress", "Appium", "Playwright", "K6", "Rest Assured"])
    .withMessage("Invalid Test Framework selected"),
];
