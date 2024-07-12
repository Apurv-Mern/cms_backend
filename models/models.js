const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const Models = sequelize.define(
  "Models",
  {
    modelId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlewareOneName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middlewareTwoName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    tableName: "Models",
    paranoid: true,
    updatedAt: true,
    createdAt: true,
    deletedAt: "deletedAt",
  }
);
module.exports = Models;
