const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const Role = sequelize.define(
  "role",
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
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
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
    createdAt: true,
    paranoid: true,
    updatedAt: true,

    deletedAt: "deletedAt",
  }
);
module.exports = Role;
