const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

const { authorizePermission } = require("../middlewares/authorizePermission");

// POST /api/users - Create a new user
router.post("/", authorizePermission("user_add"), UserController.createUser);

// GET /api/users - Get all users
router.get("/", authorizePermission("user_read"), UserController.getUsers);

// // GET /api/users/:id - Get a single user by ID
router.get(
  "/:id",
  authorizePermission("user_read"),
  UserController.getUserById
);

//// PUT /api/users/:id - Update a user by ID
router.put("/:id", authorizePermission("user_edit"), UserController.updateUser);

// //DELETE /api/users/:id - Delete a user by ID
router.delete(
  "/:id",
  authorizePermission("user_delete"),
  UserController.deleteUser
);

module.exports = router;
