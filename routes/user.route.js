const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");
const { registerValidation } = require("../middlewares/user.middlware");
const validate = require("../middlewares/validate.middleware");
router.post("/send-otp", authController.sendOTP);
router.post(
  "/register",
  validate(registerValidation),
  authController.verifyOTPAndRegister
);
router.post("/login", authController.loginUser);

module.exports = router;

