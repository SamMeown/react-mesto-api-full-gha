const router = require('express').Router();
const {
  login,
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/signup', createUser);

router.post('/signin', login);

router.get('/', getUsers);

router.get('/:id', getUser);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
