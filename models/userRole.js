const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const UserRole = sequelize.define(
  "UserRole",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "User_Roles",
    timestamps: false,
  }
);

module.exports = UserRole;
