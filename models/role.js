const {  DataTypes } = require('sequelize');

const sequelize =require('../models/index');

// Define the role model
const Role = sequelize.define('role', {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
    roleName: {
         type: DataTypes.STRING,
         allowNull: false,
         
  }
});

module.exports =Role;
