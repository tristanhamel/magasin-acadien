/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// load env variables in dev mode
if (process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error:${err}`);
  process.exit(-1);
});
// Populate DB with sample data
if (config.seedDB) {
  require('./config/seed');
}

// Setup server
const app = express();
const server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
