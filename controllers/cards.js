const mongoose = require('mongoose');
const Card = require('../models/card');
const httpErrors = require('../errors/http');

module.exports.getCards = (req, res, next) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((cards) => res.send(cards.map((card) => card.toObject())))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card.toObject()))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;
  Card.findById(cardId).orFail()
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new httpErrors.ForbiddenError('Карточка не принадлежит пользователю');
      }

      return Card.deleteOne({ _id: cardId, owner: userId }).orFail();
    })
    .then(() => {
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new httpErrors.NotFoundError('Карточка не найдена'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      next(err);
    });
};

function updateLike(cardId, userId, like, res, next) {
  const query = {};
  query[like ? '$addToSet' : '$pull'] = { likes: userId };
  Card.findByIdAndUpdate(
    cardId,
    query,
    { new: true, runValidators: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => {
      res.send(card.toObject());
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new httpErrors.NotFoundError('Карточка не найдена'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new httpErrors.BadRequestError(err.message));
        return;
      }
      next(err);
    });
}

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  updateLike(cardId, userId, true, res, next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  updateLike(cardId, userId, false, res, next);
};
