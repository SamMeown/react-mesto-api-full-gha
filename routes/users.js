const router = require('express').Router();
const {
  login,
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/signin', login);

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
