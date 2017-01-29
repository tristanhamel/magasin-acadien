/**
 * Main application routes
 */

'use strict';

const express = require('express');

module.exports = function (app) {
  app.use('/api/products', require('./api/product'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // serve static files otherwise
  // const publicDir = process.env.NODE_ENV === 'development' ? '.temp' : 'dist';
  const publicDir = getCliArg();

  if (Array.isArray(publicDir)) {
    publicDir.forEach(dir =>
      app.use(express.static(dir))
    );
  } else {
    app.use(express.static(publicDir));
  }

  function getCliArg() {
    const arg = process.argv.slice(2)[0];
    if (arg && arg.indexOf(',') > 0) {
      return arg.split(',');
    }
    return arg;
  }
};
