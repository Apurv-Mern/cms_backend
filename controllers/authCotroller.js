// controllers/authController.js

const User = require('../models/user');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If user and password are correct, create and return JWT token
    const token = user.generateAuthToken();
    res.json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
