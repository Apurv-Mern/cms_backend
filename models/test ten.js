
  const { Sequelize, DataTypes } = require('sequelize');
  const sequelize = require('../connection'); // Adjust the path to your database connection
  
  const testTen = sequelize.define('testTen', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        
        primaryKey: true,
      }.join(",")
  }, {
    tableName: 'testTen',
  timestamps: false,
        
  });
  
  module.exports = testTen;
  