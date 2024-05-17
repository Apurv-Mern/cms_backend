const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userlogin');
const { apiSuccessResponse, apiErrorResponse } = require('../common/apiResponse');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ where: { email } });
    user = await User.create({ email, password });
    // if (!user) {
    //   // Create new user
    // } else {
    //   // If user already exists, send error response
    //   return apiErrorResponse(res, 400,  'User already exists' );
    // }

    // Check if email and password are provided
    if (!(email && password)) {
      return apiErrorResponse(res, 400, 'All input is required' )
    }
    if (user) {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return apiErrorResponse(res, 401, 'Invalid credentials');
  }
}

    // If user and password are correct, create and return JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true });

    // Send success response
    return apiSuccessResponse(res, 200, { token,email }, 'Login successful');

  } catch (error) {
    console.error('Login error:', error);
    return apiErrorResponse(res, 500, 'Internal server error' )
  }
};
