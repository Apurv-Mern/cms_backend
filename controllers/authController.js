const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!(email && password)) {
      return apiErrorResponse(res, 400, "All input is required");
    }

    // Check if user exists
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return apiErrorResponse(res, 401, "Invalid credentials");
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return apiErrorResponse(res, 401, "Invalid credentials");
    }

    // If user and password are correct, create and return JWT token
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    // Send success response
    return apiSuccessResponse(res, 200, { token, email }, "Login successful");
  } catch (error) {
    console.error("Login error:", error);
    return apiErrorResponse(res, 500, "Internal server error");
  }
};

// Step 1: User Requests Password Reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return apiErrorResponse(res, 404, "User not found");
    }

    // Step 2: Generate Token
    const token = uuidv4();
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Store reset token and expiry in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Step 3: Send Reset Email
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "guy39@ethereal.email",
        pass: "BfYA9dycHKYzhBMbkW",
      },
    });

    const mailOptions = {
      from: "guy39@ethereal.email",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return apiErrorResponse(res, 500, "Failed to send reset email");
      } else {
        console.log("Email sent:", info.response);

        return apiSuccessResponse(res, 200, { resetLink }, "Reset email sent");
      }
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Step 4: Handle Reset Password Page
exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;
  try {
    // Find user by reset token
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: { [Op.gt]: Date.now() }, // Ensure token has not expired
      },
    });

    if (!user) {
      return apiErrorResponse(res, 400, "Invalid or expired token");
    }

    // Validate new password and confirm password
    if (newPassword !== confirmPassword) {
      return apiErrorResponse(
        res,
        400,
        "New password and confirm password do not match"
      );
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return apiSuccessResponse(res, 200, "Password reset successfully");
  } catch (error) {
    console.error("Password reset error:", error);

    return apiErrorResponse(res, 500, "Internal server error");
  }
};
