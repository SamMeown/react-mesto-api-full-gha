const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { MongoServerError } = require('mongodb'); // eslint-disable-line import/no-extraneous-dependencies
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users.map((user) => user.toObject())))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id).orFail()
    .then((user) => {
      res.send(user.toObject());
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user.toObject()))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError
          || (err instanceof MongoServerError && err.code === 11000)) {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

function updateUser(userId, { name, about, avatar }, res) {
  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true, runValidators: true },
  ).orFail()
    .then((user) => {
      res.send(user.toObject());
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.updateUserInfo = (req, res) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;
  updateUser(userId, { name, about }, res);
};

module.exports.updateUserAvatar = (req, res) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;
  updateUser(userId, { avatar }, res);
};
