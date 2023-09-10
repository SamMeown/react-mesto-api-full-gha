const jwt = require('jsonwebtoken');
const authErrors = require('../errors/auth');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: authErrors.needsAuth });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret-key');
  } catch (err) {
    return res.status(401).send({ message: authErrors.needsAuth });
  }

  req.user = payload;

  return next();
};
