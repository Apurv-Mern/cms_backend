const { DataTypes } = require('sequelize');

const sequelize = require('./connection');

// Define the User model
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
     
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
      },
     googleId:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    displayName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    githubId:{
        type: DataTypes.STRING,
        allowNull: true,
    },

      
},{
tableName: 'users',
});

module.exports = User;
