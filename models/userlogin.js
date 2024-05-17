const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./connection'); 

const Userlogin = sequelize.define('Userlogin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
},{
  
    tableName: 'Userlogin',
    timestamps: true,

});

// Hash password before saving
Userlogin.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// Custom method to compare password
Userlogin.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = Userlogin;
