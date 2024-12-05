const express = require('express');
const router = express.Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cardController');

// GET /cards - returns all cards
router.get('/', getAllCards);

// POST /cards - creates a new card
router.post('/', createCard);

// DELETE /cards/:cardId - deletes a card by _id
router.delete('/:cardId', deleteCard);

module.exports = router;
