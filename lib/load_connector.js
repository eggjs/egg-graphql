'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');

const symbolConnectorClass = Symbol('connector_class');

module.exports = (app) => {
  const basePath = path.join(app.baseDir, 'app/graphql');
  const types = fs.readdirSync(basePath);

  Object.defineProperty(app, 'connectorClass', {
    get() {
      if (!this[symbolConnectorClass]) {
        const classes = new Map();

        types.forEach((type) => {
          const connectorFile = `${basePath}/${type}/connector.js`;
          if (fs.existsSync(connectorFile)) {
            const Connector = require(connectorFile);
            classes.set(type, Connector);
          }
        });

        this[symbolConnectorClass] = classes;
      }
      return this[symbolConnectorClass];
    },
  });
};
