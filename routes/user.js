const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authorize = require("../middlewares/authorize");

// POST /api/users - Create a new user
router.post("/", authorize("create"), UserController.createUser);

// GET /api/users - Get all users
router.get("/", authorize("read"), UserController.getUsers);

// // GET /api/users/:id - Get a single user by ID
router.get("/:id", authorize("read"), UserController.getUserById);

//// PUT /api/users/:id - Update a user by ID
router.put("/:id", authorize("update"), UserController.updateUser);

// //DELETE /api/users/:id - Delete a user by ID
router.delete("/:id", authorize("delete"), UserController.deleteUser);

module.exports = router;
