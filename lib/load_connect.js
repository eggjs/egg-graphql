'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');
const symbol_connector_class = Symbol('connector_class');
const symbol_connector = Symbol('connector');

module.exports = app => {
  const types = fs.readdirSync(path.join(__dirname, 'types'));

  Object.defineProperty(app, 'connectorClass', {
    get() {
      if (!this[symbol_connector_class]) {
        const classes = new Map();

        types.forEach(type => {
          const connectorFile = path.join(__dirname, `types/${type}/connector.js`);
          if (fs.existsSync(connectorFile)) {
            const Connector = require(connectorFile);
            classes.set(type, Connector);
          }
        });

        this[symbol_connector_class] = classes;
      }
      return this[symbol_connector_class];
    },
  });

  Object.defineProperty(app.context, 'connector', {
    get() {
      if (!this[symbol_connector]) {
        const connectors = {};
        for (const [ type, Class ] of app.connectorClass) {
          connectors[type] = new Class(this);
        }
        this[symbol_connector] = connectors;
      }
      return this[symbol_connector];
    },
  });
};
