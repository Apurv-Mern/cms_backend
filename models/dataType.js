const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const DataType = sequelize.define(
  "dataType",
  {
    dataTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataTypeNames: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "dataType",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = DataType;
