'use strict';

module.exports = app => {
  require('./lib/load_schema')(app);
  require('./lib/load_connector')(app);
};

