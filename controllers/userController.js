const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");
const UserRole = require("../models/userRole");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      status,
      age,
      roleName,
      password,
    } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    console.log("Email already exists", existingUser);
    if (existingUser) {
      // If the email already exists, return an error response
      return apiErrorResponse(res, 400, "Email already exists");
    }
    // Check if password is provided
    if (!password) {
      return apiErrorResponse(res, 400, "password is required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fetch roleId from the Roles table based on roleName
    const role = await Role.findOne({ where: { roleName } });
    if (!role) {
      return apiErrorResponse(res, 400, "Invalid role name");
    }
    const roleId = role.roleId;

    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      status,
      age,
      roleName,
      password: hashedPassword,
      roleId,
    });

    // Create a UserRole entry
    const userRole = await UserRole.create({
      userId: user.userId,
      roleId,
    });

    apiSuccessResponse(res, 201, user, "user created successfully");
  } catch (error) {
    apiErrorResponse(res, 500, "Internal server error");
    console.error("Error creating user:", error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll({
      order: [["userId", "DESC"]],
    });

    apiSuccessResponse(res, 200, users, "users fetched successfully");
  } catch (error) {
    console.error("Error fetching users:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return apiErrorResponse(res, 404, "User not found");
    }

    apiSuccessResponse(res, 200, user, "user with fetched successfully");
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, gender, status, age, firstName, lastName, password } =
      req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return apiErrorResponse(res, 404, "User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update user attributes
    await user.update({
      firstName,
      lastName,
      email,
      gender,
      status,
      age,
      password: hashedPassword,
    });

    apiSuccessResponse(res, 200, user, "user updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return apiErrorResponse(res, 404, "User not found");
    }

    await user.destroy();
    apiSuccessResponse(res, 200, user, "user deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
