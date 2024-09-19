const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const tableData = sequelize.define(
  "tableData",
  {
    tableDataId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    tableName: {
      type: DataTypes.STRING,

      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlSlug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    controllerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "tableData",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = tableData;
