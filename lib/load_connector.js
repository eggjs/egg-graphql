'use strict';

const fs = require('fs');
const path = require('path');

const SYMBOL_CONNECTOR_CLASS = Symbol('Application#connectorClass');

module.exports = app => {
  const basePath = path.join(app.baseDir, 'app/graphql');
  const types = fs.readdirSync(basePath);

  Object.defineProperty(app, 'connectorClass', {
    get() {
      if (!this[SYMBOL_CONNECTOR_CLASS]) {
        const classes = new Map();

        types.forEach(type => {
          const connectorFile = path.join(basePath, type, 'connector.js');
          /* istanbul ignore else */
          if (fs.existsSync(connectorFile)) {
            const Connector = require(connectorFile);
            classes.set(type, Connector);
          }
        });

        this[SYMBOL_CONNECTOR_CLASS] = classes;
      }
      return this[SYMBOL_CONNECTOR_CLASS];
    },
  });
};
