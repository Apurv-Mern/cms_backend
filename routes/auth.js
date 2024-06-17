// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { apiSuccessResponse } = require("../common/apiResponse");

// POST request to login
router.post("/login", authController.login);
router.post("/request-password-reset", authController.requestPasswordReset);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
