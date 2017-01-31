'use strict';

const User = require('./user.model');
const auth = require('../../auth/auth.service');

const validationError = (res, err) => {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword', (err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  const newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'member';
  newUser.save((err, user) => {
    if (err) {
      return validationError(res, err);
    }
    const token = auth.signToken(user._id, user.name, user.email, user.role);
    res.json({token});
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = (req, res) => {
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  User.findById(userId, (err, user) => {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(err => {
        if (err) {
          return validationError(res, err);
        }
        res.status(200).send('success');
      });
    } else {
      res.status(403).send('forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  const userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', (err, user) => { // don't ever give out the password or salt
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res) {
  res.redirect('/');
};
