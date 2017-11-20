'use strict';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];
exports.graphql = {
  router: '/graphql',
  graphiql: false,
};
