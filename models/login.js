// models/User.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Login = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hash password before saving
  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  // Custom method to compare password
  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  return Login;
};
