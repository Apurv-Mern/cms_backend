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
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: DataTypes.NOW,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: DataTypes.NOW,
    // },
  },

  {
    tableName: "roles",
    createdAt: true,
    updatedAt: true,
  }
);
module.exports = Role;
