const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({})
    .then((users) => res.send(users.map((user) => user.toObject())))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.send(user.toObject()))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый пользователь не найден' }));
});

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user.toObject()))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

function updateUser(userId, { name, about, avatar }, res) {
  User.findByIdAndUpdate(userId, { name, about, avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user.toObject()))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

router.patch('/me', (req, res) => {
  const userId = req.user;
  const { name, about } = req.body;
  updateUser(userId, { name, about }, res);
});

router.patch('/me/avatar', (req, res) => {
  const userId = req.user;
  const { avatar } = req.body;
  updateUser(userId, { avatar }, res);
});

module.exports = router;
