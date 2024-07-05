const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("college", "root", "saloni90", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
// Relations
module.exports = sequelize;
