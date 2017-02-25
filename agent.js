'use strict';

module.exports = agent => {
  require('./lib/load_schema')(agent);
  require('./lib/load_connector')(agent);
};

