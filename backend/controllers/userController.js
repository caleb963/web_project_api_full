const mongoose = require('mongoose');
const User = require('../models/user');

// GET /users - returns all users
const getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'Error retrieving users', error: err}));
};

// GET /users/:userId - returns a user by _id
const getUserById = (req, res) => {
  const { userId } = req.params;

  // validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID'});
  }

  User.findById(userId)
  .orFail(() => {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  })
    .then(user => res.status(200).json(user))
    .catch(err => {
       if (err.statusCode = 404) {
          return res.status(404).json({ message: err.message});
       }
        res.status(500).json({ message: 'Error retrieving user', error: err});
    });
}
// POST /users - creates a user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).json(user))
    .catch(err =>
      res.status(500).json({ message: 'Error creating user', error: err}));
};

// PATCH /users/:userId - update a user by _id
const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, about } = req.body;

 // validate if userId is a valid ObjectId
 if (!mongoose.Types.ObjectId.isValid(userId)) {
  return res.status(400).json({ message: 'Invalid user ID' });
}


  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true})
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err});
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message});
      }
      res.status(500).json({ message: 'Error updating user', error: err});
    });
};

// PATCH /users/:userId/avatar - update a user's avatar by _id
const updateUserAvatar = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  // validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userID' });
  }

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err});
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error updating avatar', error: err });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};