const Role = require("../models/role");
const User = require("../models/user");

const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.createRole = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    // Check if roleName already exists
    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole) {
      return apiErrorResponse(res, 400, "Role name must be unique");
    }

    // If roleName is unique, create the role
    const role = await Role.create({ roleName, permissions });
    apiSuccessResponse(res, 201, role, "Role created successfully");
  } catch (error) {
    console.error("Error creating role:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getRoles = async (req, res) => {
  try {
    // Fetch all roles from the database
    const roles = await Role.findAll();

    apiSuccessResponse(res, 200, roles, "Roles fetched successfully");
  } catch (error) {
    console.error("Error fetching roles:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { roleName } = req.body;

    const role = await Role.findByPk(roleId);

    if (!role) {
      return apiErrorResponse(res, 404, "Role not found");
    }

    // Update role attributes
    await role.update({
      roleName,
    });

    apiSuccessResponse(res, 200, role, "Role updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    // Check if the role exists
    const role = await Role.findByPk(roleId);
    if (!role) {
      return apiErrorResponse(res, 404, "Role not found");
    }

    // Check if any users are associated with this role
    const usersWithRole = await User.findAll({ where: { roleId } });

    if (usersWithRole.length > 0) {
      // Soft delete users associated with this role
      await Promise.all(
        usersWithRole.map((user) =>
          User.destroy({ where: { userId: user.userId } })
        )
      );
    }

    // Delete the role
    await role.destroy({
      where: {
        roleId,
      },
    });

    apiSuccessResponse(res, 200, null, "Role deleted successfully");
  } catch (error) {
    console.error("Error deleting role:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
