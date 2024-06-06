const { Sequelize, BelongsTo } = require("sequelize");

const sequelize = new Sequelize("college", "root", "saloni90", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Relations
module.exports = sequelize;
