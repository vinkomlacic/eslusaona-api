/**
 * Entry point for the server.
 * @author vmlacic
 */
'use strict'

/** IMPORTS */
const https = require('https');
const express = require('express');
const fs = require('fs');

// middleware
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const routes = require('./routes');

/************************ */

const start = () => {
  const server = express();
  const port = process.env.PORT || 3000;

  // Database configuration
  server.set('models', require('./models'));

  // Set up middleware at an server at application level
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  if (process.env.NODE_ENV === 'development') {
    server.use(logger.consoleLogger); // logs request time and request info
  }

  // Configure routing for the server
  routes(server);

  // Listen on port 3000.
  https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
  }, server).listen(port, () => {
    console.log('eslusaona-api server started on: ' + port);

  });
}

module.exports.start = start;