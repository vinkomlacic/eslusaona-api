/**
 * Entry point for the server.
 * @author vmlacic
 */
'use strict'

// Imports
const express = require('express');
const logRequest = require('./middleware/logRequest');
const bodyParser = require('body-parser');
const routes = require('./routes');

server = express();
port = process.env.PORT || 3000;

// Database configuration
server.set('model', require('./model'));

// Set up middleware at an serverlication level
server.use(logRequest); // logs request time and content
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routing for the server
routes(server);

// Listen on port 3000. Voilà!
server.listen(port);
console.log('eslusaona-api server started on: ' + port);