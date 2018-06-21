let swaggerJSDoc = require('swagger-jsdoc');
let swaggerUI = require('swagger-ui-express');
import * as express from 'express';

export function init(app: express.Application) {
  let swaggerDefinitions = {
    info: {
      title: 'OutSource Service',
      version: '0.0.1',
      description: 'OutSource Service'
    },
    host: 'localhost:1400',
    basePath: '/'
  };

  let options = {
    swaggerDefinition: swaggerDefinitions,
    apis: [
      './dist/src/actions/*/init.js'
    ]
  };

  var swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}