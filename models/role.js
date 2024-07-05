const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const Role = sequelize.define(
  "Role",
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // permissions: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    // },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },

  {
    tableName: "roles",
    paranoid: true,
    updatedAt: true,
    createdAt: true,
    deletedAt: "deletedAt",
  }
);
module.exports = Role;
