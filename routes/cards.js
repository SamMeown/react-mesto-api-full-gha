const router = require('express').Router();
const Card = require('../models/card');

router.get('/', (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/', (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.delete('/:cardId', (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

function updateLike(cardId, userId, like, res) {
  const query = {};
  query[like ? '$addToSet' : '$pull'] = { likes: userId };
  Card.findByIdAndUpdate(
    cardId,
    query,
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

router.put('/:cardId/likes', (req, res) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  updateLike(cardId, userId, true, res);
});

router.delete('/:cardId/likes', (req, res) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  updateLike(cardId, userId, false, res);
});

module.exports = router;
