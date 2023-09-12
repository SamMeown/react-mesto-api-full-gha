const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  validateCreateUser: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4).max(256),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  validateLogin: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4).max(256),
    }),
  }),
  validateGetUser: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  validateUpdateUserInfo: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  validateUpdateUserAvatar: celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
};
