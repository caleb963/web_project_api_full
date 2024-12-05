const express = require('express');
const router = express.Router();
const {getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar} = require('../controllers/userController');


// GET /users - returns all users
router.get('/', getAllUsers);

// GET /users/:userId - return a user by _id
router.get('/:userId', getUserById);

// POST / users - creates a new user
router.post('/', createUser);

// PATCH /users/:userId - updates a user by _id
router.patch('/:userId', updateUser);

// PATCH /users/:userId/avatar - updates a user's avatar by _id
router.patch('/:userId/avatar', updateUserAvatar);

module.exports = router;
