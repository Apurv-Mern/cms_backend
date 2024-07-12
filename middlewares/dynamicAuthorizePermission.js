const { apiErrorResponse } = require("../common/apiResponse");
const UserRole = require("../models/userRole");
const Role = require("../models/role");
const Permissions = require("../models/permissions");
const RolePermission = require("../models/rolespermissions");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Model = require("../models/models");

const dynamicAuthorizePermission = async (req, res, next) => {
  try {
    const models = await Model.findAll();
    // console.log("Fetched models:", models);

    // Extract the model name from the request path, assuming the model name is part of the path
    const modelNameFromPath = req.path.split("/")[1];
    // console.log("Model name from path:", req.path);
    const model = models.find(
      (m) => m.modelName.toLowerCase() === modelNameFromPath.toLowerCase()
    );

    if (!model) {
      return apiErrorResponse(res, 400, "Invalid model name in request path");
    }

    const modelName = model.modelName;

    const method = req.method.toLowerCase();

    let action;
    switch (method) {
      case "get":
        action = "read";
        break;
      case "post":
        action = "add";
        break;
      case "put":
        action = "edit";
        break;
      case "delete":
        action = "delete";
        break;
      default:
        return apiErrorResponse(res, 400, "Invalid HTTP method");
    }

    const requiredPermission = `${modelName}_${action}`;
    console.log("Required permission:", requiredPermission);

    authorizePermission(requiredPermission)(req, res, next);
  } catch (error) {
    console.error("Error fetching models:", error);
    return apiErrorResponse(res, 500, "Internal server error");
  }
};

const authorizePermission = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      console.log("requiredPermissions", requiredPermissions);

      const pId = await Permissions.findAll({
        where: { permissionName: requiredPermissions },
      });

      // const token = req.cookies["token"]; // Retrieve token from cookies
      // console.log("authorization from headers ", req.headers["authorization"]);
      const token = req.headers["authorization"].split(" ")[1]; // Retrieve token from headers
      // console.log("token", token);

      if (!token) {
        return apiErrorResponse(res, 401, "Unauthorized - Token not found");
      }

      // Verify and decode the token to get user ID
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decodedToken.id;

      // Optionally, you can validate if user ID exists or is valid in your system
      if (!userId) {
        return apiErrorResponse(res, 401, "Unauthorized - Invalid user ID");
      }

      // Find the permission IDs for the given permission names
      const permissions = await Permissions.findAll({
        where: {
          permissionName: requiredPermissions,
        },
        attributes: ["permissionId"],
      });
      const permissionIds = permissions.map(
        (permission) => permission.permissionId
      );

      if (!permissionIds.length) {
        return apiErrorResponse(
          res,
          403,
          "Unauthorized - No matching permissions found"
        );
      }

      // Retrieve user roles and permissions from database
      const userRoles = await UserRole.findAll({
        where: { userId },
        include: [
          {
            model: Role,
            include: [
              {
                model: Permissions,
                through: {
                  model: RolePermission,
                  where: {
                    permissionId: permissionIds,
                  },
                  attributes: [], // To exclude the join table attributes
                },
              },
            ],
          },
        ],
      });
      const userRolePermissions = userRoles[0]?.Role?.permissions;
      // console.log("userRolesssssssssssssssss", userRoles[0]?.Role?.permissions);

      // Check if user has the required permission
      if (!userRoles.length) {
        return apiErrorResponse(res, 403, "Unauthorized - No roles found");
      }

      // Checking if any role has at least one of the required permissions
      const hasPermission = userRolePermissions.some((permissions) =>
        requiredPermissions.includes(permissions?.permissionName)
      );

      // console.log(hasPermission);

      if (!hasPermission) {
        return apiErrorResponse(
          res,
          403,
          "Unauthorized - Insufficient permissions"
        );
      }

      // User is authorized, proceed to next middleware or route handler
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return apiErrorResponse(res, 500, "Internal server error");
    }
  };
};

module.exports = { dynamicAuthorizePermission };
