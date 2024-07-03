const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

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

module.exports = RolePermission;
