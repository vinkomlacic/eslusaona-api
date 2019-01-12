/**
 * Start script. Configures environment variables.
 * @author vmlacic
 */
'use strict'

const env = require('../config/serverConfig');
const server = require('../server');

// Configuring environment variables.
Object.keys(env).forEach(key => {
  process.env[key.toUpperCase()] = env[key];
});

// Start server.
server.start();