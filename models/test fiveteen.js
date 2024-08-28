const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection"); // Adjust the path to your database connection

const testFiveteen = sequelize.define(
  "testFiveteen",
  {
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "testFiveteen",
    timestamps: false,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

module.exports = testFiveteen;
