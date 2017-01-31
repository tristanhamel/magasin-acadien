'use strict';

const express = require('express');
const auth = require('./auth.service');
const User = require('../api/user/user.model');

const router = express.Router(); // eslint-disable-line babel/new-cap

router.post('/', (req, res, next) => {
  const email = String(req.body.email).toLowerCase();
  const password = String(req.body.password);

  User.findOne({email}, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(null, false, {message: 'This email is not registered.'});
    }

    if (!user.authenticate(password)) {
      return next(null, false, {message: 'Email and password do not match'});
    }

    const refresh_token = auth.signToken(user._id, user.name, user.email, user.role, 'refresh');  // eslint-disable-line camelcase
    const access_token = auth.signToken(user._id, user.name, user.email, user.role, 'access'); // eslint-disable-line camelcase

    res.json({refresh_token, access_token}); // eslint-disable-line camelcase

    next();
  });
});

module.exports = router;
