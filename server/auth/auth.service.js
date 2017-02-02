'use strict';

const config = require('../config/environment');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const User = require('../api/user/user.model');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    .use(
      expressJwt({
        getToken: req => {
          return req.headers.authorization.split(' ')[1];
        },
        secret: config.secrets.session
      })
    )
    // Attach user to request
    .use((req, res, next) => {
      User.findById(req.user.identity._id, (err, user) => {
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

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
