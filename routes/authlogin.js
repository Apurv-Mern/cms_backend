// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authCotroller');

// POST request to login
router.post('/login', authController.login);

module.exports = router;
