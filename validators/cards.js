const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  validateCreateCard: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  validateDeleteCard: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  validateUpdateCardLike: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
};
