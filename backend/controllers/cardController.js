const mongoose = require('mongoose');
const Card = require('../models/card');

// GET /cards - returns all cards
const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).json(cards))
    .catch((err) => next(err));
};

// POST /cards - creates a card

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid Data', error: err });
      }
      return next(err);
    });
};

// DELETE /cards/:cardId - deletes a card by _id
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  // validateif CardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }

      // check if the user is the owner of the card
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .json({ message: 'You don\'t have permission to delete this card' });
      }

      return Card.findByIdAndDelete(cardId)
        .then(() => {
          res.status(200).json({ message: 'Card deleted succesfully' });
        });
    })
    .catch((err) => next(err));
};

// PUT /cards/:cardId/likes - give a like to a card
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  // validate if cardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed' });
      }
      return next(err);
    });
};

// DELETE /cards/:cardId/likes - remove a like from a card
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  // validate if cardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed' });
      }
      return next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
