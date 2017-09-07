'use strict';

const SYMBOL_CONNECTOR = Symbol('connector');

module.exports = {

  /**
   * connector instance
   * @member Context#connector
   */

  get connector() {
    /* istanbul ignore else */
    if (!this[SYMBOL_CONNECTOR]) {
      const connectors = {};
      for (const [ type, Class ] of this.app.connectorClass) {
        connectors[type] = new Class(this);
      }
      this[SYMBOL_CONNECTOR] = connectors;
    }
    return this[SYMBOL_CONNECTOR];
  },

  /**
   * graphql instance access
   * @member Context#graphql
   */

  get graphql() {
    return this.service.graphql;
  },
};
