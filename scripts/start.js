/**
 * Start script. Configures environment variables.
 * @author vmlacic
 */
'use strict'

const env = require('../config/serverConfig');
const server = require('../server');

// Configuring environment variables.
process.env.NODE_ENV = env.environment;

// Start server.
server.start();