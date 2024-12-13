const mongoose = require('mongoose');
const Card = require('../models/card');

// GET /cards - returns all cards
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json(cards))
    .catch((err) => res.status(500).json({ message: 'Error retrieving cards', error: err }));
};

// POST /cards - creates a card

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // assuming req.user is set in req.user._id
  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid Data', error: err });
      }
      res.status(500).json({ message: 'Error creating card', error: err });
    });
};

// DELETE /cards/:cardId - deletes a card by _id
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  // validateif CardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }

      // check if the user is the owner of the card
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .json({ message: 'You dont have permission to delete this card' });
      }

      return Card.findByIdAndDelete(cardId)
        .then(() => res.status(200).json({ message: 'Card deleted succesfully' }),
      )
        .catch((err) => res.status(500).json({ message: 'Error deleting card', error: err }),
      );
    })
    .catch((err) => res.status(500).json({ message: 'Error finding card', error: err }),
  );
};

// PUT /cards/:cardId/likes - give a like to a card
const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  // validate if cardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  Card.findByIdAndUpdate(
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
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error liking card', error: err });
    });
};

// DELETE /cards/:cardId/likes - remove a like from a card
const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  // validate if cardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error disliking card', error: err });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
