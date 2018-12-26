/**
 * Entry point for the server.
 * @author vmlacic
 */
'use strict'

const https = require('https');
const express = require('express');
const fs = require('fs');

// middleware
const Logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Start server
const start = () => {
  const server = express();
  const port = process.env.PORT || 3000;

  // Database configuration
  server.set('models', require('./models'));

  // X-Powered-By header disabled for security reasons.
  server.disable('x-powered-by');

  // Set up server middleware at application level
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  if (process.env.NODE_ENV === 'development') {
    const logger = new Logger();
    server.use(logger.log); // logs request time and request info to console
  }

  // Configure routing for the server
  routes(server);

  // Middleware error handler
  server.use(errorHandler);

  // Listen on port 3000.
  https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
  }, server).listen(port, () => {
    console.log('eslusaona-api server started on: ' + port);

  });
}

module.exports.start = start;