'use strict';

const express = require('express');
const controller = require('./product.controller');
const auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.put('/:id/bid', auth.isAuthenticated(), controller.bid)
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;