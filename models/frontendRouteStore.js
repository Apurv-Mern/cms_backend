const { DataTypes } = require("sequelize");

const sequelize = require("./connection");

const FrontendRouteStore = sequelize.define(
  "frontendRouteStore",
  {
    RouteStoreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    elementPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requiredPermissions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    tableName: "frontendRouteStore",
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
  }
);
module.exports = FrontendRouteStore;
