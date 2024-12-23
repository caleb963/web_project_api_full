const express = require('express');
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
dislikeCard
} = require('../controllers/cardController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth);

// GET /cards - returns all cards
router.get('/', getAllCards);

// POST /cards - creates a new card
router.post('/', createCard);

// DELETE /cards/:cardId - deletes a card by _id
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
