'use strict';

const express = require('express');
const auth = require('./auth.service');

const router = express.Router(); // eslint-disable-line babel/new-cap

router.post('/', (req, res, next) => {
  const access_token = auth.signToken( // eslint-disable-line camelcase
    req.user._id,
    req.user.name,
    req.user.email,
    req.user.role,
    'access');

  res.json({access_token}); // eslint-disable-line camelCase

  next();
});

module.exports = router;
