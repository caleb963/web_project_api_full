const express = require('express');

const router = express.Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
dislikeCard
} = require('../controllers/cardController');

// GET /cards - returns all cards
router.get('/', getAllCards);

// POST /cards - creates a new card
router.post('/', createCard);

// DELETE /cards/:cardId - deletes a card by _id
router.delete('/:cardId', deleteCard);

router.put('/likes/:cardId', likeCard);

router.delete('/likes/:cardId', dislikeCard);

module.exports = router;
