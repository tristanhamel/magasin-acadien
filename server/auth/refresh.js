'use strict';

const express = require('express');
const auth = require('./auth.service');

const router = express.Router(); // eslint-disable-line babel/new-cap

router.get('/', (req, res, next) => {
  const access_token = auth.signToken( // eslint-disable-line camelcase
    {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    },
    'access');

  res.json({access_token}); // eslint-disable-line camelCase

  next();
});

module.exports = router;
