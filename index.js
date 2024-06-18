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

const User = require("./models/user");
const Role = require("./models/role");

// const User_Role=require('./models/userRole');
const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");
const authRoutes = require("./routes/auth");

const githubRoute = require("./routes/authGithub.js");
const facebookRoute = require("./routes/authFacebook.js");
const googleRoute = require("./routes/authGoogle.js");

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

// Establish the relationship
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

User.sync({ alter: true });
Role.sync();

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use user routes
app.use("/api/user", userRoutes);
// Use role routes
app.use("/api/role", roleRoutes);

//login
app.use("/api/auth", authRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
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
