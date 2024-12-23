const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userController');
const userValidation = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth);

// GET /users - returns all users
router.get('/', getAllUsers);

// GET /users/:userId - return a user by _id
router.get('/:userId', getUserById);

// PATCH /users/me - updates the user's profile
router.patch('/me', userValidation.updateUser, updateUser);

// PATCH /users/:userId/avatar - updates a user's avatar by _id
router.patch('/me/avatar', userValidation.updateUserAvatar, updateUserAvatar);

// GET /users/me - returns the current user
router.get('/me', getCurrentUser);

module.exports = router;
