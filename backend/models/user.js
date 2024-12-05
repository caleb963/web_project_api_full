const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const urlRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+)$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength:30,
  },
  about : {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: function(v) {
        return urlRegex.test(v);
      },
      message: props => `${props.value} is not  a valid URL!`
    }
  }
});

module.exports = mongoose.model('user', userSchema);