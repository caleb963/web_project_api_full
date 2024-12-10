const { celebrate, Joi, segments } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const userValidation = {
  createUser: celebrate({
    [segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().custom(validateURL).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  updateUser: celebrate({
    [segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserAvatar: celebrate({
    [segments.BODY]: Joi.object().keys({
      avatar: Joi.string().custom(validateURL).required(),
    }),
  }),
  userId: celebrate({
    [segments.PARAMS] : Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  login: celebrate({
    [segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  })
};

module.exports = userValidation;
