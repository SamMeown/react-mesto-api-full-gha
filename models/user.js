const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const validationMessages = require('../errors/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, validationMessages.minlengthMsg(2)],
    maxlength: [30, validationMessages.maxlengthMsg(30)],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, validationMessages.minlengthMsg(2)],
    maxlength: [30, validationMessages.maxlengthMsg(30)],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validationMessages.invalidUrlMsg(),
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    unique: [true, validationMessages.uniqueMsg()],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: validationMessages.invalidEmailMsg(),
    },
  },
  password: {
    type: String,
    required: [true, validationMessages.requiredMsg()],
    minlength: [4, validationMessages.minlengthMsg(4)],
    maxlength: [256, validationMessages.maxlengthMsg(32)],
  },
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v; // eslint-disable-line no-param-reassign
    return ret;
  },
});

function loginFailedReject() {
  return Promise.reject(new Error('Неправильные почта или пароль'));
}

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return loginFailedReject();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return loginFailedReject();
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
