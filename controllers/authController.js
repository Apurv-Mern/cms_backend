const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { apiSuccessResponse, apiErrorResponse } = require('../common/apiResponse');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!(email && password)) {
      return apiErrorResponse(res, 400, 'All input is required');
    }

    // Check if user exists
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return apiErrorResponse(res, 401, 'Invalid credentials');
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return apiErrorResponse(res, 401, 'Invalid credentials');
    }

    // If user and password are correct, create and return JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });

    // Send success response
    return apiSuccessResponse(res, 200, { token, email }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return apiErrorResponse(res, 500, 'Internal server error');
  }
  
};
