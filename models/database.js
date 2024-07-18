const { DataTypes, INTEGER } = require("sequelize");

const sequelize = require("./connection");

const Database = sequelize.define(
  "database",
  {
    databaseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tableName: {
      type: DataTypes.STRING,
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notNull: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    autoIncrement: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    index: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    defaultValue: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },

  {
    tableName: "database",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = Database;
