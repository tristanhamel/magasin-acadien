/**
 * Main application routes
 */

'use strict';

const express = require('express');

module.exports = function (app) {
  app.use('/api/products', require('./api/product'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  const publicDir = getCliArg() || '.tmp';

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
