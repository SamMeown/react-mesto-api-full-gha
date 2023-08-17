const router = require('express').Router();
const mongoose = require('mongoose');
const Card = require('../models/card');

router.get('/', (req, res) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((cards) => res.send(cards.map((card) => card.toObject())))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/', (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card.toObject()))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

router.delete('/:cardId', (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ message: 'Карточка удалена' });
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
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card.toObject());
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
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
