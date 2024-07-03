// middleware/authMiddleware.js

const { apiErrorResponse } = require("../common/apiResponse");
const UserRoles = require("../models/userRole");
const Role = require("../models/role");
const permissions = require("../models/permissions");
const jwt = require("jsonwebtoken");
// Middleware to check if user has a specific permission
const authorizePermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userDetailsCookie = req.cookies["user-details"];
      if (!userDetailsCookie) {
        return apiErrorResponse(
          res,
          401,
          "Unauthorized - User details cookie not found"
        );
      }

      const { userId } = JSON.parse(userDetailsCookie);
      if (!userId) {
        return apiErrorResponse(
          res,
          401,
          "Unauthorized - Invalid user ID in user details"
        );
      }

      console.log("userId", userId);
      // // Example: Retrieve user roles and permissions from database
      // const userRoles = await UserRoles.findAll({
      //   where: { userId },
      //   include: [
      //     {
      //       model: Role,
      //       include: [{ model: permissions, where: { permissionName } }],
      //     },
      //   ],
      // });

      // // Check if user has the required permission
      // if (!userRoles.length) {
      //   return apiErrorResponse(res, 403, "Unauthorized - No roles found");
      // }

      // // You can adjust this logic based on your specific requirements
      // // For example, checking if any role has the permission
      // const hasPermission = userRoles.some(
      //   (role) => role.permissions.length > 0
      // );

      // if (!hasPermission) {
      //   return apiErrorResponse(
      //     res,
      //     403,
      //     "Unauthorized - Insufficient permissions"
      //   );
      // }

      // User is authorized, proceed to next middleware or route handler
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return apiErrorResponse(res, 500, "Internal server error");
    }
  };
};

module.exports = { authorizePermission };
