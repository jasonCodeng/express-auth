const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/* set up routes */
module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}


/*

signing up -> verify email not in use -> return token
signing in -> verify email and password -> return token
auth'd request -> verify token -> access resource

for authenticated requests/routes, add 'requireAuth' before callback
 */
