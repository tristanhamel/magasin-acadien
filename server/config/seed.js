/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Product = require('../api/product/product.model');
var User = require('../api/user/user.model');

// Insert seed data below
// var productSeed = require('../api/product/product.seed.json');

// Insert seed inserts below
// Product.find({}).remove(function() {
// 	Product.create(productSeed);
// });
