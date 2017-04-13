'use strict';

const passport = require('passport');

/**
 * Session
 * returns info on authenticated user
 */
exports.session = (req, res) => {
  res.json(req.user);
};

/**
 * Logout
 * returns nothing
 */
exports.logout = (req, res) => {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};

/**
 *  Login
 *  requires: {username, password}
 */
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    var error = err || info;
    if (error) { return res.json(400, error); }
    req.login(user, function(err) {
      if (err) { return res.send(err); }
      res.json(req.user);
    });
  })(req, res, next);
}
