const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard,
  validateDeleteCard,
  validateUpdateCardLike,
} = require('../validators/cards');

router.get('/', getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:cardId', validateDeleteCard, deleteCard);

router.put('/:cardId/likes', validateUpdateCardLike, likeCard);

router.delete('/:cardId/likes', validateUpdateCardLike, dislikeCard);

module.exports = router;
