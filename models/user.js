const { DataTypes } = require('sequelize');

const sequelize = require('./connection');

// Define the User model
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      
    },
    gender: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        
    },
    roleName: {
        type: DataTypes.STRING,
        defaultValue: 'user', 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
      }
},{
tableName: 'users',
});

module.exports = User;
