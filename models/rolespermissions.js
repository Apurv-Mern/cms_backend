const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const Role = require("./role");
const Permissions = require("./permissions");
const RolePermission = sequelize.define(
  "rolesPermissions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "rolesPermissions",
    timestamps: false,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);
// // Role and Permissions association through RolesPermissions
// Role.belongsToMany(Permissions, {
//   through: RolePermission,
//   foreignKey: "roleId",
// });

// Permissions.belongsToMany(Role, {
//   through: RolePermission,
//   foreignKey: "permissionId",
// });

module.exports = RolePermission;
