const RolePermission = require("../models/rolespermissions");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
exports.getAll = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    // Check if the roleId is provided
    if (!roleId) {
      return apiErrorResponse(res, 400, "Role ID is required");
    }

    // Fetch role permissions based on the provided roleId
    const rolePermissions = await RolePermission.findAll({
      where: { roleId: roleId },
    });

    // Check if role permissions are found
    if (rolePermissions.length === 0) {
      return apiErrorResponse(res, 404, "Role Permissions not found");
    }

    apiSuccessResponse(
      res,
      200,
      rolePermissions,
      "Role Permissions fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
