const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// GET /users - returns all users
const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(next);
};

// GET /users/:userId - returns a user by _id
const getUserById = (req, res, next) => {
  const { userId } = req.params;

  // validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error('Invalid user ID');
    error.statusCode = 400;
    return next(error);
  }

  User.findById(userId)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
      return null;
    });
};

// POST /users - creates a user
const createUser = (req, res, next) => {
  const {
    name = 'JacquesCousteau', about = 'Explorer', avatar = 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg', email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

// POST /login - authenticate a user and return a JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
      }

      bcrypt.compare(password, user.password, (err) => {
        if (err) {
          const error = new Error('Invalid email or password');
          error.statusCode = 401;
          return next(error);
        }

        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', {
          expiresIn: '7d',
        });
        res.status(200).json({ token });
      });
    })
    .catch(next);
};

// PATCH /users/:userId - update a user by _id
const updateUser = (req, res, next) => {
  const { userId } = req.params;
  const { name, about } = req.body;

  // check if the user is the owner of the card
  if (userId !== req.user._id) {
    const error = new Error(
      'You do not have permission to update this profile',
    );
    error.statusCode = 403;
    return next(error);
  }

  // validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error('Invalid user ID');
    error.statusCode = 400;
    return next(error);
  }

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

// PATCH /users/:userId/avatar - update a user's avatar by _id
const updateUserAvatar = (req, res, next) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  // Check if the user is the owner of the profile
  if (userId !== req.user._id) {
    const error = new Error(
      'You do not have permission to update this profile',
    );
    error.statusCode = 403;
    return next(error);
  }

  // validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error('Invalid userID');
    error.statusCode = 400;
    return next(error);
  }

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(user);
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
