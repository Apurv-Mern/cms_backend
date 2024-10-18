require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4044;
const cors = require("cors");
const session = require("express-session");

const googleAuth = require("./Auth/passportGoogle.js");
const facebookAuth = require("./Auth/passportFacebook.js");
const githubAuth = require("./Auth/passportGithub.js");
const sequelize = require("./models/connection.js"); // Your Sequelize instance
const User = require("./models/user");
const Role = require("./models/role");
const Settings = require("./models/settings");
const Permissions = require("./models/permissions");
const RolesPermissions = require("./models/rolespermissions");
const UserRole = require("./models/userRole.js");
const Models = require("./models/models.js");
const Database = require("./models/database.js");
const DataType = require("./models/dataType.js");
const IndexType = require("./models/indexType.js");
const TableRows = require("./models/tableRows.js");
const CrudTable = require("./models/crudTable.js");
const FrontendRouteStore = require("./models/frontendRouteStore.js");

const userRoutes = require("./routes/userRoute.js");
const rolePermissionRoutes = require("./routes/rolePermissionRoute.js");
const authRoutes = require("./routes/authLoginRoute.js");
// const settingsRoutes = require("./routes/settingsRoute.js");
const permissionRoutes = require("./routes/permissionRoute.js");
const modelRoutes = require("./routes/modelRoute.js");
const databaseRoutes = require("./routes/databaseRoute.js");
const githubRoute = require("./routes/authGithubRoute.js");
const facebookRoute = require("./routes/authFacebookRoute.js");
const googleRoute = require("./routes/authGoogleRoute.js");
const dataTypeRoutes = require("./routes/dataTypeRoute.js");
const indexTypeRoutes = require("./routes/indexTypeRoute.js");
const tableRowRoute = require("./routes/tableRowRoute.js");
const crudTableRoute = require("./routes/crudTableRoute.js");
const frontendRouteStoreRoute = require("./routes/frontendRouteStoreRoute.js");

app.use(cors());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,POST", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define model relationships
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

UserRole.belongsTo(User, { foreignKey: "userId" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

// CrudTable.hasMany(Database, { foreignKey: "tableName" });
// Database.belongsTo(CrudTable, { foreignKey: "tableName" });

// Role.hasMany(Permissions, { foreignKey: "roleId" });
// Permissions.belongsTo(Role, { foreignKey: "roleId" });

// RolesPermissions.belongsTo(Role, { foreignKey: "roleId" });
// RolesPermissions.belongsTo(Permissions, { foreignKey: "permissionId" });

// Define associations
Role.belongsToMany(Permissions, {
  through: RolesPermissions,
  foreignKey: "roleId",
});
Permissions.belongsToMany(Role, {
  through: RolesPermissions,
  foreignKey: "permissionId",
});

RolesPermissions.belongsTo(Role, { foreignKey: "roleId" });
RolesPermissions.belongsTo(Permissions, { foreignKey: "permissionId" });

// Role.hasMany(RolesPermissions, { foreignKey: "roleId" });
// Permissions.hasMany(RolesPermissions, { foreignKey: "permissionId" });

// Function to sync models with retry logic
const retryTransaction = async (transactionFn, maxRetries = 5) => {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return await sequelize.transaction(transactionFn);
    } catch (error) {
      if (error.original && error.original.code === "ER_LOCK_DEADLOCK") {
        attempts += 1;
        console.log(
          `Deadlock detected, retrying transaction (${attempts}/${maxRetries})`
        );
        if (attempts >= maxRetries) {
          throw new Error("Max retries reached. Transaction failed.");
        }
      } else {
        throw error;
      }
    }
  }
};

const syncModels = async () => {
  await retryTransaction(async (transaction) => {
    await Role.sync({ alter: true, transaction });
    await User.sync({ alter: true, transaction });
    await Settings.sync({ alter: true, transaction });
    await Permissions.sync({ alter: true, transaction });
    await UserRole.sync({ alter: true, transaction });
    await RolesPermissions.sync({ alter: true, transaction });
    await Models.sync({ alter: true, transaction });
    await Database.sync({ alter: true, transaction });
    await DataType.sync({ alter: true, transaction });
    await IndexType.sync({ alter: true, transaction });
    await TableRows.sync({ alter: true, transaction });
    await CrudTable.sync({ alter: true, transaction });
    await FrontendRouteStore.sync({ alter: true, transaction });
  });
};

syncModels().catch((error) => {
  console.error("Failed to sync models:", error);
});

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use user routes
app.use("/api", userRoutes);

// // Use role routes
// app.use("/api/role", roleRoutes);

//login
app.use("/api/auth", authRoutes);
//rolePermission
app.use("/api/rolePermission", rolePermissionRoutes);

//permission
app.use("/api/permissions", permissionRoutes);

//modelName
app.use("/api/model", modelRoutes);
//Database
app.use("/api/database", databaseRoutes);

//Datatype
app.use("/api/datatype", dataTypeRoutes);
//IndexType
app.use("/api/indexType", indexTypeRoutes);
//IndexType
app.use("/api/tableRows", tableRowRoute);
//IndexType
app.use("/api/crudTable", crudTableRoute);

//frontendRouteStore
app.use("/api/frontendRouteStore", frontendRouteStoreRoute);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true if using HTTPS
    },
  })
);
//pasport Google
app.use(googleAuth.initialize());
app.use(googleAuth.session());
app.use("/", googleRoute);

//passport Github
app.use(githubAuth.initialize());
app.use(githubAuth.session());
app.use("/api/authentication", githubRoute);

// Passport Facebook
app.use(facebookAuth.initialize());
app.use(facebookAuth.session());
app.use("/api/authentication", facebookRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
