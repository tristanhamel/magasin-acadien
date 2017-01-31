'use strict';

const express = require('express');
const auth = require('./auth.service');

const router = express.Router();  // eslint-disable-line babel/new-cap

router.use('/login', require('./login'));
router.use('/refresh', auth.canRefreshToken(), require('./refresh'));

module.exports = router;
