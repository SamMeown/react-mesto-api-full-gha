const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateGetUser,
  validateUpdateUserInfo,
  validateUpdateUserAvatar,
} = require('../validators/user');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', validateGetUser, getUser);

router.patch('/me', validateUpdateUserInfo, updateUserInfo);

router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

module.exports = router;
