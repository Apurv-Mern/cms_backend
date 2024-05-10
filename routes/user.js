
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST /api/users - Create a new user
router.post('/', UserController.createUser);


// GET /api/users - Get all users
router.get('/', UserController.getUsers);


// // GET /api/users/:id - Get a single user by ID
router.get('/:id', UserController.getUserById);

//// PUT /api/users/:id - Update a user by ID
router.put('/:id', UserController.updateUser);


// //DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', UserController.deleteUser);


module.exports = router;





