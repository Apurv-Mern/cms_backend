const { DataTypes, INTEGER } = require("sequelize");

const sequelize = require("./connection");

const Settings = sequelize.define(
  "settings",
  {
    settingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pathForFile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },

  {
    tableName: "settings",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = Settings;
