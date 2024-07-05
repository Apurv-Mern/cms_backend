const User = require("../models/user");
const Permission = require("../models/permissions");
const RolePermission = require("../models/rolespermissions");
const Role = require("../models/role");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    // Check if permission already exists
    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole) {
      return apiErrorResponse(res, 400, "Role name must be unique");
    }

    // // Fetch permissionId from the Permission table based on permissionName
    // const permission = await Permission.findOne({ where: { permissionName } });
    // if (!permission) {
    //   return apiErrorResponse(res, 400, "Invalid permission name");
    // }
    // const permissionId = permission.permissionId;

    // If roleName is unique, create the role
    const role = await Role.create({ roleName });

    // Create a rolePermission entry
    // const rolePermission = await RolePermission.create({
    //   roleId: role.roleId,
    //   permissionId,
    // });

    apiSuccessResponse(res, 201, role, "Role created successfully");
  } catch (error) {
    console.error("Error creating role:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getRoles = async (req, res) => {
  try {
    console.log("Fetching roles from the database...");

    // Fetch all roles from the database
    const roles = await Role.findAll();

    // console.log("Roles fetched successfully:", roles);
    apiSuccessResponse(res, 200, roles, "Roles fetched successfully");
  } catch (error) {
    console.error("Error fetching roles:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { roleName, permissionNames } = req.body;

    // Find the role by roleId
    const role = await Role.findByPk(roleId);
    if (!role) {
      return apiErrorResponse(res, 404, "Role not found");
    }

    // Update roleName if provided
    if (roleName) {
      // Check if the updated roleName already exists for another role
      if (role.roleName !== roleName) {
        const existingRole = await Role.findOne({ where: { roleName } });
        if (existingRole) {
          return apiErrorResponse(res, 400, "Role name must be unique");
        }
      }
      await role.update({ roleName });
    }

    // Update permissions if permissionNames array is provided
    if (Array.isArray(permissionNames) && permissionNames.length > 0) {
      // Fetch all permissions by their names
      const permissions = await Permission.findAll({
        where: {
          permissionName: permissionNames,
        },
      });

      // Map permission names to permission IDs
      const permissionMap = permissions.reduce((map, perm) => {
        map[perm.permissionName] = perm.permissionId;
        return map;
      }, {});

      // Validate all provided permissionNames exist in the Permission table
      const invalidPermissions = permissionNames.filter(
        (name) => !permissionMap[name]
      );
      if (invalidPermissions.length > 0) {
        return apiErrorResponse(
          res,
          400,
          `Invalid permission names: ${invalidPermissions.join(", ")}`
        );
      }

      // Clear existing role permissions
      await RolePermission.destroy({ where: { roleId } });

      // Create new role permissions
      const rolePermissions = permissionNames.map((permissionName) => ({
        roleId,
        permissionId: permissionMap[permissionName],
        permissionName,
      }));
      await RolePermission.bulkCreate(rolePermissions);
    }

    apiSuccessResponse(res, 200, role, "Role updated successfully");
  } catch (error) {
    console.error("Error updating role:", error);
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

    // Clear existing role permissions
    await RolePermission.destroy({ where: { roleId } });

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
exports.getRolePermissions = async (req, res) => {
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
