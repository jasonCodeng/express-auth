const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

/* create user schema */
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

/* before saving each user instance */
userSchema.pre('save', function(next) {
  const user = this;

  /* generate salt */
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    /* hash password using salt */
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const model = mongoose.model('user', userSchema);

module.exports = model;
