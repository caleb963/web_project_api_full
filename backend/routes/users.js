const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/userController');

// GET /users - returns all users
router.get('/', getAllUsers);

// GET /users/:userId - return a user by _id
router.get('/:userId', getUserById);

// PATCH /users/:userId - updates a user by _id
router.patch('/me', updateUser);

// PATCH /users/:userId/avatar - updates a user's avatar by _id
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
