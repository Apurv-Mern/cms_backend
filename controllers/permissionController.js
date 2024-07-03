const Permission = require("../models/permissions");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.createPermission = async (req, res) => {
  try {
    const { permissionName } = req.body;

    // Check if Permission already exists
    const existingPermission = await Permission.findOne({
      where: { permissionName },
    });
    if (existingPermission) {
      return apiErrorResponse(res, 400, "Permission name must be unique");
    }

    // If Permission is unique, create the permission
    const permission = await Permission.create({ permissionName });
    apiSuccessResponse(res, 201, permission, "Permission created successfully");
  } catch (error) {
    console.error("Error creating Permission:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.getPermission = async (req, res) => {
  try {
    // Fetch all roles from the database
    const permissions = await Permission.findAll();

    apiSuccessResponse(
      res,
      200,
      permissions,
      "permissions fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching permissions:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;

    // Check if the role exists
    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      return apiErrorResponse(res, 404, "permission not found");
    }

    //   // Check if any users are associated with this role
    //   const usersWithRole = await User.findAll({ where: { roleId } });

    //   if (usersWithRole.length > 0) {
    //     // Soft delete users associated with this role
    //     await Promise.all(
    //       usersWithRole.map((user) =>
    //         User.destroy({ where: { userId: user.userId } })
    //       )
    //     );
    //   }

    // Delete the role
    await permission.destroy({
      where: {
        permissionId,
      },
    });

    apiSuccessResponse(res, 200, null, "permission deleted successfully");
  } catch (error) {
    console.error("Error deleting permission:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
