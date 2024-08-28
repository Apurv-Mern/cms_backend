const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const tableRows = sequelize.define(
  "tableData",
  {
    tableRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    visibility: {
      type: DataTypes.JSON,

      allowNull: false,
    },
    inputType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionalDetails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    tableName: "tableRows",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = tableRows;
