'use strict';

const config = require('../config/environment');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const User = require('../api/user/user.model');
const validateJwt = expressJwt({secret: config.secrets.session});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
      User.findById(req.user._id, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).send('Unauthorized');
        }

        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, name, email, role, type) {
  let expire;
  if (type === 'refresh') {
    // ≈ 1 year
    expire = 12 * 30 * 60 * 60 * 24;
  } else {
    // 5 mins
    expire = 60 * 5;
  }

  const identity = {_id: id, name, email, role};
  return jwt.sign({identity, type}, config.secrets.session, {expiresIn: expire});
}

/**
 * Checks if token is valid or expired
 */
function canRefreshToken() {
  return compose()
  // Validate jwt
    .use((req, res, next) => {
      // allow renew_token to be passed through body as well
      if (req.body && req.body.hasOwnProperty('refresh_token')) {
        req.headers.authorization = `Bearer ${req.body.refresh_token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
      User.findById(req.user._id, (err, user) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (!user) {
          return res.status(401).send('Unauthorized');
        }

        req.user = user;
        next();
      });
    });
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.canRefreshToken = canRefreshToken;
