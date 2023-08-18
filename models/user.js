const mongoose = require('mongoose');
const validator = require('validator');
const validationMessages = require('../errors/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, validationMessages.minlengthMsg(2)],
    maxlength: [30, validationMessages.maxlengthMsg(30)],
    required: [true, validationMessages.requiredMsg()],
  },
  about: {
    type: String,
    minlength: [2, validationMessages.minlengthMsg(2)],
    maxlength: [30, validationMessages.maxlengthMsg(30)],
    required: [true, validationMessages.requiredMsg()],
  },
  avatar: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    validate: {
      validator: (v) => validator.isURL(v),
      message: validationMessages.invalidUrlMsg(),
    },
  },
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v; // eslint-disable-line no-param-reassign
    return ret;
  },
});

module.exports = mongoose.model('user', userSchema);
