'use strict';

const symbolConnector = Symbol('connector');

module.exports = {
  get connector() {
    if (!this[symbolConnector]) {
      const connectors = {};
      for (const [ type, Class ] of this.app.connectorClass) {
        connectors[type] = new Class(this);
      }
      this[symbolConnector] = connectors;
    }
    return this[symbolConnector];
  },
};
