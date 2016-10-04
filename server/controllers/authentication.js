const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

/* create token for user */
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  /* user has been auth'd, return token */
  res.send({ token: tokenForUser(req.user) });
}


/* signup route */
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  /* check email and password */
  if (!email || !password) {
    res.send(422).send({ error: 'You must provide email and password' });
  }

  /* check if user exists */
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }
    if (existingUser) { return res.status(422).send({ error: 'Email is in use' }); }

    const user = new User({
      email: email,
      password: password
    });

    /* save user info - email and hashed password */
    user.save(function(err) {
      if (err) { return next(err); }

      /* create token from user and send back to client */
      res.json({ token: tokenForUser(user) });
    });
  });

};
