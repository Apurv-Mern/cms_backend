const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const IndexType = sequelize.define(
  "tableData",
  {
    tableName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlSlug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
module.exports = IndexType;
