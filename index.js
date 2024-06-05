require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4044;
const cors = require("cors");

const session = require("express-session");
const passport = require("./Auth/passportGoogle.js");
const githubAuth = require("./Auth/passportGithub.js");

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

const User = require("./models/user");
const Role = require("./models/role");

// const User_Role=require('./models/userRole');

const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

User.sync({ alter: true });
Role.sync({ alter: true });

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use user routes
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);

//login
app.use("/api/auth", authRoutes);






//passport Google
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
app.use(passport.initialize());
app.use(passport.session());


//passport google routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/",
  })
);
//passport Github 

app.use(githubAuth.initialize());
app.use(githubAuth.session());
//Github routes
app.get("/auth/github", githubAuth.authenticate("github"));
app.get(
  "/auth/github/callback",
  githubAuth.authenticate("github", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/",
  })
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
