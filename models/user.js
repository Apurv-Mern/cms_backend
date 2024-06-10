const { DataTypes } = require("sequelize");

const sequelize = require("./connection");
const Role = require("../models/role");
// Define the User model
const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    roleName: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "roleId",
      },

      // softDelete: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: null, // Setting default value to null makes it soft delete
      // },
    },
  },
  {
    tableName: "users",
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

module.exports = User;
