const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const Permissions = sequelize.define(
  "permissions",
  {
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    permissionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "permissions",
    createdAt: true,
    paranoid: true,
    updatedAt: true,
    deletedAt: "deletedAt",
  }
);
module.exports = Permissions;
