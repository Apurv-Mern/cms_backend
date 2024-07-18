const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const IndexType = sequelize.define(
  "indexType",
  {
    dataTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    indexTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "indexType",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = IndexType;
