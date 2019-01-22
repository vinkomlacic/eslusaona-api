/**
 * Initializes swagger generator.
 * @author vmlacic
 */
'use strict';

const swagger = require('express-swagger-generator');

const swaggerInitializer = (app, listenPort) => {
  let options = {
    swaggerDefinition: {
      info: {
        description: 'REST server for eslusaona-api',
        title: 'eslusaona-api',
        version: '1.0.0',
      },
      host: `localhost:${listenPort}`,
      basePath: '',
      produces: [
        'application/json',
      ],
      schemes: ['https'],
      securityDefinitions: {
        JWT: {
          type: 'accessToken',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
      },
    },
    basedir: 'C:/Users/vinko/Documents/workspace/eslusaona-api',
    files: ['./routes/**/*.js'],
  };

  const expressSwagger = swagger(app);
  expressSwagger(options);
};

module.exports = swaggerInitializer;