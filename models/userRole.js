

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserRole = sequelize.define('UserRole', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // If you want an auto-incrementing primary key
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: 'User_Roles',
        timestamps: false,
      

    });

module.exports = UserRole;
